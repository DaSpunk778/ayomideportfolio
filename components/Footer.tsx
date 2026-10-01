"use client"

import { useRef } from "react";
import { Code2, Github, Linkedin, Twitter, ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  //{ label: "Blogs", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !wordmarkRef.current) return;

      // Giant outlined name drifts sideways as the footer scrolls into view.
      gsap.fromTo(
        wordmarkRef.current,
        { xPercent: -4 },
        {
          xPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <footer ref={rootRef} className="border-t border-border py-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6" data-reveal>
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-10">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#7c3aed] flex items-center justify-center">
                <Code2 size={14} className="text-white" />
              </div>
              <span
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
                className="text-foreground"
              >
                AY_dev
              </span>
            </div>
            <p
              className="text-subtle text-sm max-w-xs"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Full-stack developer crafting high-performance web experiences.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(l.href.slice(1))?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm text-subtle hover:text-foreground transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Social + scroll top */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: "https://github.com/DaSpunk778", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/akintomide-ayomide-561832281/", label: "LinkedIn" },
              { icon: Twitter, href: "https://x.com/Daspunk02", label: "Twitter" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="p-2.5 rounded-lg border border-border text-subtle hover:text-foreground hover:border-border-strong transition-all duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
            <button
              onClick={scrollTop}
              className="p-2.5 rounded-lg bg-brand-tint border border-[#7c3aed]/30 text-brand-text hover:bg-[#7c3aed]/25 transition-colors ml-1"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* BIg outlined name*/}
        <div ref={wordmarkRef} className="pointer-events-none select-none -mt-4 md:-mt-8">
          <h2
            className="text-center whitespace-nowrap leading-none font-extrabold uppercase tracking-tight text-[10vw] sm:text-[9vw] md:text-[7vw] lg:text-[8vw]"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              WebkitTextStroke: "1.5px #7c3aed",
              color: "transparent",
            }}
          >
            Ayomide Samuel
          </h2>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p
            className="text-xs text-subtle"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            © 2026 Ayomide Samuel Akintomide — All rights reserved
          </p>
          <p
            className="text-xs text-subtle"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Built with Next.js · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
