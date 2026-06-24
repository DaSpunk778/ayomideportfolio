"use client"
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";

type GalleryImage = {
  Imageurl: string;
  alt: string;
  aspect: "landscape" | "portrait";
  caption: string;
};

// Row 1 — landscapes/travel, wide aspect ratios, drifts LEFT (slow)
const row1: GalleryImage[] = [
  {
    Imageurl: "",
    alt: "Mountain range with pine trees",
    aspect: "landscape",
    caption: "Hiking the Sierra Nevada",
  },
  {
    Imageurl: "",
    alt: "Camp truck in the desert at dusk",
    aspect: "landscape",
    caption: "Desert road trip, Nevada",
  },
  {
    Imageurl: "",
    alt: "Tech conference audience",
    aspect: "landscape",
    caption: "React Summit 2023, Amsterdam",
  },

];

// Row 2 — portrait mix, drifts RIGHT (medium speed)
const row2: GalleryImage[] = [
  {
    Imageurl: "",
    alt: "Man walking through cave",
    aspect: "portrait",
    caption: "Cenotes, Yucatán",
  },
  {
    Imageurl: "",
    alt: "Coffee mug on laptop",
    aspect: "portrait",
    caption: "Late-night shipping",
  },
  {
    Imageurl: "",
    alt: "Green mountains and clouds",
    aspect: "portrait",
    caption: "Swiss Alps detour",
  },

];

// Row 3 — mixed wide, drifts LEFT (faster)
const row3: GalleryImage[] = [
  {
    Imageurl: "",
    alt: "People inside conference",
    aspect: "landscape",
    caption: "ViteConf afterparty",
  },
  {
    Imageurl: "",
    alt: "Snow-capped mountain range",
    aspect: "landscape",
    caption: "Winter in the Rockies",
  },
  {
    Imageurl: "",
    alt: "Coffee next to MacBook Pro",
    aspect: "landscape",
    caption: "The essential fuel",
  },

];


function MarqueeRow({
  images,
  direction = "left",
  speed = 40,
  rowIndex = 0,
}: {
  images: GalleryImage[];
  direction?: "left" | "right";
  speed?: number;
  rowIndex?: number;
}) {
  // Duplicate for seamless loop
  const doubled = [...images, ...images];

  return (
    <div className="overflow-hidden relative">
      {/* Fade masks on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #09090b, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #09090b, transparent)" }} />

      <div
        className="flex gap-4 w-max"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((img, i) => (
          <GalleryCard key={`${rowIndex}-${i}`} img={img} />
        ))}
      </div>
    </div>
  );
}

function GalleryCard({ img }: { img: GalleryImage }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative shrink-0 rounded-xl overflow-hidden cursor-pointer group"
      style={{
        width: img.aspect === "portrait" ? "220px" : "340px",
        height: img.aspect === "portrait" ? "300px" : "210px",
        boxShadow: hovered
          ? "0 0 0 2px rgba(124,58,237,0.7), 0 0 30px rgba(124,58,237,0.25)"
          : "0 0 0 1px rgba(255,255,255,0.06)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      <img
        src={img.Imageurl}
        alt={img.alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        style={{
          filter: hovered ? "brightness(1.1)" : "brightness(0.75)",
          transition: "filter 0.4s ease, transform 0.5s ease",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

      {/* Caption */}
      <div
        className="absolute bottom-0 left-0 right-0 p-3 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
      >
        <p
          className="text-white text-xs leading-tight"
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
        >
          {img.caption}
        </p>
      </div>

      {/* Purple glow corner accent */}
      {hovered && (
        <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-[#7c3aed] to-[#22d3ee]" />
      )}
    </div>
  );
}

export default function Gallery() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="gallery" ref={ref} className="py-24 sm:py-32 relative overflow-hidden">
      {/* CSS keyframe animations injected inline */}
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#7c3aed]/6 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#22d3ee]/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span
            className="text-xs tracking-[0.2em] text-[#a78bfa] uppercase mb-4 block"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            — Beyond the Code
          </span>
          <h2
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
            className="text-4xl sm:text-5xl text-white mb-4 leading-tight"
          >
            Life in{" "}
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(90deg, #a78bfa, #22d3ee)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Frames
            </span>
          </h2>
          <p
            className="text-[#71717a] max-w-lg mx-auto"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
          >
            Events, travel, behind-the-scenes moments — the world that exists
            outside the terminal window.
          </p>
        </motion.div>
      </div>

      {/* Row 1 — left, slow (50s) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="mb-4"
      >
        <MarqueeRow images={row1} direction="left" speed={50} rowIndex={0} />
      </motion.div>

      {/* Row 2 — right, medium (38s) — portrait images, taller row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.35, duration: 0.7 }}
        className="mb-4"
      >
        <MarqueeRow images={row2} direction="right" speed={38} rowIndex={1} />
      </motion.div>

      {/* Row 3 — left, faster (28s) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        <MarqueeRow images={row3} direction="left" speed={28} rowIndex={2} />
      </motion.div>

      {/* Bottom caption */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-center mt-10 text-[#3f3f46] text-xs"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        hover any image to reveal the story
      </motion.p>
    </section>
  );
}
