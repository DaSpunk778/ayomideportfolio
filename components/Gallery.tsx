"use client"
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "../hooks/useInView";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const row1 = [
  { url: "https://images.unsplash.com/photo-1664234477006-f344b8e2354f?w=700&h=420&fit=crop&auto=format", fullUrl: "https://images.unsplash.com/photo-1664234477006-f344b8e2354f?w=1400&h=900&fit=crop&auto=format", alt: "Mountain range with pine trees", aspect: "landscape" as const, caption: "Hiking the Sierra Nevada", description: "A breathtaking ridge trail above the treeline — one of those mornings where the air is so clear you forget what city noise sounds like." },
  { url: "https://images.unsplash.com/photo-1734293047434-82b605dd29b8?w=700&h=420&fit=crop&auto=format", fullUrl: "https://images.unsplash.com/photo-1734293047434-82b605dd29b8?w=1400&h=900&fit=crop&auto=format", alt: "Camp truck in the desert at dusk", aspect: "landscape" as const, caption: "Desert road trip, Nevada", description: "Three days off-grid in the Black Rock Desert. No Wi-Fi, no meetings — just sand, stars, and the loudest silence imaginable." },
  { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&h=420&fit=crop&auto=format", fullUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&h=900&fit=crop&auto=format", alt: "Tech conference audience", aspect: "landscape" as const, caption: "React Summit 2023, Amsterdam", description: "Packed hall, incredible energy. Met so many engineers I'd only known from Twitter. The hallway track is always the real conference." },
  { url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=700&h=420&fit=crop&auto=format", fullUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1400&h=900&fit=crop&auto=format", alt: "MacBook and coffee workspace", aspect: "landscape" as const, caption: "Morning build sessions", description: "The 6am ritual: good coffee, no Slack notifications, and two hours of uninterrupted deep work before the world wakes up." },
  { url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=700&h=420&fit=crop&auto=format", fullUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1400&h=900&fit=crop&auto=format", alt: "Speaker presenting at tech event", aspect: "landscape" as const, caption: "Speaking at NodeConf 2023", description: "My talk on scaling real-time APIs drew a bigger room than expected. Nothing quite like live-coding in front of 400 people." },
  { url: "https://images.unsplash.com/photo-1542315192-1f61a1792f33?w=700&h=420&fit=crop&auto=format", fullUrl: "https://images.unsplash.com/photo-1542315192-1f61a1792f33?w=1400&h=900&fit=crop&auto=format", alt: "Dual monitor dev setup", aspect: "landscape" as const, caption: "The home lab", description: "Where most of the magic happens. Dual ultrawide setup, mechanical keyboard, and an embarrassing number of browser tabs at any given moment." },
];

const row2 = [
  { url: "https://images.unsplash.com/photo-1516739711484-6f80025660c6?w=420&h=560&fit=crop&auto=format", fullUrl: "https://images.unsplash.com/photo-1516739711484-6f80025660c6?w=900&h=1200&fit=crop&auto=format", alt: "Man walking through cave", aspect: "portrait" as const, caption: "Cenotes, Yucatán", description: "Discovered this hidden cenote on a detour from a client trip to Mexico City. Some of the most surreal light I've ever seen underground." },
  { url: "https://images.unsplash.com/photo-1618826908118-8360bc5dbdb5?w=420&h=560&fit=crop&auto=format", fullUrl: "https://images.unsplash.com/photo-1618826908118-8360bc5dbdb5?w=900&h=1200&fit=crop&auto=format", alt: "Coffee mug on laptop", aspect: "portrait" as const, caption: "Late-night shipping", description: "That particular brand of focused chaos that happens right before a big launch. Coffee is not optional at this stage." },
  { url: "https://images.unsplash.com/photo-1626948688703-0136bc0a90da?w=420&h=560&fit=crop&auto=format", fullUrl: "https://images.unsplash.com/photo-1626948688703-0136bc0a90da?w=900&h=1200&fit=crop&auto=format", alt: "Green mountains and clouds", aspect: "portrait" as const, caption: "Swiss Alps detour", description: "Squeezed a 4-day hike into a layover on the way back from a conference in Zürich. Worth every bit of jet lag." },
  { url: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=420&h=560&fit=crop&auto=format", fullUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=900&h=1200&fit=crop&auto=format", alt: "Speaker on stage", aspect: "portrait" as const, caption: "JSNation keynote", description: "Sharing the stage with engineers whose work I'd read for years. A full-circle moment that still doesn't feel entirely real." },
  { url: "https://images.unsplash.com/photo-1764022398523-cb127ab75581?w=420&h=560&fit=crop&auto=format", fullUrl: "https://images.unsplash.com/photo-1764022398523-cb127ab75581?w=900&h=1200&fit=crop&auto=format", alt: "Person on colorful mountain ridge", aspect: "portrait" as const, caption: "Rainbow Mountain, Peru", description: "Altitude: 5,200m. Oxygen: debatable. Views: absolutely worth the three-hour uphill in the dark." },
  { url: "https://images.unsplash.com/photo-1669386281840-c65077e28851?w=420&h=560&fit=crop&auto=format", fullUrl: "https://images.unsplash.com/photo-1669386281840-c65077e28851?w=900&h=1200&fit=crop&auto=format", alt: "River running through mountain valley", aspect: "portrait" as const, caption: "Kyrgyzstan backcountry", description: "Totally off the beaten track — rented a horse for two days and had this entire valley essentially to ourselves." },
];

