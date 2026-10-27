/* eslint-disable react/no-unescaped-entities */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useEmblaCarousel from "embla-carousel-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Work = {
  id: number;
  name: string;
  image?: string;
  category: string;
  year: string;
  liveUrl?: string;
  githubUrl?: string;
  description?: string;
  imageHover?: string;
  video?: string;
  tags: string[];
  featured?: boolean;
  /** "contain" shows the whole screenshot over a blurred backdrop instead of cropping it. */
  imageFit?: "cover" | "contain";
};

const WORK: Work[] = [
  {
    id: 1,
    name: "FAVOR STORES",
    video: "/videos/favor-stores.webm",
    category: "Saas",
    year: "2026",
    liveUrl: "https://favor-stores.netlify.app/",
    githubUrl: "#",
    description:
      "A responsive e-commerce SaaS platform that allows users to get electrical home appliances at the comfort of their homes.",
    tags: ["Next.js", "TypeScript", "GSAP", "Tailwind", "Framer Motion", "PostgreSQL"],
    featured: true,
  },
  {
    id: 2,
    name: "KORRECT GAMES",
    video: "/videos/korrectgames.mp4",
    category: "Full-Stack",
    year: "2026",
    liveUrl: "https://korrectgames.com/",
    githubUrl: "#",
    description:
      "Korrect Games is a sports gaming platform where users can predict, play trivia, and win real cash prizes daily.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    id: 3,
    name: "DESIGN ARENA",
    image: "/Design-arena.png",
    imageFit: "contain",
    category: "Template",
    year: "2026",
    liveUrl: "https://design-arena-chi.vercel.app/",
    githubUrl: "#",
    description:
      "A fully customizable website template for interior design studios — services, a drag-to-compare before/after slider, pricing tiers, a filterable project gallery and a materials showcase, all tied together with smooth GSAP scroll animations.",
    tags: ["Next.js", "TypeScript", "Tailwind", "GSAP"],
  },
  {
    id: 4,
    name: "PMO's (fashion & lifestyle)",
    image: "/pmo's port.png",
    category: "Full-Stack",
    year: "2026",
    liveUrl: "https://pmo-portfolio-steel.vercel.app/",
    githubUrl: "https://github.com/DaSpunk778/pmo-portfolio",
    description:
      "A fashion and lifestyle portfolio site with fluid scroll-driven storytelling —and a media-rich collection showcase built for a designer client.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
  },
  {
    id: 5,
    name: "Framer-motion portfolio",
    image: "/portfolio.png",
    category: "Tools",
    year: "2026",
    liveUrl: "https://ayomidesamuelportfolio.netlify.app/",
    githubUrl: "https://github.com/DaSpunk778/Ay-dev-portfolio",
    description:
      "A personal portfolio built with Framer Motion and Aceternity UI, featuring fluid scroll animations, interactive hover effects, and a modern, visually engaging design.",
    tags: ["Next.js", "Tailwind CSS", "Aceternity UI"],
  },
  {
    id: 6,
    name: "KING STORES",
    image: "/e-com.png",
    category: "E-commerce",
    year: "2026",
    liveUrl: "https://daspunk778.github.io/ecommerce-project/",
    githubUrl: "https://github.com/DaSpunk778/ecommerce-project",
    description:
      "A fully functional e-commerce storefront built with HTML, JavaScript, and vanilla CSS. Uses JSON for data prototyping to simulate product listings, cart functionality, and dynamic rendering.",
    tags: ["JavaScript", "Vanilla CSS"],
  },
  {
    id: 7,
    name: "KORRECT LOGIN",
    image: "/klogin.png",
    category: "Frontend",
    year: "2026",
    liveUrl: "https://korrecttrivia.netlify.app/login",
    description:
      "A frontend UI prototype showcasing a clean, modern login and authentication flow. Focused on intuitive navigation, responsive layouts, and polished interaction design.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    id: 8,
    name: "TRIVIA FLOW",
    image: "/trivia.png",
    category: "Frontend",
    year: "2026",
    liveUrl: "https://trivia-flow-chi.vercel.app/landing",
    description:
      "A frontend UI prototype showcasing a clean, modern login and authentication flow. Focused on intuitive navigation, responsive layouts, and polished interaction design.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
  },
];

