'use client'

import { motion } from "motion/react";
import { Menu, X, Code2 } from "lucide-react";
import { useState, useEffect } from "react";


const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "Projects", href: "#projects" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
];

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
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            setOpen(false);
        };

    return(
        <motion.header 
        initial={{ y: -80, opacity: 0}}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1]}}
        className={`fixed top-0 left-0 right-o z-50 transition-all duration-300 $ {
            scrolled
            ? "bg-[#09090b]/90 backdrop-bur-xl border-b border-white/6"
            }`}
        >
         <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16" >
            {/*my navbar logo*/}
            <button
                onClick={() => scrollTo("#home")}
                className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#7c3aed] flex items-center justify-center group-hover:bg-[#a78bfa] transition-colors ">
                <Code2 size={16} className="text-white" />
              </div>
              <span
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
                    className="text-white text-lg tracking-tight"
                    >
                        AY_dev
                </span>
            </button>

            {/* Desktop links*/}
            <ul className="hidden md:flex items-ceter gap-1">
                {links.map((link) => {
            const id = link.href.slice(1);
            return (
              <li key={link.label}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-3 py-1.5 text-sm transition-colors rounded-md ${
                    active === id
                      ? "text-[#a78bfa]"
                      : "text-[#a1a1aa] hover:text-white"
                  }`}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-[#7c3aed]/15 rounded-md"
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </button>
              </li>
            );
          })}
            </ul>
         </nav>

        </motion.header>
    )
}