"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "../hooks/useInView";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { p, title } from "motion/react-client";
import Image from "next/image";
import { Category } from "@mui/icons-material";


const projects = [
  {
    id: 1,
    title: "RESUME AI",
    description: "A full-featured customer relationship management system built with Next.js 14, TypeScript, and PostgreSQL. Real-time notifications, advanced analytics, and team collaboration features.",
    image: "/resume.png",
    tags: ["Next.js", "TypeScript", "openAI", "Tailwind"],
    category: "Full-Stack",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    year: "2026",
  },
  {
    id: 2,
    title: "E&E Medical Ambulance Services",
    description: "A comprehensive React component library with 80+ components, Figma integration, automated accessibility testing, and full TypeScript support. ",
    image: "/medical.png",
    tags: ["Next.js", "TypeScript", "openAI", "Tailwind"],
    category: "Full-Stack",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    year: "2026",
  },
  {
    id: 3,
    title: "E&E Medical Ambulance Services",
    description: "A full-featured customer relationship management system built with Next.js 14, TypeScript, and PostgreSQL. Real-time notifications, advanced analytics.",
    image: "/portfolio.png",
    tags: ["javascipt", "VanillaCss"],
    category: "Full-Stack",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    year: "2026",
  },
  {
    id: 4,
    title: "RESUME AI",
    description: "A comprehensive React component library with 80+ components, Figma integration, automated accessibility testing, and full TypeScript support. ",
    image: "/e-com.png",
    tags: ["Next.js", "TypeScript", "openAI", "Tailwind"],
    category: "E-commerce",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    year: "2026",
  },
  {
    id: 5,
    title: "RESUME AI",
    description: "A full-featured customer relationship management system built with Next.js 14, TypeScript, and PostgreSQL. Real-time notifications, advanced analytics.",
    image: "/resume.png",
    tags: ["Next.js", "TypeScript", "openAI", "Tailwind"],
    category: "Frontend",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    year: "2026",
  },
  {
    id: 6,
    title: "RESUME AI",
    description: "A comprehensive React component library with 80+ components, Figma integration, automated accessibility testing, and full TypeScript support.",
    image: "/",
    tags: ["Next.js", "TypeScript", "openAI", "Tailwind"],
    category: "Tools",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    year: "2026",
  },
];

const cats = ["All", "Full-Stack", "Frontend", "Data", "Tools", "E-commerce"];

export default function Projects() {
  const { ref, inView } = useInView(0.1);
  const [filter, setFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="pojects" ref={ref} className="py-24 sm:py-32 relative">
      <div className="absolute top-0 right-1/3 w-96 h-96 rounded-full bg-[#7c3aed]/5 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-xs tracking-[0.2em] text-[#a78bfa] uppercase mb-4 block">
              — Recent Projects
            </span>
            <h2
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 700,
              }}
              className="text-4xl sm:text-5xl text-white leading-tight"
            >
              Works I'm proud of
            </h2>
          </div>
          <a
            href="#"
            className="flex items-center gap-1.5 text-sm text-[#a78bfa] hover:text-white transition-colors shrink-0"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            View all on GitHub <ArrowUpRight size={16} />
          </a>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {cats.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 ${
                filter === cat
                  ? "bg-[#7c3aed] text-white"
                  : "border border-white/8 text-[#a1a1aa] hover:text-white hover:border-white/20"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/** featured projects (first one) */}
        <AnimatePresence mode="wait">
          <motion.div
           key={filter}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           transition={{ duration: 0.35 }}
          >
            {filtered.length > 0 && filtered[0].featured && filter === "All" && (
               <div className="">
                  <FeaturedCard project={filtered[0]} />
               </div> 
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered
                  .filter((p) => !(p.featured && filter === "All" && p.id === filtered[0].id))
                  .map((project, i) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.4 }}
                      onMouseEnter={() => setHoveredId(project.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="group elative rounded-2xl overflow-hidden border border-white/6 bg-[#111117] hover:border-[#7c3aed]/30 transition-all duration-300"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img 
                           src={project.image}
                           alt={project.title}
                           className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-tfrom-[#111117] via-[#111117]/20 to-transparent"/>
                        <div className="absolute top-3 rigtht-3 flex gap-2">
                            <a
                             href={project.liveUrl}
                             className="p-2 rounded-lg bg-[#09090b]/80 backdrop-blur-sm text-white/60 hover:text-white transition-colors opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 duration-300 "
                            >
                              <ExternalLink size={17} />
                            </a>
                            <a
                            href={project.githubUrl}
                            className="p-2 rounded-lg bg-[#09090b]/80 backdrop-blur-sm text-white/60 hover:text-white transition-colors opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 duration-300 delay-75"
                            >
                          <Github size={17} />
                        </a>
                        </div>
                        </div>

                        <div className="p-5">
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className="text-[10px] text-[#52525b]"
                              style={{ fontFamily: "'JetBrains Mono', monospac" }}
                            >
                                {project.year}
                            </span>
                            <span 
                              className="text-[10px] px-2 py-0.5 rounded-full border border-[#7c3aed]/30 text-[#a78bfa]"
                            >
                                {project.category}
                            </span>
                          </div>
                          <h3
                           style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
                            className="text-white text-lg mb-2 group-hover:text-[#a78bfa] transition-colors"
                          >
                            {project.title}
                          </h3>
                          <p
                           className="text-[#71717a] text-sm leading-relaxed mb-4 line-clamp-3"
                           style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags.slice(0, 3).map((tag) => (
                               <span 
                                key={tag}
                                className="text-[10px] px-2 py-0.5 rounded bg-white/4 text-[#a1a1aa] border border-white/6"
                                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                               >
                                {tag}
                               </span> 
                            ))}
                          </div>
                        </div>

                    </motion.div>
                  ))
                }
            </div>


          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function FeaturedCard({ project }: { project: (typeof projects)[0] }) {
    return (
        <div className="goup relative rounded-2xl overflow-hidden border-[#7c3aed]/20 bg-[#111117] hover:border-[#7c3aed]/40 transition-all duration-300">

        </div>
    );

}