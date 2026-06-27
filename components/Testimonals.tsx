"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "../hooks/useInView";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Adegoke Emmanuel",
    role: "Learn2Earn Fellow",
    company: "Learn2Earn",
    avatar: "/thobad.jpeg",
    content:
      "Working alongside Ay, what struck me most was the consistency — clean component structure, thoughtful naming, and a real eye for responsive design across devices. He doesn't just make things work, he makes sure they work well everywhere, from desktop down to mobile Safari quirks most people overlook.",
    rating: 3,
    project: "Hackhaton",
  },
  {
    id: 2,
    name: "Matthew Iluobe",
    role: "Head of Product",
    company: "E&E Medical Ambulance Services",
    avatar: "/mathhew.jpeg",
    content:
      "Ay built our ambulance booking platform from the ground up, and the attention to detail was outstanding. Every requirement we had — even small UI tweaks — was implemented quickly and thoughtfully. The final product felt polished, fast, and genuinely production-ready.",
    rating: 5,
    project: "Product Website",
  },
  {
    id: 3,
    name: "Mr Hope Tomiwa",
    role: "Senior Developer",
    company: "Korrect Technology Solutions",
    avatar: "/korrrect.jpeg",
    content:
      "What stands out about Ay is the willingness to ask the right questions and actually understand why something works, not just copy-paste a fix. Watching him debug, refine animations, and push through deployment issues showed real growth and patience — the mark of a developer who's going to go far",
    rating: 4,
    project: "Mentor",
  },
  {
    id: 4,
    name: "Samuel Antai",
    role: "Learn2EarnFellow",
    company: "Learn2Earn",
    avatar: "/spidy.webp",
    content:
      "Ay has a sharp eye for detail — from pixel-perfect navbar alignment to smooth scroll-linked animations, nothing gets shipped until it actually feels right. Great person to collaborate with on a frontend build.",
    rating: 5,
    project: "Hackhaton",
  },
];

export default function Testimonials() {
  const { ref, inView } = useInView(0.1);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  {
    /**manual nav func */
  }
  const go = (dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  const current = testimonials[index];

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-24 sm:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 righ-0 w-96 h-96 rounded-full bg-[#22d3ee]/5 blur-[120px]" />
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[#7c3aed]/5 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="text-xs tracking-[0.2em] text-[#a78bfa] uppercase mb-4 block"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            — Testimonials
          </span>
          <h2
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
            }}
            className="text-4xl sm:text-5xl text-white leading-tight"
          >
            What people say
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative"
        >
          {/* Main Card*/}
          <div className="relative rounded-3xl border border-white/6 bg-[#111117] overflow-hidden p-8 sm:p-12 min-h-85 flex flex-col justify-between">
            {/* my quote icon */}
            <Quote
              size={80}
              className="absolute top-8 right-8 text-[#7c3aed]/10"
              strokeWidth={1}
            />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 60 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-[#fbbf24] fill-[#fbbf24]"
                    />
                  ))}
                </div>

                {/*quotes from people */}
                <blockquote
                  className="text-[16px] sm:text-[16px] text-white/80 leading-relaxed mb-8 max-w-3xl"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
                >
                  "{current.content}"
                </blockquote>

                {/** Attribution */}
                <div className="flex items-center gap-4">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#7c3aed]/30"
                  />
                  <div>
                    <p
                      style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontWeight: 600,
                      }}
                      className="text-white"
                    >
                      {current.name}
                    </p>
                    <p
                      className="text-sm text-[#71717a]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {current.role} at {current.company}
                    </p>
                  </div>
                  <div className="ml-auto hidden sm:block" >
                    <span
                      className="text-xs px-3 py-1.5 rounded-full border border-[#7c3aed]/30 text-[#a78bfa]"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {current.project}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

                                {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-8 bg-[#7c3aed]" : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                className="p-2.5 rounded-xl border border-white/8 text-[#71717a] hover:text-white hover:border-white/20 transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => go(1)}
                className="p-2.5 rounded-xl border border-white/8 text-[#71717a] hover:text-white hover:border-white/20 transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Mini cards row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8"
        >
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
              className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                i === index
                  ? "border-[#7c3aed]/40 bg-[#7c3aed]/10"
                  : "border-white/6 bg-white/2 hover:border-white/15"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span
                  className="text-xs text-white truncate"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                >
                  {t.name}
                </span>
              </div>
              <p
                className="text-[10px] text-[#52525b] truncate"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {t.company}
              </p>
            </button>
          ))}

        </motion.div>
      </div>
    </section>
  );
}
