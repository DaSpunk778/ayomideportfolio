"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
} from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FaSpotify } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MUSIC_DATA, type MusicItem } from "@/data/music";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Blended Peace — the album the play orb opens in the floating player.
const BLENDED_PEACE_EMBED =
    "https://open.spotify.com/artist/20wkVLutqVOYrc0kxFs7rA?si=LYSQCll9ThOhnrnrsWN9Iw";

// Every cover in one pool: playlists, then songs, then artists.
const ITEMS: MusicItem[] = [
    ...MUSIC_DATA.playlists,
    ...MUSIC_DATA.songs,
    ...MUSIC_DATA.artists,
];

// The bubble cloud is one hand-placed composition (mirroring the reference:
// a wide organic pile — two big orbs right of centre, a large one centre-left,
// smaller ones tucked between and spilling off both edges). Each slot is the
// bubble's CENTRE on a 100×65 canvas plus its diameter as % of canvas width;
// the whole cloud scales with the container so the arrangement never reflows.
type Slot = { x: number; y: number; s: number; z: number };
const SLOTS: Slot[] = [
    { x: 12, y: 26, s: 20, z: 12 }, // big iridescent, upper left
    { x: 3, y: 46, s: 13, z: 10 }, // left edge, half clipped
    { x: 30, y: 42, s: 24, z: 20 }, // large, centre-left (the flower spot)
    { x: 33, y: 12, s: 15, z: 8 }, // top, centre-left
    { x: 20, y: 60, s: 12, z: 18 }, // lower left
    { x: 45, y: 6, s: 12, z: 6 }, // top centre
    { x: 55, y: 40, s: 27, z: 22 }, // biggest, centre-right (face spot)
    { x: 76, y: 32, s: 22, z: 21 }, // second face, right
    { x: 57, y: 12, s: 14, z: 9 }, // top, centre-right
    { x: 8, y: 66, s: 12, z: 14 }, // bottom left (the dog spot)
    { x: 68, y: 8, s: 11, z: 7 }, // top right-centre
    { x: 88, y: 12, s: 13, z: 8 }, // top right
    { x: 92, y: 34, s: 14, z: 12 }, // right edge
    { x: 86, y: 55, s: 15, z: 16 }, // lower right
    { x: 44, y: 68, s: 13, z: 19 }, // bottom, left of the play orb
    { x: 63, y: 66, s: 14, z: 18 }, // bottom, right of the play orb
    { x: 25, y: 22, s: 11, z: 13 }, // tucked into the left cluster
];

// Home position of the Spotify orb (centre-bottom of the cloud) — it rests
// here and glides toward the cursor while the pointer is over the section.
const PLAY_SLOT: Slot = { x: 52, y: 80, s: 13, z: 40 };

// Positioning wrapper (CSS translate) and animated bubble (GSAP transforms)
// are separate elements so the pop-in / bob never fights the centring.
const BubbleShell = ({
    slot,
    children,
}: {
    slot: Slot;
    children: React.ReactNode;
}) => (
    <div
        className="absolute aspect-square -translate-x-1/2 -translate-y-1/2"
        style={{
            left: `${slot.x}%`,
            top: `${slot.y}%`,
            width: `${slot.s}%`,
            zIndex: slot.z,
        }}
    >
        {children}
    </div>
);

// Shared glass layers that turn a flat cover into a glossy orb: a hard
// top-left highlight, a soft bottom reflection, and an inner rim.
const Gloss = () => (
    <>
        <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_24%,rgba(255,255,255,0.75),rgba(255,255,255,0.16)_26%,transparent_48%)]"
        />
        <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_115%,rgba(255,255,255,0.38),transparent_45%)]"
        />
        <span
            aria-hidden
            className="absolute inset-0 rounded-full shadow-[inset_0_0_24px_rgba(255,255,255,0.28),inset_0_-10px_24px_rgba(0,0,0,0.18)] ring-1 ring-white/25"
        />
    </>
);

