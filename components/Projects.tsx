"use client"
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
       description: "An AI-Powered Resume generat ",
       image: "/resume.png",
       tags: ["Next.js", "TypeScript", "openAI", "Tailwind" ],
       category: "Full-stack",
       liveUrl: "#",
       githubUrl: "#",
       featured: false,
        year: "2026",
    },
    {
       id: 1,
       title: "RESUME AI",
       description: "An AI-Powered Resume generat ",
       image: "/resume.png",
       tags: ["Next.js", "TypeScript", "openAI", "Tailwind" ],
        category: "Full-stack",
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        year: "2026",
    },
    {
       id: 1,
       title: "E&E Medical Ambulance Services",
       description: "An AI-Powered Resume generat ",
       image: "/resume.png",
       tags: ["javascipt", "VanillaCss", ],
        category: "Full-stack",
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        year: "2026",
    },
    {
       id: 1,
       title: "RESUME AI",
       description: "An AI-Powered Resume generat ",
       image: "/resume.png",
       tags: ["Next.js", "TypeScript", "openAI", "Tailwind" ],
        category: "Full-stack",
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        year: "2026",
    },
    {
       id: 1,
       title: "RESUME AI",
       description: "An AI-Powered Resume generat ",
       image: "/resume.png",
       tags: ["Next.js", "TypeScript", "openAI", "Tailwind" ],
        category: "Full-stack",
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        year: "2026",
    },
    {
       id: 1,
       title: "RESUME AI",
       description: "An AI-Powered Resume generat ",
       image: "/resume.png",
       tags: ["Next.js", "TypeScript", "openAI", "Tailwind" ],
        category: "Full-stack",
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        year: "2026",
    },
];

const cats = ["All", "Full-Stack", "Frontend", "Data", "Tools", "Mobile"];

export default function Projects() {
    const {ref, inView } = useInView(0.1);
    const [filter, setFilter] = useState("All");
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

    return (
        <section id="pojects" ref={ref} className="py-24 sm:py-32 relative">
            <div className="absolute top-0 right-1/3 w-96 h-96 rounded-full bg-[#7c3aed]/5 blur-[130px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6" >
                <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={inView ? { opacity: 1, y: 0} : {}}
                 transition={{ duration: 0.6 }}
                 className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
                >
                  <div>
                    <span
                     className="text-xs tracking-[0.2em] text-[#a78bfa] uppercase mb-4 block"
                    >
                      — Recent Projects  
                    </span>
                    <h2
                     style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
                     className="text-4xl sm:text-5xl text-white leading-tight"
                    >
                       Works I'm proud of 
                    </h2>
                  </div>
                  <a
                   href="#"
                   className="flex items-center gap-1.5 text-sm text-[#a78bfa] hover:text-white transition-colors shrink-0"
                   style={{ fontFamily: "'Inter', sans-serif"}}
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
            </div>
        </section>
    );

}