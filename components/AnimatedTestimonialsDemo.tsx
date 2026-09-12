"use client"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useInView } from "../hooks/useInView";
import { motion, AnimatePresence } from "motion/react";

export default function AnimatedTestimonialsDemo() {
  const { ref, inView } = useInView(0.1);


  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "PMO's Fashion & Lifestyle",
      designation: "client",
      src: "/Timi.png",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "/ayomide.jpg",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "/timi.png",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "ayomide.jpg",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "Timi.png",
    },
  ];
  return (

    <section
      id="testimonials"
      ref={ref}
      className="py-24 sm:py-22 relative overflow-hidden"
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

      </div>



      <AnimatedTestimonials testimonials={testimonials} />
    </section>
  );
}