const MusicPlaylists = () => {
    const rootRef = useRef<HTMLElement | null>(null);
    const cloudRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);

    // Spotify orb follows the cursor: springs track the offset from its home
    // slot; while the pointer is over the section the offset is the cursor's
    // distance from home, and it eases back to 0,0 the moment it leaves.
    const offX = useSpring(useMotionValue(0), {
        stiffness: 260,
        damping: 26,
        mass: 0.6,
    });
    const offY = useSpring(useMotionValue(0), {
        stiffness: 260,
        damping: 26,
        mass: 0.6,
    });

    const followCursor = (e: React.PointerEvent) => {
        const cloud = cloudRef.current;
        if (!cloud) return;
        const r = cloud.getBoundingClientRect();
        const homeX = r.left + (PLAY_SLOT.x / 100) * r.width;
        const homeY = r.top + (PLAY_SLOT.y / 100) * r.height;
        offX.set(e.clientX - homeX);
        offY.set(e.clientY - homeY);
    };

    const resetCursor = () => {
        offX.set(0);
        offY.set(0);
    };

    // Choreography: bubbles pop in from nothing in a random order as the cloud
    // scrolls into view, then rest perfectly still.
    useGSAP(
        () => {
            gsap.from(".m-bubble", {
                scale: 0,
                autoAlpha: 0,
                duration: 0.9,
                ease: "back.out(1.7)",
                stagger: { each: 0.05, from: "random" },
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: "top 70%",
                    once: true,
                },
            });
        },
        { scope: rootRef },
    );

    // Floating player: lock page scroll and close on Escape while open.
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        document.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [open]);

    return (
        <section
            ref={rootRef}
            id="music"
            data-nav-theme="light"
            onPointerMove={followCursor}
            onPointerLeave={resetCursor}
            className="relative bg-[#09090b] py-24 sm:py-32 overflow-hidden"
        >
            {/* Centred heading */}
            <div className="container mx-auto px-6">
                <span
                    className="text-xs text-center tracking-[0.2em] text-[#a78bfa] uppercase mb-4 block"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                    — My music Playlist
                </span>
                <h2 className="flex items-center justify-center gap-4 text-center text-4xl! sm:text-5xl! md:text-6xl! font-black! tracking-tight! text-white"
                    style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontWeight: 700,
                    }}
                >
                    <FaSpotify className="text-[#1DB954]" aria-hidden />
                    Music I Love
                </h2>
            </div>

            {/* The bubble cloud — a fixed composition that scales with the page. */}
            <div className="container mx-auto px-6">
                <div
                    ref={cloudRef}
                    className="relative mx-auto mt-20 aspect-20/13 w-full max-w-275 sm:mt-28"
                >
                    {ITEMS.slice(0, SLOTS.length).map((item, i) => (
                        <BubbleShell key={item.title} slot={SLOTS[i]}>
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${item.title} on Spotify`}
                                className="m-bubble group relative block h-full w-full overflow-hidden rounded-full shadow-[0_18px_40px_-12px_rgba(0,0,0,0.35)]"
                            >
                                <Image
                                    src={item.image}
                                    alt=""
                                    fill
                                    unoptimized
                                    sizes="(max-width: 640px) 30vw, 18vw"
                                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                                />
                                <Gloss />
                            </a>
                        </BubbleShell>
                    ))}

                    {/* Spotify orb — rests centre-bottom, glides to follow the cursor,
              opens the Blended Peace player on click. */}
                    <div
                        className="absolute aspect-square -translate-x-1/2 -translate-y-1/2"
                        style={{
                            left: `${PLAY_SLOT.x}%`,
                            top: `${PLAY_SLOT.y}%`,
                            width: `${PLAY_SLOT.s}%`,
                            zIndex: PLAY_SLOT.z,
                        }}
                    >
                        <motion.button
                            type="button"
                            onClick={() => setOpen(true)}
                            aria-haspopup="dialog"
                            aria-label="Play Blended Peace"
                            style={{ x: offX, y: offY }}
                            className="m-bubble group relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_18px_40px_-12px_rgba(0,0,0,0.3)]"
                        >
                            <FaSpotify className="relative z-10 h-[52%] w-[52%] text-[#1DB954] transition-transform duration-300 group-hover:scale-110" />
                            <span
                                aria-hidden
                                className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_24%,rgba(255,255,255,1),transparent_55%)]"
                            />
                            <span
                                aria-hidden
                                className="absolute inset-0 rounded-full shadow-[inset_0_0_22px_rgba(255,255,255,0.9),inset_0_-12px_26px_rgba(0,0,0,0.14)] ring-1 ring-black/5"
                            />
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Floating player — Blended Peace embedded, backdrop click or Esc to
          dismiss. */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-100 flex items-center justify-center p-4"
                    >
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setOpen(false)}
                        />
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-label="Blended Peace — Spotify player"
                            initial={{ scale: 0.9, y: 24, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.92, y: 16, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 320, damping: 28 }}
                            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#121212] shadow-2xl"
                        >
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                aria-label="Close player"
                                className="absolute right-3 top-3 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/25"
                            >
                                <IoClose />
                            </button>
                            <iframe
                                title="Blended Peace — Spotify player"
                                src={`${BLENDED_PEACE_EMBED}?utm_source=generator&theme=0`}
                                width="100%"
                                height={352}
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                                className="block"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default MusicPlaylists;
