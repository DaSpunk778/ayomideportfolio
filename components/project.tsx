"use client"
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "../hooks/useInView";
import { ExternalLink, Github, X, ArrowRight, ArrowUpRight } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    title: "RESUME AI",
    description:
      "An AI-powered resume builder that transforms user input into polished, professional resumes in seconds. Built with Next.js, TypeScript, and OpenAI's API, it intelligently structures content, suggests impactful phrasing, and generates ATS-friendly resumes tailored to the user's industry and experience level.",
    image: "/cvcraft.png",
    tags: ["Next.js", "TypeScript", "openAI", "Tailwind"],
    category: "Full-Stack",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    stat: { value: "10M", label: "target users" },
  },
  {
    id: 2,
    title: "E&E Medical Ambulance Services",
    description:
      "A responsive ambulance booking platform that allows users to request emergency medical transport in real time. Designed for speed and clarity in critical situations, with a streamlined booking flow, service information, and direct contact options for immediate assistance. ",
    image: "/medical.png",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    category: "Full-Stack",
    liveUrl: "https://daspunk778.github.io/E-E-medical-ambulance-services/",
    githubUrl: "https://github.com/DaSpunk778/E-E-medical-ambulance-services",
    featured: true,
    year: "2026",
    stat: { value: "50+", label: "Cities served" },
  },
  {
    id: 3,
    title: "PMO's Portfolio (fashion & lifestyle)",
    description: 
      "A responsive ambulance booking platform that allows users to request emergency medical transport in real time. Designed for speed and clarity in critical situations, with a streamlined booking flow, service information, and direct contact options for immediate assistance. ",
    image: "/pmo's port.png",
    tags: ["Next.js", "TypeScript", "Tailwind", "framer-motion"],
    category: "Full-Stack",
    liveUrl: "https://pmo-portfolio-steel.vercel.app/",
    githubUrl: "https://github.com/DaSpunk778/pmo-portfolio",
    featured: true,
    year: "2026",
    stat: { value: "5+", label: "Events/day" },
  },
  {
    id: 4,
    title: "Framer-motion portfolio",
    description:
      "A personal portfolio built with Framer Motion and Aceternity UI, featuring fluid scroll animations, interactive hover effects, and a modern, visually engaging design. Crafted to showcase projects and skills through smooth, polished motion design.",
    image: "/portfolio.png",
    tags: ["next.js", "TailwindCss", "AcetenityUI"],
    category: "Tools",
    liveUrl: "https://ayomidesamuelportfolio.netlify.app/",
    githubUrl: "https://github.com/DaSpunk778/Ay-dev-portfolio",
    featured: true,
    year: "2026",
    stat: { value: "Motion", label: "UI" },
  },
  {
    id: 5,
    title: "KING STORES",
    description:
      "A fully functional e-commerce storefront built with HTML, JavaScript, and vanilla CSS. Uses JSON for data prototyping to simulate product listings, cart functionality, and dynamic rendering — demonstrating core e-commerce logic without relying on a framework. ",
    image: "/e-com.png",
    tags: [ "javaScript", "Vanilla Css"],
    category: "E-commerce",
    liveUrl: "https://daspunk778.github.io/ecommerce-project/",
    githubUrl: "https://github.com/DaSpunk778/ecommerce-project",
    featured: true,
    year: "2026",
    stat: { value: "4K+", label: "Weekly downloads" },
  },
  {
   id: 6,
    title: "KORRECT LOGIN",
    description:
      "A frontend UI prototype showcasing a clean, modern login and authentication flow. Focused on intuitive navigation, responsive layouts, and polished interaction design",
    image: "/klogin.png",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    category: "Frontend",
    liveUrl: "https://korrecttrivia.netlify.app/login",
    githubUrl: "#",
    featured: true,
    year: "2026",
    stat: { value: "1K+", label: "Active users" },
  },
  {
    id: 7,
    number: "07",
    title: "Meridian Social",
    role: "React Native + API",
    year: "2022",
    category: "Mobile App",
    description:
      "Niche community platform with real-time messaging, AI moderation, and a recommendation engine. Scaled to 50K users in 3 months.",
    imageA: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=760&h=500&fit=crop&auto=format",
    imageB: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=480&h=320&fit=crop&auto=format",
    liveUrl: "#",
    githubUrl: "#",
    tags: ["React Native", "Node.js", "Socket.io", "AWS", "PostgreSQL", "Expo", "Redis", "Cloudflare", "TensorFlow"],
    featured: true,
    stat: { value: "50K+", label: "Users" },
  },
];