const font = {
  heading: { fontFamily: "var(--font-sans), sans-serif", fontWeight: 800 },
  subheading: { fontFamily: "var(--font-sans), sans-serif", fontWeight: 600 },
  mono: { fontFamily: "var(--font-jetbrains), monospace" },
  body: { fontFamily: "var(--font-sans), sans-serif" },
};

const GRID_LIMIT = 2;

const isLive = (url?: string) => !!url && url !== "#";

/** Tech-stack tags that slide sideways in an endless loop, like a carousel. Pauses on hover. */
const TagMarquee = ({
  tags,
  size = "md",
  className = "",
}: {
  tags: string[];
  size?: "sm" | "md";
  className?: string;
}) => {
  const maskRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Repeat short lists so each half of the track is wider than the card.
  const half: string[] = [];
  while (tags.length && half.length < 8) half.push(...tags);
  const duration = Math.max(14, half.length * 2.2);

  useGSAP(
    () => {
      const track = trackRef.current;
      const mask = maskRef.current;
      if (!track || !mask) return;

      // Slide by exactly one half, then loop: the second half is identical, so the seam is invisible.
      const tween = gsap.to(track, { xPercent: -50, duration, ease: "none", repeat: -1 });
      const pause = () => tween.pause();
      const play = () => tween.play();
      mask.addEventListener("pointerenter", pause);
      mask.addEventListener("pointerleave", play);
      return () => {
        mask.removeEventListener("pointerenter", pause);
        mask.removeEventListener("pointerleave", play);
      };
    },
    { scope: maskRef, dependencies: [duration] },
  );

  if (tags.length === 0) return null;

  const renderHalf = (copy: number) => (
    <div className="flex! shrink-0! items-center!">
      {half.map((tag, i) => (
        <span
          key={`${copy}-${i}`}
          style={font.mono}
          className={`whitespace-nowrap! pr-6! text-foreground/45! dark:text-white/40! ${size === "sm" ? "text-[11px]!" : "text-sm!"}`}
        >
          {tag}
        </span>
      ))}
    </div>
  );

  return (
    <div ref={maskRef} className={`tag-marquee-mask relative! overflow-hidden! ${className}`}>
      <span className="sr-only">{tags.join(", ")}</span>
      <div ref={trackRef} className="flex! w-max! will-change-transform!" aria-hidden>
        {renderHalf(0)}
        {renderHalf(1)}
      </div>
    </div>
  );
};

/* eslint-disable @next/next/no-img-element */
/** Grid card image: cropped to fill by default, or shown whole when imageFit is "contain". */
const GridImage = ({ work }: { work: Work }) => {
  if (work.imageFit !== "contain") {
    return (
      <img
        src={work.image}
        alt={work.name}
        className="absolute! inset-0! h-full! w-full! object-cover! transition-[filter]! duration-500! group-hover:blur-md!"
      />
    );
  }

  return (
    <>
      <img
        src={work.image}
        alt=""
        aria-hidden
        className="absolute! inset-0! h-full! w-full! scale-125! object-cover! blur-2xl! opacity-60!"
      />
      <div className="absolute! inset-0! bg-black/30!" />
      <div className="absolute! inset-0! flex! items-center! justify-center! p-4! md:p-6!">
        <img
          src={work.image}
          alt={work.name}
          className="h-auto! max-h-full! w-full! rounded-xl! object-contain! border! border-white/10! shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]! transition-[filter,transform]! duration-500! group-hover:scale-[1.02]! group-hover:blur-md!"
        />
      </div>
    </>
  );
};
/* eslint-enable @next/next/no-img-element */

