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
    const[filter, SetFilter ] = useState("All");
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

    return (
        <section id="pojects" ref={ref} className="py-24 sm:py-32 relative">
            <div className="absolute top-0 right-1/3 w-96 h-96 rounded-full bg-[#7c3aed]/5 blur-[130px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6" >

            </div>
        </section>
    );

}