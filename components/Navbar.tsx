/* eslint-disable react/no-unescaped-entities */
'use client'

import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Code2, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ScrollSmoother } from "gsap/ScrollSmoother";



const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Stacks", href: "#stack" },
  { label: "Testimonials", href: "#testimonials" },
  //{ label: "Gallery", href: "#gallery"},
  { label: "Contact", href: "#contact" },
];

function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative grid place-items-center w-9 h-9 rounded-lg border border-border-strong text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors ${className}`}
    >
      {/* Render a stable icon until mounted to avoid hydration mismatch */}
      {mounted ? (
        isDark ? <Sun size={17} /> : <Moon size={17} />
      ) : (
        <Sun size={17} className="opacity-0" />
      )}
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home")

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = links.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.slice(1);
    setOpen(false); // close menu first

    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const smoother = ScrollSmoother.get();
      if (smoother) {
        // Let ScrollSmoother own the scroll so momentum stays smooth.
        smoother.scrollTo(el, true, "top 80px");
      } else {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 500); // wait for menu close animation (matches your 0.25s + buffer)
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 border w-[calc(100%-1.5rem)] ${scrolled
        ? "mt-3 md:mt-4 md:max-w-6xl rounded-2xl border-border-strong bg-background/60 shadow-lg"
        : "mt-3 md:mt-0 md:max-w-none rounded-2xl md:rounded-none border-border-strong md:border-x-0 md:border-t-0 "
        }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16" >
        {/*my navbar logo*/}
        <button
          onClick={() => scrollTo("#home")}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center group-hover:bg-brand-soft transition-colors ">
            <Code2 size={16} className="text-white" />
          </div>
          <span
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
            className="text-foreground text-lg tracking-tight"
          >
            AY_dev
          </span>
        </button>

        {/* Desktop links*/}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const id = link.href.slice(1);
            return (
              <li key={link.label}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-3 py-1.5 text-sm transition-colors rounded-md ${active === id
                    ? "text-brand-text"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-brand-tint rounded-md"
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => scrollTo("#contact")}
            className="px-4 py-2 text-sm bg-brand hover:bg-brand-hover text-white rounded-lg transition-colors"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Let's Build
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="text-muted-foreground hover:text-foreground transition-colors p-1 "
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-background/80 backdrop-blur-xl border-b border-border"
          >
            <ul className="flex flex-col px-4 py-4 gap-1">
              {links.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="w-full text-left px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2 px-3">
                <button
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  onClick={() => scrollTo("#contact")}
                  className="w-full px-4 py-3 text-sm bg-brand hover:bg-brand-hover text-white rounded-lg transition-colors">
                  let's Build
                </button>
              </li>
            </ul>


          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
  )
}