/** Horizontal carousel of the smaller projects, shown after the featured card. */
const MoreWorkCarousel = ({ items }: { items: Work[] }) => {
  const [viewportRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    skipSnaps: true,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [progress, setProgress] = useState(0);

  const sync = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setProgress(Math.max(0, Math.min(1, emblaApi.scrollProgress())));
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const frame = requestAnimationFrame(sync);
    emblaApi.on("select", sync).on("scroll", sync).on("reInit", sync);
    return () => {
      cancelAnimationFrame(frame);
      emblaApi.off("select", sync).off("scroll", sync).off("reInit", sync);
    };
  }, [emblaApi, sync]);

  const navBtn =
    "grid! h-11! w-11! place-items-center! rounded-full! border! border-foreground/15! text-foreground! transition-all! duration-300! hover:border-[#7c3aed]/60! hover:bg-[#7c3aed]/10! disabled:opacity-30! disabled:pointer-events-none!";

  return (
    <div className="more-work mt-24!">
      <div className="flex! items-end! justify-between! gap-6! mb-8!">
        <div>
          <span style={font.mono} className="text-xs tracking-[0.2em] text-brand-text uppercase mb-3 block">
            — More work · {String(items.length).padStart(2, "0")}
          </span>
          <h3
            style={font.heading}
            className="text-2xl! md:text-4xl! leading-[0.95]! tracking-tight! text-foreground!"
          >
            More things I've built
          </h3>
        </div>

        <div className="flex! shrink-0! gap-2!">
          <button
            type="button"
            aria-label="Previous projects"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            className={navBtn}
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next projects"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            className={navBtn}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div ref={viewportRef} className="overflow-hidden! cursor-grab! active:cursor-grabbing!">
        <div className="flex! touch-pan-y! -ml-4!">
          {items.map((work, i) => (
            <div
              key={work.id}
              className="min-w-0! shrink-0! grow-0! basis-[82%]! sm:basis-[48%]! md:basis-[36%]! lg:basis-[28%]! pl-4!"
            >
              <article className="more-card group/more relative! flex! h-full! flex-col! rounded-2xl! bg-white! dark:bg-[#000000]! border! border-black/8! dark:border-[#181818]! shadow-[0_24px_60px_-40px_rgba(24,24,27,0.4)]! dark:shadow-none! p-1.5! pb-4! transition-colors! duration-300! hover:border-[#7c3aed]/30!">
                <a
                  href={isLive(work.liveUrl) ? work.liveUrl : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${work.name}`}
                  draggable={false}
                  className="flex! flex-1! flex-col! gap-4!"
                >
                  <div className="relative! aspect-16/10! overflow-hidden! rounded-xl! bg-surface-2! dark:bg-[#0c0c0f]!">
                    {work.video ? (
                      <video
                        src={work.video}
                        poster={work.image}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="absolute! inset-0! h-full! w-full! object-cover! transition-transform! duration-700! ease-out! group-hover/more:scale-105!"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={work.image}
                        alt={work.name}
                        loading="lazy"
                        draggable={false}
                        className="absolute! inset-0! h-full! w-full! object-cover! object-top! transition-transform! duration-700! ease-out! group-hover/more:scale-105!"
                      />
                    )}
                    <div className="pointer-events-none! absolute! inset-0! bg-linear-to-t! from-black/50! via-transparent! to-transparent! opacity-60! transition-opacity! duration-500! group-hover/more:opacity-100!" />

                    <span
                      style={font.mono}
                      className="absolute! left-3! top-3! rounded-full! bg-black/60! backdrop-blur-sm! border! border-white/10! px-2.5! py-1! text-[10px]! text-white/80!"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {isLive(work.liveUrl) && (
                      <span className="absolute! bottom-3! right-3! grid! h-9! w-9! place-items-center! rounded-full! bg-white! text-[#0c0c0f]! translate-y-2! opacity-0! transition-all! duration-300! group-hover/more:translate-y-0! group-hover/more:opacity-100!">
                        <ArrowUpRight size={16} />
                      </span>
                    )}
                  </div>

                  <div className="flex! flex-col! gap-2! px-2.5!">
                    <div className="flex! items-center! justify-between! gap-3!">
                      <span style={font.subheading} className="truncate! text-sm! text-foreground!">
                        {work.name}
                      </span>
                      <span style={font.mono} className="shrink-0! text-[11px]! text-[#71717a]!">
                        {work.year}
                      </span>
                    </div>

                    {work.description && (
                      <p style={font.body} className="text-xs! leading-relaxed! text-[#71717a]! line-clamp-2!">
                        {work.description}
                      </p>
                    )}

                    <div className="mt-1! flex! items-center! gap-3!">
                      <span style={font.mono} className="shrink-0! text-[11px]! text-brand-text!">
                        {work.category}
                      </span>
                      <TagMarquee tags={work.tags} size="sm" className="min-w-0! flex-1!" />
                    </div>
                  </div>
                </a>

                {isLive(work.githubUrl) && (
                  <a
                    href={work.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${work.name} source code`}
                    className="absolute! right-4! top-4! z-10! rounded-lg! bg-[#09090b]/80! p-2! text-white/70! backdrop-blur-sm! transition-all! duration-300! hover:text-white! md:opacity-0! md:group-hover/more:opacity-100!"
                  >
                    <Github size={14} />
                  </a>
                )}
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll progress */}
      <div className="mt-8! h-px! w-full! overflow-hidden! bg-foreground/10!">
        <div
          className="h-full! bg-brand! dark:bg-[#a78bfa]! origin-left! transition-transform! duration-150! ease-out!"
          style={{ transform: `scaleX(${Math.max(progress, 0.08)})` }}
        />
      </div>
    </div>
  );
};

