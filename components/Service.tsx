"use client"

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";
import {
  Code2,
  Layout,
  Server,
  Smartphone,
  Gauge,
  Layers,
} from "lucide-react";

const services = [
  {
    number: "01",
    icon: Code2,
    title: "Web Development",
    description:
      "End-to-end web applications built with modern frameworks. From architecture decisions to deployment — clean, maintainable code that scales without drama.",
    tags: ["React", "Next.js", "TypeScript"],
    accent: "#7c3aed",
  },
  {
    number: "02",
    icon: Layout,
    title: "Frontend Engineering",
    description:
      "Pixel-precise UIs with obsessive attention to interaction quality. Component libraries, design systems, and the kind of micro-details users feel but never notice.",
    tags: ["Design Systems", "Motion", "Accessibility"],
    accent: "#7c3aed",
  },
  {
    number: "03",
    icon: Server,
    title: "API & Backend",
    description:
      "Robust APIs, data pipelines, and server infrastructure built for reliability. REST, GraphQL, real-time WebSockets — whatever the product actually needs.",
    tags: ["Node.js", "GraphQL", "PostgreSQL"],
    accent: "#22d3ee",
  },
  {
    number: "04",
    icon: Smartphone,
    title: "Responsive & Mobile",
    description:
      "Experiences that feel native on every screen size. Mobile-first thinking from day one, not bolted on at the end — because most of your users are on their phone.",
    tags: ["React Native", "PWA", "Touch UX"],
    accent: "#22d3ee",
  },
  {
    number: "05",
    icon: Gauge,
    title: "Performance Optimization",
    description:
      "Turning slow into fast. Core Web Vitals audits, bundle analysis, query optimization, and the kind of profiling work that shaves seconds off real user load times.",
    tags: ["Core Web Vitals", "Caching", "Profiling"],
    accent: "#7c3aed",
  },
  {
    number: "06",
    icon: Layers,
    title: "Full-Stack Products",
    description:
      "Complete product builds from zero — auth, payments, dashboards, admin panels, the works. Ideal for startups that need a technical co-founder for a sprint.",
    tags: ["SaaS", "Auth", "Payments"],
    accent: "#22d3ee",
  },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function Services() {
  const { ref, inView } = useInView(0.1);
  const [hovered, setHovered] = useState<number | null>(null);
  const isMobile = useIsMobile();

  return (
    <section id="services" ref={ref} className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-125 h-125 rounded-full bg-[#7c3aed]/5 blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#22d3ee]/4 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span
            className="text-xs tracking-[0.2em] text-[#a78bfa] uppercase mb-4 block"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            — What I Offer
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h2
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
              className="text-4xl sm:text-5xl text-white leading-tight max-w-sm"
            >
              What I can{" "}
              <span className="text-[#a78bfa]">build</span>{" "}
              for you
            </h2>
            <p
              className="text-[#71717a] max-w-xs leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Six focused disciplines. One engineer who cares about the whole product, not just the ticket.
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const isHovered = isMobile || hovered === i;
            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="relative rounded-2xl border bg-[#111117] p-7 flex flex-col gap-5 cursor-default overflow-hidden"
                style={{
                  borderColor: isHovered
                    ? `${service.accent}55`
                    : "rgba(255,255,255,0.06)",
                  transform: isHovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
                  boxShadow: isHovered
                    ? `0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px ${service.accent}30, 0 0 40px ${service.accent}12`
                    : "0 0 0 0 transparent",
                  transition: "border-color 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease",
                }}
              >
                {/* Radial glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at 0% 0%, ${service.accent}0d 0%, transparent 65%)`,
                    opacity: isHovered ? 1 : 0,
                  }}
                />

                {/* Top row: number + icon */}
                <div className="flex items-start justify-between">
                  {/* Number */}
                  <span
                    className="text-xs leading-none"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: isHovered ? service.accent : "rgba(255,255,255,0.15)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {service.number}
                  </span>

                  {/* Icon box */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{
                      backgroundColor: isHovered ? `${service.accent}20` : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isHovered ? `${service.accent}40` : "rgba(255,255,255,0.08)"}`,
                    }}
                  >
                    <service.icon
                      size={18}
                      style={{
                        color: isHovered ? service.accent : "#71717a",
                        transition: "color 0.3s ease",
                      }}
                    />
                  </div>
                </div>

                {/* Accent line */}
                <div
                  className="h-px w-10 rounded-full transition-all duration-500"
                  style={{
                    background: isHovered
                      ? `linear-gradient(90deg, ${service.accent}, transparent)`
                      : "rgba(255,255,255,0.08)",
                    width: isHovered ? "48px" : "28px",
                  }}
                />

                {/* Title + description */}
                <div className="flex flex-col gap-2.5 flex-1">
                  <h3
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
                    className="text-white text-lg leading-snug transition-colors duration-300"
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-[#71717a] text-sm leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-1 rounded-md transition-all duration-300"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        backgroundColor: isHovered
                          ? `${service.accent}12`
                          : "rgba(255,255,255,0.03)",
                        color: isHovered ? service.accent : "#52525b",
                        border: `1px solid ${isHovered ? `${service.accent}30` : "rgba(255,255,255,0.06)"}`,
                        transition: "all 0.3s ease",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl border border-white/6 bg-white/2"
        >
          <div>
            <p
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600 }}
              className="text-white mb-1"
            >
              Not sure what you need?
            </p>
            <p
              className="text-[#71717a] text-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Let's talk through your project and figure out the right approach together.
            </p>
          </div>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="shrink-0 px-6 py-3 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm transition-all duration-200 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
          >
            Start a conversation
          </button>
        </motion.div>
      </div>
    </section>
  );
}