const row3 = [
  { url: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=700&h=420&fit=crop&auto=format", fullUrl: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1400&h=900&fit=crop&auto=format", alt: "People inside conference", aspect: "landscape" as const, caption: "ViteConf afterparty", description: "The after-hours conversations at tech events are always the most honest. This one went until 2am and spawned two open-source collaborations." },
  { url: "https://images.unsplash.com/photo-1727206840110-307a05a0bf71?w=700&h=420&fit=crop&auto=format", fullUrl: "https://images.unsplash.com/photo-1727206840110-307a05a0bf71?w=1400&h=900&fit=crop&auto=format", alt: "Snow-capped mountain range", aspect: "landscape" as const, caption: "Winter in the Rockies", description: "A week completely off-grid, skiing powder and reading technical papers by firelight. The ideal reset between projects." },
  { url: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=700&h=420&fit=crop&auto=format", fullUrl: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1400&h=900&fit=crop&auto=format", alt: "Coffee next to MacBook Pro", aspect: "landscape" as const, caption: "The essential fuel", description: "Single-origin pour-over is non-negotiable. If the coffee is bad, the code will be too. That's just engineering thermodynamics." },
  { url: "https://images.unsplash.com/photo-1558008258-3256797b43f3?w=700&h=420&fit=crop&auto=format", fullUrl: "https://images.unsplash.com/photo-1558008258-3256797b43f3?w=1400&h=900&fit=crop&auto=format", alt: "Audience at conference", aspect: "landscape" as const, caption: "GraphQL Summit, SF", description: "Home turf. Attended every year since 2019 — watching this community grow from niche curiosity to industry standard has been something special." },
  { url: "https://images.unsplash.com/photo-1734293046563-2e51b2cc10be?w=700&h=420&fit=crop&auto=format", fullUrl: "https://images.unsplash.com/photo-1734293046563-2e51b2cc10be?w=1400&h=900&fit=crop&auto=format", alt: "ATV riding in desert", aspect: "landscape" as const, caption: "Desert off-roading", description: "Client approved the final deliverable on a Friday afternoon. By Saturday morning, we were riding ATVs in Moab. Balance is important." },
  { url: "https://images.unsplash.com/photo-1771887536502-71eb6dc95389?w=700&h=420&fit=crop&auto=format", fullUrl: "https://images.unsplash.com/photo-1771887536502-71eb6dc95389?w=1400&h=900&fit=crop&auto=format", alt: "Person typing on laptop", aspect: "landscape" as const, caption: "Building in cafés", description: "Sometimes the best debugging happens surrounded by ambient noise and strangers. A change of environment does things to the problem-solving brain." },
];

const allImages = [...row1, ...row2, ...row3];

type GalleryImage = (typeof allImages)[0];

// ─── Lightbox ────────────────────────────────────────────────────────────────

