/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { IoArrowForwardOutline } from "react-icons/io5";
import { ExternalLink, Github } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "motion/react";

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
};

const WORK: Work[] = [
  {
    id: 1,
    name: "FAVOR STORES",
    video: "/videos/favor-stores.webm",
    category: "Saas",
    year: "2026",
    liveUrl: "#",
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
  heading: { fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800 },
  subheading: { fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600 },
  mono: { fontFamily: "'JetBrains Mono', monospace" },
  body: { fontFamily: "'Inter', sans-serif" },
};

const GRID_LIMIT = 2;

const PortfolioSection = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const featured = WORK.find((w) => w.featured);
  const gridItems = WORK.filter((w) => !w.featured).slice(0, GRID_LIMIT);
  const hasMore = WORK.filter((w) => !w.featured).length > GRID_LIMIT;
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
              className="text-xs tracking-[0.2em] text-[#a78bfa] uppercase mb-4 block"
            >
              — Recent Projects
            </span>
            <h2
              style={font.heading}
              className="text-[30px] lg:text-[clamp(2.5rem,7vw,6.5rem)]! leading-[0.85]! tracking-tight! text-white!"
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
                className="work-card group flex! flex-col! gap-5! rounded-3xl! bg-[#000000] border! border-[#181818] hover:border-[#7c3aed]/30! transition-colors! duration-300! p-2! pb-5!"
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
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={work.image}
                        alt={work.name}
                        className="absolute! inset-0! h-full! w-full! object-cover! transition-[filter]! duration-500! group-hover:blur-md!"
                      />
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
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={work.image}
                        alt={work.name}
                        className="absolute! inset-0! h-full! w-full! object-cover! transition-[filter]! duration-500! group-hover:blur-md!"
                      />
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
                  <span style={font.subheading} className="text-sm! text-white!">
                    {work.name}
                  </span>
                  <div className="flex! items-center! gap-4! text-xs!" style={font.mono}>
                    <span className="text-[#a78bfa]!">{work.category}</span>
                    <span className="text-[#71717a]!">{work.year}</span>
                  </div>
                </div>

                {work.description && (
                  <p style={font.body} className="px-3! text-[#71717a]! text-sm! leading-relaxed! line-clamp-2!">
                    {work.description}
                  </p>
                )}

                <div className="tag-marquee-group relative! overflow-hidden! px-3!">
                  <div className="tag-marquee flex! w-max! gap-2! whitespace-nowrap!">
                    {[...work.tags, ...work.tags].map((tag, i) => (
                      <span key={`${tag}-${i}`} style={font.mono} className="text-sm! text-white/35!">
                        {tag}
                        {i < work.tags.length * 2 - 1 ? "," : ""}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}

          {hasEmptySlot && (
            <article className="work-card flex! min-h-64! items-center! justify-center! rounded-3xl! bg-[#111117]! border! border-white/6! p-6! md:min-h-0!">
              <p style={font.body} className="max-w-[18rem]! text-center! text-sm! leading-relaxed! text-[#71717a]!">
                More projects coming soon
              </p>
            </article>
          )}
        </div>

        {/* Featured showcase — sits below the grid */}
        {featured && (
          <article className="feature-card group/feature mt-6! flex! flex-col! gap-5! rounded-3xl! bg-[#000000]! border! border-[#181818]! p-3! pb-5!">
            <a
              href={featured.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${featured.name}`}
              className="feature-frame relative! block! aspect-16/10! overflow-hidden! rounded-2xl!"
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
                  className="text-[10px] px-2 py-1 rounded-full bg-[#7c3aed]/20 border border-[#7c3aed]/30 text-[#a78bfa] shrink-0"
                >
                  Featured Project
                </span>
                <span style={font.heading} className="text-sm! text-white! truncate">
                  {featured.name}
                </span>
              </div>
              <div style={font.mono} className="flex items-center gap-4 text-xs text-[#a78bfa] md:text-sm md:gap-6 ml-0 md:ml-auto">
                <span className="text-[#a78bfa]!">{featured.category}</span>
                <span className="text-[#71717a]!">{featured.year}</span>
              </div>
            </div>

            {featured.description && (
              <p style={font.body} className="px-3! text-[#71717a]! text-sm! leading-relaxed!">
                {featured.description}
              </p>
            )}

            <div className="tag-marquee-group relative! overflow-hidden! px-3!">
              <div className="tag-marquee flex! w-max! gap-2! whitespace-nowrap!">
                {[...featured.tags, ...featured.tags].map((tag, i) => (
                  <span key={`${tag}-${i}`} style={font.mono} className="text-sm! text-white/35!">
                    {tag}
                    {i < featured.tags.length * 2 - 1 ? "," : ""}
                  </span>
                ))}
              </div>
            </div>
          </article>
        )}

        {/* See more → all remaining projects */}
        {hasMore && (
          <div className="mt-6! flex! justify-center! py-12! pt-24!">
            <Link
              href="/portfolio"
              style={font.heading}
              className="group/all inline-flex! items-center! gap-3! text-lg md:text-2xl! text-white! transition-colors! hover:text-white/60!"
            >
              See more projects
              <IoArrowForwardOutline className="transition-transform! duration-300! group-hover/all:translate-x-1!" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;