const PortfolioSection = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const featured = WORK.find((w) => w.featured);
  const others = WORK.filter((w) => !w.featured);
  const gridItems = others.slice(0, GRID_LIMIT);
  const moreItems = others.slice(GRID_LIMIT);
  const hasEmptySlot = gridItems.length % 2 === 1;

  useGSAP(
    () => {
      const imgs = gsap.utils.toArray<HTMLElement>(".work-img");
      imgs.forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".work-card"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      const cards = gsap.utils.toArray<HTMLElement>(".work-card");
      gsap.from(cards, {
        clipPath: "inset(100% 0% 0% 0%)",
        y: 60,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.15,
        scrollTrigger: { trigger: ".work-cards", start: "top 80%", once: true },
      });

      const moreCards = gsap.utils.toArray<HTMLElement>(".more-card");
      if (moreCards.length) {
        gsap.from(moreCards, {
          opacity: 0,
          x: 80,
          duration: 1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".more-work", start: "top 85%", once: true },
        });
      }

      const feature = gsap.utils.toArray<HTMLElement>(".feature-card")[0];
      if (!feature) return;

      gsap.from(feature, {
        clipPath: "inset(100% 0% 0% 0%)",
        y: 60,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: { trigger: feature, start: "top 80%", once: true },
      });

      gsap.fromTo(
        feature,
        { scale: 0.94, transformOrigin: "50% 0%" },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: feature, start: "top 90%", end: "top 40%", scrub: 1 },
        },
      );

      const media = feature.querySelector<HTMLVideoElement>("video");
      if (media) {
        const playInView = () => {
          media.muted = true;
          media.play().catch(() => {});
        };
        const st = ScrollTrigger.create({
          trigger: feature,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? playInView() : media.pause()),
        });
        if (st.isActive) playInView();
        else media.pause();
      }

      const frame = feature.querySelector<HTMLElement>(".feature-frame");
      const pill = feature.querySelector<HTMLElement>(".feature-pill");
      if (!frame || !pill) return;

      gsap.set(pill, { xPercent: -50, yPercent: -50, scale: 0.9 });
      const xTo = gsap.quickTo(pill, "x", { duration: 0.45, ease: "power3" });
      const yTo = gsap.quickTo(pill, "y", { duration: 0.45, ease: "power3" });

      const onMove = (e: PointerEvent) => {
        const r = frame.getBoundingClientRect();
        xTo(e.clientX - r.left);
        yTo(e.clientY - r.top);
      };
      const onEnter = (e: PointerEvent) => {
        const r = frame.getBoundingClientRect();
        gsap.set(pill, { x: e.clientX - r.left, y: e.clientY - r.top });
        gsap.to(pill, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "power3.out" });
      };
      const onLeave = () => {
        gsap.to(pill, { autoAlpha: 0, scale: 0.9, duration: 0.3, ease: "power3.in" });
      };

      frame.addEventListener("pointermove", onMove);
      frame.addEventListener("pointerenter", onEnter);
      frame.addEventListener("pointerleave", onLeave);
      return () => {
        frame.removeEventListener("pointermove", onMove);
        frame.removeEventListener("pointerenter", onEnter);
        frame.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="projects"
      data-nav-theme="dark"
      className="relative! min-h-screen! flex! flex-col! justify-center! bg-transparent! px-6! pt-42! pb-12!"
    >
      <div className="absolute top-0 right-1/3 w-96 h-96 rounded-full bg-[#7c3aed]/5 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl! mx-auto! w-full! relative z-10">
        {/* Header */}
        <div className="work-heading flex! flex-col! sm:flex-row! sm:items-end! justify-between! gap-6! mb-12!">
          <div>
            <span
              style={font.mono}
              className="text-xs tracking-[0.2em] text-brand-text uppercase mb-4 block"
            >
              — Recent Projects
            </span>
            <h2
              style={font.heading}
              className="text-[30px] lg:text-[clamp(2.5rem,7vw,6.5rem)]! leading-[0.85]! tracking-tight! text-foreground!"
            >
              Works I'm proud of
            </h2>
          </div>
        </div>

        {/* Grid — capped at 2 */}
        <div className="work-cards grid! grid-cols-1! gap-6! md:grid-cols-2!">
          {gridItems.map((work) => {
            const hasLiveLink = work.liveUrl && work.liveUrl !== "#";

            return (
              <article
                key={work.id}
                className="work-card group flex! flex-col! gap-5! rounded-3xl! bg-white! dark:bg-[#000000]! border! border-black/8! dark:border-[#181818]! shadow-[0_24px_60px_-40px_rgba(24,24,27,0.4)]! dark:shadow-none! hover:border-[#7c3aed]/30! transition-colors! duration-300! p-2! pb-5!"
              >
                {hasLiveLink ? (
                  <div
                   role="link"
                    tabIndex={0}
                    onClick={() => window.open(work.liveUrl, "_blank", "noopener,noreferrer")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        window.open(work.liveUrl, "_blank", "noopener,noreferrer");
                      }
                    }}
                    aria-label={`Visit ${work.name}`}
                    className="relative! block! aspect-40/35! overflow-hidden! rounded-2xl! cursor-pointer!"
                  >
                    {work.video ? (
                      <video
                        src={work.video}
                        poster={work.image}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        aria-label={work.name}
                        className="absolute! inset-0! h-full lg:h-150 w-full! object-cover! transition-[filter]! duration-500! group-hover:blur-md!"
                      />
                    ) : (
                      <GridImage work={work} />
                    )}
                    <div className="pointer-events-none! absolute! inset-0! bg-black/30! opacity-0! transition-opacity! duration-500! group-hover:opacity-100!" />

                    <div className="absolute! top-3! right-3! flex! gap-2! opacity-0! group-hover:opacity-100! transition-opacity! duration-300! z-10!">
                      {work.githubUrl && work.githubUrl !== "#" && (
                        <a
                          href={work.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2! rounded-lg! bg-[#09090b]/80! backdrop-blur-sm! text-white/70! hover:text-white! transition-colors!"
                        >
                          <Github size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="relative! aspect-40/35! overflow-hidden! rounded-2xl!">
                    {work.video ? (
                      <video
                        src={work.video}
                        poster={work.image}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        aria-label={work.name}
                        className="absolute! inset-0! h-full lg:h-150 w-full! object-cover! transition-[filter]! duration-500! group-hover:blur-md!"
                      />
                    ) : (
                      <GridImage work={work} />
                    )}
                    <div className="pointer-events-none! absolute! inset-0! bg-black/30! opacity-0! transition-opacity! duration-500! group-hover:opacity-100!" />

                    <div className="absolute! top-3! right-3! flex! gap-2! opacity-0! group-hover:opacity-100! transition-opacity! duration-300! z-10!">
                      {work.githubUrl && work.githubUrl !== "#" && (
                        <a
                          href={work.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2! rounded-lg! bg-[#09090b]/80! backdrop-blur-sm! text-white/70! hover:text-white! transition-colors!"
                        >
                          <Github size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex! items-center! justify-between! gap-4! px-3!">
                  <span style={font.subheading} className="text-sm! text-foreground!">
                    {work.name}
                  </span>
                  <div className="flex! items-center! gap-4! text-xs!" style={font.mono}>
                    <span className="text-brand-text!">{work.category}</span>
                    <span className="text-[#71717a]!">{work.year}</span>
                  </div>
                </div>

                {work.description && (
                  <p style={font.body} className="px-3! text-[#71717a]! text-sm! leading-relaxed! line-clamp-2!">
                    {work.description}
                  </p>
                )}

                <TagMarquee tags={work.tags} className="mx-3!" />
              </article>
            );
          })}

          {hasEmptySlot && (
            <article className="work-card flex! min-h-64! items-center! justify-center! rounded-3xl! bg-surface! border! border-border! p-6! md:min-h-0!">
              <p style={font.body} className="max-w-[18rem]! text-center! text-sm! leading-relaxed! text-[#71717a]!">
                More projects coming soon
              </p>
            </article>
          )}
        </div>

        {/* Featured showcase — sits below the grid */}
        {featured && (
          <article className="feature-card group/feature mt-6! flex! flex-col! gap-5! rounded-3xl! bg-white! dark:bg-[#000000]! border! border-black/8! dark:border-[#181818]! shadow-[0_24px_60px_-40px_rgba(24,24,27,0.4)]! dark:shadow-none! p-3! pb-5!">
            <a
              href={featured.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${featured.name}`}
              className="feature-frame relative! block! aspect-16/10! overflow-hidden! rounded-2xl! bg-surface-2! dark:bg-transparent!"
            >
              {featured.video ? (
                <video
                  src={featured.video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={featured.name}
                  className="feature-img absolute! inset-0! h-full! w-full! object-contain! transition-[filter]! duration-500! group-hover/feature:blur-md!"
                />
              ) : (
                <img
                  src={featured.image}
                  alt={featured.name}
                  className="feature-img absolute! inset-0! h-full! w-full! object-cover! transition-[filter]! duration-500! group-hover/feature:blur-md!"
                />
              )}
              <div className="pointer-events-none! absolute! inset-0! bg-black/40! opacity-0! transition-opacity! duration-500! group-hover/feature:opacity-100!" />
              <span
                style={{ opacity: 0, visibility: "hidden", ...font.body }}
                className="feature-pill pointer-events-none! absolute! left-0! top-0! z-20! inline-flex! items-center! gap-2! whitespace-nowrap! rounded-full! bg-white! px-5! py-3! text-sm! font-semibold! text-[#0c0c0f]!"
              >
                {featured.liveUrl && featured.liveUrl !== "#"
                  ? "View live"
                  : "In progress"}
                <IoArrowForwardOutline className="-rotate-45!" />
              </span>
            </a>

            <div className="flex! items-center! justify-between! gap-4! px-3!">
              <div className="flex! items-center! gap-3!">
                <span
                  style={font.mono}
                  className="text-[10px] px-2 py-1 rounded-full bg-brand-tint border border-brand/30 text-brand-text shrink-0"
                >
                  Featured Project
                </span>
                <span style={font.heading} className="text-sm! text-foreground! truncate">
                  {featured.name}
                </span>
              </div>
              <div style={font.mono} className="flex items-center gap-4 text-xs text-brand-text md:text-sm md:gap-6 ml-0 md:ml-auto">
                <span className="text-brand-text!">{featured.category}</span>
                <span className="text-[#71717a]!">{featured.year}</span>
              </div>
            </div>

            {featured.description && (
              <p style={font.body} className="px-3! text-[#71717a]! text-sm! leading-relaxed!">
                {featured.description}
              </p>
            )}

            <TagMarquee tags={featured.tags} className="mx-3!" />
          </article>
        )}

        {/* Remaining projects — horizontal carousel */}
        {moreItems.length > 0 && <MoreWorkCarousel items={moreItems} />}
      </div>
    </section>
  );
};

export default PortfolioSection;