function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: GalleryImage[];
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const [direction, setDirection] = useState(0);

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setIndex((i) => (i + dir + images.length) % images.length);
    },
    [images.length]
  );

  // Keyboard navigation + close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const current = images[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-100 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 p-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/25 hover:bg-white/6 transition-all z-10"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      {/* Counter */}
      <span
        className="absolute top-6 left-1/2 -translate-x-1/2 text-xs text-white/30 z-10"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {index + 1} / {images.length}
      </span>

      {/* Left arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); go(-1); }}
        className="absolute left-4 sm:left-8 p-3 rounded-full border border-white/10 bg-white/4 text-white/60 hover:text-white hover:border-white/25 hover:bg-white/10 transition-all z-10"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); go(1); }}
        className="absolute right-4 sm:right-8 p-3 rounded-full border border-white/10 bg-white/4 text-white/60 hover:text-white hover:border-white/25 hover:bg-white/10 transition-all z-10"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>

      {/* Image + caption panel */}
      <div
        className="relative w-full max-w-4xl mx-16 sm:mx-24 flex flex-col items-center gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -direction * 60, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex flex-col items-center gap-5"
          >
            {/* Image */}
            <div
              className="relative rounded-xl overflow-hidden w-full"
              style={{
                maxHeight: "70vh",
                boxShadow: "0 0 0 1px rgba(124,58,237,0.35), 0 25px 60px rgba(0,0,0,0.7), 0 0 60px rgba(124,58,237,0.12)",
              }}
            >
              <img
                src={current.fullUrl}
                alt={current.alt}
                className="w-full h-full object-contain"
                style={{ maxHeight: "70vh", display: "block" }}
              />
              {/* Subtle top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: "linear-gradient(90deg, #7c3aed, #22d3ee)" }}
              />
            </div>

            {/* Caption */}
            <div className="text-center px-4">
              <p
                className="text-white text-base sm:text-lg mb-1.5"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600 }}
              >
                {current.caption}
              </p>
              <p
                className="text-[#71717a] text-sm leading-relaxed max-w-xl mx-auto"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {current.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot strip */}
        <div className="flex gap-1.5 flex-wrap justify-center max-w-xs">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: i === index ? "24px" : "6px",
                backgroundColor: i === index ? "#7c3aed" : "rgba(255,255,255,0.15)",
              }}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Marquee row ─────────────────────────────────────────────────────────────

function MarqueeRow({
  images,
  direction = "left",
  speed = 40,
  rowIndex = 0,
  onImageClick,
}: {
  images: GalleryImage[];
  direction?: "left" | "right";
  speed?: number;
  rowIndex?: number;
  onImageClick: (img: GalleryImage) => void;
}) {
  const doubled = [...images, ...images];

  return (
    <div className="overflow-hidden relative">
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #09090b, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #09090b, transparent)" }}
      />

      <div
        className="flex gap-4 w-max"
        style={{ animation: `marquee-${direction} ${speed}s linear infinite` }}
      >
        {doubled.map((img, i) => (
          <GalleryCard
            key={`${rowIndex}-${i}`}
            img={img}
            onClick={() => onImageClick(img)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function GalleryCard({ img, onClick }: { img: GalleryImage; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative shrink-0 rounded-xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed]"
      style={{
        width: img.aspect === "portrait" ? "220px" : "340px",
        height: img.aspect === "portrait" ? "300px" : "210px",
        boxShadow: hovered
          ? "0 0 0 2px rgba(124,58,237,0.7), 0 0 30px rgba(124,58,237,0.25)"
          : "0 0 0 1px rgba(255,255,255,0.06)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      <img
        src={img.url}
        alt={img.alt}
        loading="lazy"
        className="w-full h-full object-cover"
        style={{
          filter: hovered ? "brightness(1.1)" : "brightness(0.75)",
          transform: hovered ? "scale(1.08)" : "scale(1)",
          transition: "filter 0.4s ease, transform 0.5s ease",
        }}
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

      <div
        className="absolute bottom-0 left-0 right-0 p-3"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <p
          className="text-white text-xs leading-tight"
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
        >
          {img.caption}
        </p>
      </div>

      {hovered && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-[#7c3aed] to-[#22d3ee]" />
      )}
    </button>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Gallery() {
  const { ref, inView } = useInView(0.1);
  const [lightbox, setLightbox] = useState<{ index: number } | null>(null);

  const openLightbox = (img: GalleryImage) => {
    const index = allImages.findIndex((i) => i.url === img.url);
    setLightbox({ index: index >= 0 ? index : 0 });
  };

  return (
    <section id="gallery" ref={ref} className="py-24 sm:py-32 relative overflow-hidden">
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#7c3aed]/6 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#22d3ee]/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span
            className="text-xs tracking-[0.2em] text-[#a78bfa] uppercase mb-4 block"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            — Beyond the Code
          </span>
          <h2
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
            className="text-4xl sm:text-5xl text-white mb-4 leading-tight"
          >
            Life in{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #a78bfa, #22d3ee)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Frames
            </span>
          </h2>
          <p
            className="text-[#71717a] max-w-lg mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Events, travel, behind-the-scenes moments — the world that exists
            outside the terminal window.
          </p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.7 }} className="mb-4">
        <MarqueeRow images={row1} direction="left" speed={50} rowIndex={0} onImageClick={openLightbox} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35, duration: 0.7 }} className="mb-4">
        <MarqueeRow images={row2} direction="right" speed={38} rowIndex={1} onImageClick={openLightbox} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5, duration: 0.7 }}>
        <MarqueeRow images={row3} direction="left" speed={28} rowIndex={2} onImageClick={openLightbox} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        className="text-center mt-10 text-[#3f3f46] text-xs"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        click any image to expand · use arrow keys to navigate
      </motion.p>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            images={allImages}
            startIndex={lightbox.index}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
