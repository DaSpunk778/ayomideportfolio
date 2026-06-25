"use client"

import { Code2, Github, Linkedin, Twitter, ArrowUp } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  //{ label: "Blogs", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-white/6 py-12 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-10">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#7c3aed] flex items-center justify-center">
                <Code2 size={14} className="text-white" />
              </div>
              <span
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
                className="text-white"
              >
                AY_dev
              </span>
            </div>
            <p
              className="text-[#52525b] text-sm max-w-xs"
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
                className="text-sm text-[#71717a] hover:text-white transition-colors"
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
                className="p-2.5 rounded-lg border border-white/8 text-[#71717a] hover:text-white hover:border-white/20 transition-all duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
            <button
              onClick={scrollTop}
              className="p-2.5 rounded-lg bg-[#7c3aed]/15 border border-[#7c3aed]/30 text-[#a78bfa] hover:bg-[#7c3aed]/25 transition-colors ml-1"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        <div className="border-t border-white/4 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p
            className="text-xs text-[#3f3f46]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            © 2026 Ayomide Samuel Akintomide — All rights reserved
          </p>
          <p
            className="text-xs text-[#3f3f46]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Built with Next.js · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
