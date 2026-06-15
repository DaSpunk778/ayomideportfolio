"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Tools",
];

const stacks = [
  {
    name: "React",
    category: "Frontend",
    level: 95,
    color: "#61dafb",
    description: "Component architecture, hooks, performance",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    level: 92,
    color: "#3178c6",
    description: "Type-safe development at scale",
  },
  {
    name: "Next.js",
    category: "Frontend",
    level: 88,
    color: "#ffffff",
    description: "Full-stack React framework",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    level: 90,
    color: "#38bdf8",
    description: "Utility-first CSS framework",
  },
  {
    name: "Vue.js",
    category: "Frontend",
    level: 75,
    color: "#42b883",
    description: "Progressive JS framework",
  },
  {
    name: "Node.js",
    category: "Backend",
    level: 30,
    color: "#68a063",
    description: "Server-side JavaScript runtime",
  },
  {
    name: "Express",
    category: "Backend",
    level: 30,
    color: "#ffffff",
    description: "Minimal Node.js web framework",
  },
  //{ name: "GraphQL", category: "Backend", level: 80, color: "#e535ab", description: "API query language" },
  {
    name: "Go Lang",
    category: "Backend",
    level: 45,
    color: "#ffdd57",
    description: "Scripting and automation",
  },
  //{ name: "Rust", category: "Backend", level: 55, color: "#ce422b", description: "Systems programming language" },
  {
    name: "PostgreSQL",
    category: "Database",
    level: 85,
    color: "#336791",
    description: "Relational database mastery",
  },
  {
    name: "MongoDB",
    category: "Database",
    level: 82,
    color: "#47a248",
    description: "NoSQL document database",
  },
  //{ name: "Redis", category: "Database", level: 80, color: "#ff4438", description: "In-memory data structure store" },
  {
    name: "Sequelize",
    category: "Database",
    level: 88,
    color: "#5a67d8",
    description: "Next-gen ORM for TypeScript",
  },
  //{ name: "Docker", category: "DevOps", level: 85, color: "#2496ed", description: "Container platform" },
  //{ name: "Kubernetes", category: "DevOps", level: 70, color: "#326ce5", description: "Container orchestration" },
  {
    name: "AWS",
    category: "DevOps",
    level: 78,
    color: "#ff9900",
    description: "Cloud services platform",
  },
  {
    name: "GitHub Actions",
    category: "DevOps",
    level: 85,
    color: "#2088ff",
    description: "CI/CD automation",
  },
  {
    name: "Figma",
    category: "Tools",
    level: 80,
    color: "#f24e1e",
    description: "Design & prototyping",
  },
  {
    name: "Vite",
    category: "Tools",
    level: 90,
    color: "#bd34fe",
    description: "Lightning-fast build tool",
  },
  {
    name: "Jest",
    category: "Tools",
    level: 82,
    color: "#c21325",
    description: "JavaScript testing framework",
  },
  //{ name: "Turborepo", category: "Tools", level: 72, color: "#ffffff", description: "Monorepo tooling" },
];

export default function Stack() {
  const { ref, inView } = useInView(0.1);
  const [activeCategory, setActiveCategory] = useState("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered =
    activeCategory === "All"
      ? stacks
      : stacks.filter((s) => s.category === activeCategory);

  return (
    <section id="stack" ref={ref} className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 pointer-event-none">
        <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-[#22d3ee]/5 blur-[120px]" />
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
            — Tech Stack
          </span>
          <h2
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
            }}
            className="text-4xl sm:text-5xl text-white mb-4 leading-tight"
          >
            Tools I work with
          </h2>
          <p
            className="text-[#71717a] max-w-xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            A curated set of technologies I've mastered over the years of
            building production applications across diverse industries.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#7c3aed] text-white"
                  : "border border-white/8 text-[#a1a1aa] hover:text-white hover:border-white/20"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((stack, i) => (
            <motion.div
              key={stack.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.05 * (i % 8), duration: 0.4 }}
              onMouseEnter={() => setHovered(stack.name)}
              onMouseLeave={() => setHovered(null)}
              className="relative p-5 rounded-xl border border-white/6 bg-white/2 hover:border-white/15 hover:bg-white/4 transition-all duration-300 group cursor-default overflow-hidden"
            >
              {/* Glow on hover */}
              {hovered === stack.name && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${stack.color}15 0%, transparent 70%)`,
                  }}
                />
              )}

              {/* Color dot */}
              <div
                className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center"
                style={{ backgroundColor: `${stack.color}20` }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: stack.color }}
                />
              </div>

              <p
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 600,
                }}
                className="text-white text-sm mb-1"
              >
                {stack.name}
              </p>
              <p
                className="text-[#71717a] text-xs mb-3 leading-snug"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {stack.description}
              </p>

              {/* Level bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] text-[#52525b]"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    proficiency
                  </span>
                  <span
                    className="text-[10px]"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: stack.color,
                    }}
                  >
                    {stack.level}%
                  </span>
                </div>
                <div className="h-1 w-full bg-white/6 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: stack.color }}
                    initial={{ width: 0 }}
                    animate={
                      inView ? { width: `${stack.level}%` } : { width: 0 }
                    }
                    transition={{
                      delay: 0.3 + i * 0.02,
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