const featured = projects.filter((p) => p.featured);
const allProjects = projects;

// ─── Tag Marquee ──────────────────────────────────────────────────────────────

function TagMarquee({ tags, paused }: { tags: string[]; paused?: boolean }) {
  const doubled = [...tags, ...tags, ...tags];
  return (
    <div className="overflow-hidden relative h-7">
      <div
        className="flex items-center gap-4 w-max"
        style={{
          animation: `tag-scroll 20s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {doubled.map((tag, i) => (
          <span
            key={i}
            className="text-[11px] shrink-0 whitespace-nowrap text-[#52525b]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {tag}
            <span className="ml-4 text-[#2a2a35]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Desktop editorial row ────────────────────────────────────────────────────

function DesktopRow({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative border-b border-white/[0.06] last:border-b-0"
    >
      {/* Hover row tint */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-sm"
        style={{
          background: "linear-gradient(90deg, rgba(124,58,237,0.04) 0%, transparent 60%)",
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className="relative grid grid-cols-[auto_1fr] gap-0 py-8">

        {/* ── LEFT: Dual overlapping image composition ── */}
        <div className="relative w-[340px] xl:w-[400px] mr-10 xl:mr-14 shrink-0">
          <div className="relative h-[200px] xl:h-[230px]">

            {/* Back image — slightly rotated, offset bottom-right */}
            <div
              className="absolute rounded-xl overflow-hidden border border-white/[0.06] transition-all duration-500 ease-out"
              style={{
                width: "72%",
                height: "78%",
                bottom: 0,
                right: 0,
                transform: hovered
                  ? "rotate(2.5deg) translate(6px, 4px)"
                  : "rotate(3.5deg) translate(8px, 6px)",
                zIndex: 1,
                boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
              }}
            >
              <img
                src={project.imageB}
                alt=""
                aria-hidden
                className="w-full h-full object-cover"
                style={{
                  filter: hovered ? "brightness(0.65)" : "brightness(0.45)",
                  transition: "filter 0.5s ease",
                }}
              />
            </div>

            {/* Front image — larger, top-left */}
            <div
              className="absolute rounded-xl overflow-hidden border border-white/[0.08] transition-all duration-500 ease-out"
              style={{
                width: "80%",
                height: "88%",
                top: 0,
                left: 0,
                zIndex: 2,
                boxShadow: hovered
                  ? "0 16px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.35)"
                  : "0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
                transform: hovered ? "scale(1.03)" : "scale(1)",
                transition: "box-shadow 0.4s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <img
                src={project.imageA}
                alt={project.title}
                className="w-full h-full object-cover"
                style={{
                  filter: hovered ? "brightness(0.85)" : "brightness(0.7)",
                  transition: "filter 0.5s ease",
                }}
              />
              {/* Purple glow top line on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
                style={{
                  background: "linear-gradient(90deg, #7c3aed, #22d3ee)",
                  opacity: hovered ? 1 : 0,
                }}
              />
            </div>

            {/* Stat badge — floats bottom-left of the image stack */}
            <motion.div
              className="absolute z-10 transition-all duration-300"
              style={{
                bottom: "-10px",
                left: "4px",
                opacity: hovered ? 1 : 0.6,
                transform: hovered ? "translateY(-2px)" : "translateY(0)",
              }}
            >
              <div className="px-2.5 py-1.5 rounded-lg bg-[#09090b]/90 border border-[#7c3aed]/30 backdrop-blur-sm">
                <span
                  className="text-[10px] text-[#a78bfa]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {project.stat.value}{" "}
                  <span className="text-[#52525b]">{project.stat.label}</span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── RIGHT: Text content ── */}
        <div className="flex flex-col justify-between min-h-[200px] xl:min-h-[230px] py-1">

          {/* Top: number + category + links */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span
                className="text-xs transition-colors duration-300"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: hovered ? "#a78bfa" : "rgba(255,255,255,0.15)",
                }}
              >
                {project.number}
              </span>
              <span
                className="text-[10px] px-2.5 py-1 rounded-full border transition-all duration-300"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: hovered ? "#a78bfa" : "#52525b",
                  borderColor: hovered ? "rgba(124,58,237,0.35)" : "rgba(255,255,255,0.08)",
                  backgroundColor: hovered ? "rgba(124,58,237,0.08)" : "transparent",
                }}
              >
                {project.category}
              </span>
            </div>
            {/* Links — fade in on hover */}
            <div
              className="flex gap-2 transition-opacity duration-300"
              style={{ opacity: hovered ? 1 : 0 }}
            >
              <a
                href={project.githubUrl}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] text-[#71717a] hover:text-white hover:border-white/20 text-xs transition-all"
                style={{ fontFamily: "'Inter', sans-serif" }}
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={13} /> Code
              </a>
              <a
                href={project.liveUrl}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs transition-all"
                style={{ fontFamily: "'Inter', sans-serif" }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={13} /> Live
              </a>
            </div>
          </div>

          {/* Title */}
          <div className="mb-3">
            <h3
              className="leading-none mb-2 transition-colors duration-300"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
                color: hovered ? "#a78bfa" : "#ffffff",
              }}
            >
              {project.title}
            </h3>
            {/* Animated underline */}
            <div className="relative h-px w-full overflow-hidden">
              <div className="absolute inset-0 bg-white/[0.06]" />
              <div
                className="absolute left-0 top-0 h-full transition-all duration-500"
                style={{
                  width: hovered ? "100%" : "0%",
                  background: "linear-gradient(90deg, #7c3aed, #22d3ee)",
                }}
              />
            </div>
          </div>

          {/* Role + year + description */}
          <div className="flex items-start gap-8 mb-5">
            <div className="shrink-0">
              <p
                className="text-[10px] text-[#3f3f46] mb-0.5 uppercase tracking-widest"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Role
              </p>
              <p
                className="text-sm text-white/80 whitespace-nowrap"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                {project.role}
              </p>
            </div>
            <div className="shrink-0">
              <p
                className="text-[10px] text-[#3f3f46] mb-0.5 uppercase tracking-widest"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Year
              </p>
              <p
                className="text-sm text-white/80"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {project.year}
              </p>
            </div>
            <div>
              <p
                className="text-[10px] text-[#3f3f46] mb-0.5 uppercase tracking-widest"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                About
              </p>
              <p
                className="text-sm text-[#71717a] leading-relaxed max-w-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {project.description}
              </p>
            </div>
          </div>

          {/* Tag marquee — bottom */}
          <TagMarquee tags={project.tags} paused={!hovered} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── All Projects Modal ───────────────────────────────────────────────────────
function AllProjectsModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ backgroundColor: "rgba(9,9,11,0.98)", backdropFilter: "blur(20px)" }}
    >
      <div className="flex items-center justify-between px-6 sm:px-12 py-5 border-b border-white/[0.06] shrink-0">
        <div>
          <p className="text-xs text-[#a78bfa] tracking-[0.2em] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Full Archive
          </p>
          <h2 className="text-2xl text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700 }}>
            {allProjects.length} projects
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-2.5 rounded-xl border border-white/[0.08] text-[#71717a] hover:text-white hover:border-white/20 transition-all"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 sm:px-12 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {allProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="group rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0e0e14] hover:border-[#7c3aed]/30 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={project.imageA}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-[0.65] group-hover:brightness-[0.8]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e14] via-transparent to-transparent" />
                <span
                  className="absolute top-3 left-3 text-[10px] px-2 py-1 rounded-full border border-[#7c3aed]/30 bg-[#0e0e14]/80 text-[#a78bfa] backdrop-blur-sm"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {project.category}
                </span>
                <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href={project.githubUrl} className="p-1.5 rounded-lg bg-[#09090b]/80 backdrop-blur-sm text-white/70 hover:text-white"><Github size={13} /></a>
                  <a href={project.liveUrl} className="p-1.5 rounded-lg bg-[#09090b]/80 backdrop-blur-sm text-white/70 hover:text-white"><ExternalLink size={13} /></a>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#52525b]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {project.number} · {project.year}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7c3aed]/10 text-[#a78bfa]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {project.stat.value} {project.stat.label}
                  </span>
                </div>
                <h3 className="text-white text-lg leading-snug group-hover:text-[#a78bfa] transition-colors" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700 }}>
                  {project.title}
                </h3>
                <p className="text-[#71717a] text-xs leading-relaxed flex-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {project.description}
                </p>
                <TagMarquee tags={project.tags} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Project() {
  const { ref, inView } = useInView(0.05);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="projects" ref={ref} className="py-24 sm:py-32 relative overflow-hidden">
      <style>{`
        @keyframes tag-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#7c3aed]/5 blur-[160px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#22d3ee]/4 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <span
              className="text-xs tracking-[0.2em] text-[#a78bfa] uppercase mb-4 block"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              — Selected Work
            </span>
            <h2
              className="text-4xl sm:text-5xl text-white leading-tight"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
            >
              Projects I&apos;ve
              <br />
              <span className="text-[#a78bfa]">shipped</span>
            </h2>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-3">
            <p className="text-[#71717a] text-sm sm:text-right leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              Three featured builds.{" "}
              <button onClick={() => setModalOpen(true)} className="text-[#a78bfa] hover:text-white underline underline-offset-2 transition-colors">
                See all {allProjects.length}
              </button>{" "}
              in the full archive.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#7c3aed]/30 bg-[#7c3aed]/10 text-[#a78bfa] hover:bg-[#7c3aed]/20 hover:border-[#7c3aed]/50 text-sm transition-all duration-200"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
            >
              View all projects <ArrowRight size={15} />
            </button>
          </div>
        </motion.div>

        {/* ── Desktop: editorial rows ── */}
        <div className="hidden sm:block border-t border-white/[0.06]">
          {featured.map((project, i) => (
            <DesktopRow key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* ── Mobile: horizontal scroll carousel ── */}
        <div className="sm:hidden -mx-4 px-4">
          <div
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            {featured.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="snap-start shrink-0 w-[88vw] rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0e0e14] flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={project.imageA} alt={project.title} className="w-full h-full object-cover brightness-75" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e14] via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 text-[10px] px-2.5 py-1 rounded-full border border-[#7c3aed]/30 bg-[#0e0e14]/80 text-[#a78bfa]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {project.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#52525b]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{project.number} · {project.year}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7c3aed]/10 text-[#a78bfa]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{project.stat.value} {project.stat.label}</span>
                  </div>
                  <h3 className="text-white text-xl leading-snug" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800 }}>{project.title}</h3>
                  <p className="text-[#71717a] text-xs leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{project.description}</p>
                  <div className="flex gap-2 mt-auto pt-2">
                    <a href={project.githubUrl} className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg border border-white/[0.08] text-[#a1a1aa] hover:text-white transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}><Github size={13} /> Code</a>
                    <a href={project.liveUrl} className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg bg-[#7c3aed] text-white" style={{ fontFamily: "'Inter', sans-serif" }}><ExternalLink size={13} /> Live</a>
                  </div>
                  <TagMarquee tags={project.tags} />
                </div>
              </motion.div>
            ))}

            {/* View-all card */}
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.35, duration: 0.5 }}
              onClick={() => setModalOpen(true)}
              className="snap-start shrink-0 w-[88vw] rounded-2xl border border-dashed border-[#7c3aed]/30 bg-[#7c3aed]/5 flex flex-col items-center justify-center gap-3 min-h-[200px]"
            >
              <div className="w-12 h-12 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 flex items-center justify-center">
                <ArrowUpRight size={20} className="text-[#a78bfa]" />
              </div>
              <span className="text-[#a78bfa] text-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600 }}>
                View all {allProjects.length} projects
              </span>
            </motion.button>
          </div>

          <div className="flex justify-center gap-1.5 mt-2">
            {[...featured, { id: 99 }].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && <AllProjectsModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}
