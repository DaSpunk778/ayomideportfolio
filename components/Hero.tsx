'use client'
import { ArrowDown, Download, Github, Linkedin, Twitter, X } from "lucide-react";
import { motion } from "motion/react";
import { RiTwitterXLine } from "react-icons/ri";
import { useEffect, useRef, useState } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";


gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// This is ONLY the logic that touches the <h2> name — no portrait, no
// blurb, no reviews. Drop this into your component and swap `sectionRef`
// for whatever wraps your whole hero section (ScrollTrigger needs a
// trigger element to know when to fire).


const roles = ["Full-Stack developer", "Design Engineer"];

const floatingBadges = [
  { label: "Next.js", color: "#61dafb", x: "5%", y: "20%" },
  { label: "TypeScript", color: "#3178c6", x: "88%", y: "15%" },
  { label: "Node.js", color: "#68a063", x: "4%", y: "65%" },
  { label: "PostgreSQL", color: "red", x: "85%", y: "70%" },
  { label: "Sequelize", color: "yellow", x: "50%", y: "88%" },

];


export default function Hero() {
  // sectionRef = the ScrollTrigger "when has this scrolled into view" anchor
  // nameRef    = the actual heading the split/hover animation targets
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const blurbRef = useRef<HTMLParagraphElement>(null)


  {/* the typewritter effect, allowing me to type display and delete my roles */ }
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const tickRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = isDeleting ? 70 : 80; //time range

    tickRef.current = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1));//slie the texts, pick from the index then kepeps adding 
        if (displayed.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 3000);//pause for 1.6 secs before deleting
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));//removing my letters
        if (displayed.length === 0) {
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);//makes it loop back to the first word after th last one
        }
      }
    }, speed);

    return () => {
      if (tickRef.current) clearTimeout(tickRef.current);//without this and the useRef the timeout will keep running 
    };
  }, [displayed, isDeleting, roleIndex]);

  // Name heading: char-split entrance (scroll-triggered, once) + magnetic
  // pointer hover. Scoped to sectionRef so GSAP auto-cleans selectors/
  // listeners created inside if this component ever unmounts.
  useGSAP(
    () => {
      const heading = nameRef.current!;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(heading, { autoAlpha: 1 });
        return;
      }

      let split: SplitText | null = null;

      // Hoisted so the single cleanup return() below can always reach them,
      // whether or not blurbRef was attached yet.
      let onBlurbMove: ((e: PointerEvent) => void) | null = null;
      let onBlurbLeave: (() => void) | null = null;
      const blurb = blurbRef.current;

      try {
        console.log("1: starting split");
        split = SplitText.create(heading, {
          type: "chars",
          mask: "chars",
        });

        console.log("2: split done", split.chars.length, "chars");
        const chars = split.chars as HTMLElement[];


        const setters = chars.map((c) => ({
          y: gsap.quickTo(c, "y", { duration: 0.5, ease: "power3.out " }),
          rot: gsap.quickTo(c, "rotation", { duration: 0.5, ease: "power3.out" }),
          scale: gsap.quickTo(c, "scale", { duration: 0.5, ease: "back.out(3)" }),
        }));
        chars.forEach((c) => {
          c.style.display = "inline-block";
          c.style.transformOrigin = "50% 100%";
          c.style.willChange = "transform";
        });

        const RADIUS = 100; // px pointer influence per char 
        const onMove = (e: PointerEvent) => {
          chars.forEach((c, i) => {
            const r = c.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const dx = e.clientX - cx;
            const dist = Math.hypot(dx, e.clientY - cy);
            const f = Math.max(0, 1 - dist / RADIUS);
            const ease = f * f * (3 - 2 * f); //smoothstep
            setters[i].y(-46 * ease);
            setters[i].rot((dx > 0 ? -10 : 10) * ease);
            setters[i].scale(1 + 0.28 * ease);
          });
        };

        const onLeave = () => {
          setters.forEach((s) => {
            s.y(0);
            s.rot(0);
            s.scale(1);
          });
        };
        heading.style.pointerEvents = "auto";
        heading.addEventListener("pointermove", onMove); // fixed
        heading.addEventListener("pointerleave", onLeave); // fixed

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
          defaults: { ease: "power3.out" },
          complete: () => {
            chars.forEach((c) => {
              if (c.parentElement) c.parentElement.style.overflow = "visible";
            });
          },
        });

        console.log("3: timeline set up, about to reveal invisible ")
        tl.set(chars, { autoAlpha: 1 }, 0).from(
          split.chars,
          {
            yPercent: 115,
            duration: 1.1,
            ease: "expo.out",
            stagger: { each: 0.035, from: "center" },
          },
          0,
        );
        console.log("4: reveal fired");

         // ---- Blurb shimmer: gradient "shine" band tracks the cursor's ----
        // x-position through the paragraph text. Entrance stays on
        // framer-motion (the <motion.p> below); this only adds the hover.
        if (blurb) {
          const MUTED = "#71717a";
          //const BRAND1 = "#7c3aed";
          const BRAND2 = "#22d3ee";

          gsap.set(blurb, {
            backgroundImage: `linear-gradient(100deg, ${MUTED} 38%,  ${BRAND2} 52%, ${MUTED} 62%)`,
            backgroundSize: "250% 100%",
            backgroundPosition: "100% 0%",
            webkitBackgroundClip: "text",
            backgroundClip: "text",
            webkitTextFillColor: "transparent",
          });

          const pos = { p : 100 };
          const applyPos = () => {
            blurb.style.backgroundPosition = `${pos.p}% 0%`;
          };
          const posTo = gsap.quickTo(pos, "p", {
            duration: 0.45,
            ease: "power3.out",
            onUpdate: applyPos,
          });

          onBlurbMove = (e: PointerEvent) => {
            const r = blurb.getBoundingClientRect();
            const xFrac = gsap.utils.clamp(0, 1, (e.clientX - r.left) / r.width);
            posTo(((1.25 - xFrac) / 1.5) * 100);
          };
          onBlurbLeave = () => posTo(100);

          blurb.addEventListener("pointermove", onBlurbMove);
          blurb.addEventListener("pointerleave", onBlurbLeave);
        }

        return () => {
          heading.removeEventListener("pointermove", onMove);
          heading.removeEventListener("pointerLeave", onLeave);
          if (blurb && onBlurbMove) blurb.removeEventListener("pointermove", onBlurbMove);
          if (blurb && onBlurbLeave) blurb.removeEventListener("pointerleave", onBlurbLeave);
          split?.revert();
        };

      } catch (err) {
        console.error("GSAP setup crashed:", err);
        if (nameRef.current) {
          nameRef.current.style.opacity = "1";
          nameRef.current.style.visibility = "visible";
        }
      }
    },
    { scope: sectionRef },
  );


  const scrollToNext = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(167,139,250,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Raidial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-150 h-150 rounded-full opacity-20 blur-[80px] sm:blur-[120px] hidden sm:block"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, #22d3ee 40%, transparent 20%)" }}
        />
      </div>

      {/* floatig tech badges - them dey hidden for small screen sha */}
      {floatingBadges.map((badge, i) => (
        <motion.div
          key={badge.label}
          className="absolute hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border-white/10 bg-white/4 backdrop-blur-sm text-xs text-white/60 "
          style={{ left: badge.x, top: badge.y, willChange: "transform" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: 1 + i * 0.15, duration: 0.5 },
            scale: { delay: 1 + i * 0.15, duration: 0.5 },
            y: { delay: 1 + i * 0.15, duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: badge.color }}
          />
          {badge.label}
        </motion.div>
      ))}

      {/* page content  */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="inline-flex mt-20 sm:mt-0 items-center gap-2 px-4 py-1.5 rounded-full border border-[#7c3aed]/30 bg-[#7c3ead]/10 text-[#a78bfa] text-sm mb-8"
        >
          <span
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            className="w-1.5 h-1.5 rounded-full bg-[#22ee6d] animate-pulse" />
          Available for select work
        </motion.div>

        <h2
          ref={nameRef}
          style={{
            fontFamily: "var(--font-rubik-glitch), system-ui, sans-serif",

          }}
          className="text-center! whitespace-nowrap! tracking-tight! leading-[0.9]! text-white! text-[clamp(2rem,9vw,7rem)]! z-0! w-screen! max-w-none! relative! left-1/2! right-1/2! -ml-[50vw]! -mr-[50vw]!"
        >
          Ayomide Samuel
        </h2>

        {/* *
                <motion.h1
                 initial={{ opacity: 0, y: 30}}
                 animate={{ opacity: 1, y: 0}}
                 transition={{ delay: 0.35, duration: 0.7 }}
                 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800 }}
                 className="text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight mb-6"
                >
                Hi,I'm{" "}
                <span
                   className="relative inline-block"
                   style={{ color: "#a78bfa" }} 
                >
                    Ayomide
                    <motion.span
                      className="absolute -bottom-1 left-0 h-0.75 rounded-full"
                      style={{ background: "linear-gradient(90deg, #7c3ead, #22d3ee)" }}
                      initial={{ width: 0}}
                      animate={{ width: "100%" }}
                      transition={{ delay: 1, duration: 0.8}}
                    />
                </span>
                </motion.h1>
                */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0., duration: 0.6 }}
          className="h-10 sm:h-12 flex items-center justify-center mb-8"
        >
          <span
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
            className="text-xl sm:text-2xl lg:text-3xl text-[#a1a1aa] "
          >
            {displayed}
            <span className="inline-block w-0.5 h-7 bg-[#a78bfa] ml-1 animate-pulse align-middle" />
          </span>
        </motion.div>

        <motion.p
          ref={blurbRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
          className="text-base sm:text-lg  max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I craft high-performance web applications with a focus on clean architecture,
          exceptional UX, and scalable backend systems. Turning complex systems and ideas into elegant digital experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="group w-64 sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm transition-all duration-200 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}
          >
            View My Work
          </button>
          <a
            href="/ayomides_CV.pdf"

            className="group w-64 sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 hover:border-white/20 text-white/80 hover:text-white text-sm transition-all duration-200 bg-white/3 hover:bg-white/[0.07]"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}
          >
            <Download size={16} />
            Download CV
          </a>

        </motion.div>

        {/* social media links/icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          {[
            { icon: Github, href: "https://github.com/DaSpunk778", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/akintomide-ayomide-561832281/", label: "LinkedIn" },
            { icon: RiTwitterXLine, href: "https://x.com/Daspunk02", label: "Twitter" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="p-5 rounded-lg border border-white/8 text-[#71717a] hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-200"
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#71717a] hover:text-[#a78bfa] transition-colors"
      >
        <span className="text-xs"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          scroll
        </span>
        <ArrowDown size={16} />
      </motion.button>

    </section>
  );
}