/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EMAIL = "akayomide11@gmail.com";

const FAQS = [
  {
    question: "What kind of projects do you take on?",
    answer:
      "SaaS platforms, e-commerce stores, business and portfolio websites, and ready-to-launch website templates — built end to end, from the first layout to deployment. I also take on frontend-only builds, APIs and backend work, and performance fixes for sites that already exist.",
  },
  {
    question: "What's your typical tech stack?",
    answer:
      "React, Next.js and TypeScript with Tailwind CSS on the frontend, and GSAP or Framer Motion for animation. Behind it: Node.js or Go with PostgreSQL or MySQL, deployed on Vercel or AWS with GitHub Actions. Designs start in Figma.",
  },
  {
    question: "How long does a project take?",
    answer:
      "It depends on scope. A landing page or template setup moves quickly; a multi-page business site or a full SaaS product takes longer. After our first call you get a timeline broken into milestones, so you always know what ships next.",
  },
  {
    question: "How much does a website cost?",
    answer:
      "Every project is priced on scope, and you get a clear quote before any work begins. Templates like Design Arena are the most affordable way to launch; custom web apps are quoted individually once we've talked through what you need.",
  },
  {
    question: "Can you work from my existing design or codebase?",
    answer:
      "Yes. Hand me a Figma file and I'll build it pixel-accurate, or point me at an existing codebase and I'll extend it, clean it up or make it faster — without forcing a rewrite you don't need.",
  },
  {
    question: "Do you handle hosting and maintenance after launch?",
    answer:
      "Yes. I set up hosting, domains and deployment, and I can stay on afterwards to maintain, monitor and improve the product, so you're never left with a site nobody looks after.",
  },
  {
    question: "Do you work with clients outside Nigeria?",
    answer:
      "All the time. I'm based in Lagos and work remotely with clients anywhere, overlapping working hours where needed and keeping every update written and easy to follow.",
  },
  {
    question: "How do we get started?",
    answer:
      "Send a message through the contact form below or email me with what you want to build. We talk through scope and timeline, then you get a clear plan and quote before anything starts.",
  },
];

const font = {
  heading: { fontFamily: "var(--font-sans), sans-serif", fontWeight: 700 },
  question: { fontFamily: "var(--font-sans), sans-serif", fontWeight: 600 },
  mono: { fontFamily: "var(--font-jetbrains), monospace" },
  body: { fontFamily: "var(--font-sans), sans-serif" },
};

const scrollToContact = () => {
  const el = document.getElementById("contact");
  if (!el) return;
  const smoother = ScrollSmoother.get();
  if (smoother) smoother.scrollTo(el, true, "top 80px");
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
};

function Accordion() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState<number>(0);
  const baseId = useId();

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.from(".faq-intro > *", {
        opacity: 0,
        y: reduce ? 0 : 30,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".faq-intro", start: "top 85%", once: true },
      });

      gsap.from(".faq-item", {
        opacity: 0,
        y: reduce ? 0 : 40,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { trigger: ".faq-list", start: "top 85%", once: true },
      });

      // Keep the intro in view while the questions scroll past (desktop only).
      // ScrollSmoother breaks CSS `position: sticky`, so this uses a ScrollTrigger pin.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const intro = sectionRef.current?.querySelector<HTMLElement>(".faq-intro");
        const list = sectionRef.current?.querySelector<HTMLElement>(".faq-list");
        if (!intro || !list) return;
        ScrollTrigger.create({
          trigger: intro,
          pin: true,
          pinSpacing: false,
          start: "top 120px",
          end: () => `+=${Math.max(0, list.offsetHeight - intro.offsetHeight)}`,
          invalidateOnRefresh: true,
        });
      });
    },
    { scope: sectionRef },
  );

  // Answer panels animate their height, so re-measure the pin once the animation settles.
  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 550);
    return () => window.clearTimeout(t);
  }, [open]);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-[#7c3aed]/5 blur-[140px]" />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        {/* Intro */}
        <div className="faq-intro flex flex-col lg:self-start">
          <span style={font.mono} className="mb-4 block text-xs uppercase tracking-[0.2em] text-brand-text">
            — FAQ
          </span>
          <h2
            style={font.heading}
            className="light-heading text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Questions,
            <br />
            <span className="text-brand-text">answered.</span>
          </h2>
          <p style={font.body} className="mt-6 max-w-md text-base leading-relaxed text-subtle">
            Everything clients usually ask before we work together. Don't see yours? Just ask — I'm
            happy to talk it through.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={scrollToContact}
              style={font.body}
              className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-foreground px-7 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Start a project
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
            <a
              href={`mailto:${EMAIL}`}
              style={font.body}
              className="inline-flex h-12 items-center gap-2.5 rounded-full border border-border-strong px-6 text-sm font-semibold text-foreground transition-colors hover:border-brand/60 hover:bg-brand-tint"
            >
              <Mail size={16} />
              Email me
            </a>
          </div>
        </div>

        {/* Questions */}
        <ul className="faq-list flex flex-col gap-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            const triggerId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;

            return (
              <li
                key={item.question}
                className={`faq-item rounded-[20px] border transition-colors duration-300 ${
                  isOpen
                    ? "border-brand/40 bg-surface shadow-[0_20px_50px_-30px_rgba(124,58,237,0.45)]"
                    : "border-border bg-surface-2 hover:border-border-strong"
                }`}
              >
                <h3>
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group flex w-full items-center gap-5 px-5 py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/60 rounded-[20px] md:gap-8 md:px-8 md:py-7"
                  >
                    <span
                      style={font.mono}
                      className={`w-6 shrink-0 text-xs font-bold transition-colors md:text-sm ${
                        isOpen ? "text-brand-text" : "text-subtle"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      style={font.question}
                      className="flex-1 text-base leading-snug text-foreground md:text-xl"
                    >
                      {item.question}
                    </span>
                    <span
                      aria-hidden
                      className={`relative grid size-10 shrink-0 place-items-center rounded-full transition-all duration-300 md:size-11 ${
                        isOpen
                          ? "rotate-180 bg-brand text-white"
                          : "bg-foreground/6 text-foreground group-hover:bg-foreground/10"
                      }`}
                    >
                      <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
                      <span
                        className={`absolute h-3.5 w-0.5 rounded-full bg-current transition-transform duration-300 ${
                          isOpen ? "scale-y-0" : "scale-y-100"
                        }`}
                      />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      style={font.body}
                      className="pb-7 pl-16 pr-5 text-sm leading-relaxed text-subtle md:pb-8 md:pl-22 md:pr-20 md:text-base md:leading-7"
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Accordion;
