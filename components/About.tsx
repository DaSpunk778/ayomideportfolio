'use client'
import { MapPin, Calendar, Coffee, Zap } from "lucide-react";
import { useInView } from "../hooks/useInView";
import { motion } from "motion/react";
import Image from "next/image";


const stats = [
  { value: "5+", label: "Years Experience", icon: Calendar },
  { value: "60+", label: "Projects Shipped", icon: Zap },
  { value: "30+", label: "Happy Clients", icon: Coffee },
  { value: "12", label: "Countries Served", icon: MapPin }, 
]

export default function About() {
    const { ref, inView } = useInView(0.15);

    return (
        <section id="about" ref={ref} className="py-24 sm:py-32 relative overflow-hidden">
            {/* subtle accent */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#7c3aed]/5 blur-[100px] pointer-events-none " />

            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* image sliders */}
                    <motion.div
                      initial={{ opacity: 0, x: -40 }}
                      animate={inView ? {opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="relative flex justify-center lg:justify-start"
                    >
                      <div className="relative  w-full max-w-sm mx-auto lg:mx-0 aspect-4/5">
                        {/* Decorative frame */}
                        <div className="absolute -inset-3 rounded-2xl border border-[#7c3aed]/20" />
                        <div className="absolute -inset-6 rounded-3xl border border-[#7c3aed]/10" />
                        <Image
                            src="/ayomide.jpg"
                            alt="Ay_dev— front-end engineer "
                            fill
                            className="relative w-full aspect-4/5 object-cover rounded-xl"
                        />
                        {/* Floating card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="absolute -bottom-6 right-0 lg:right-6 bg-[#111117] border border-white/8 rounded-xl p-4 shadow-2xl"
                            >
                            <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#7c3aed]/20 flex items-center justify-center">
                                <Zap size={18} className="text-[#a78bfa]" />
                            </div>
                            <div>
                                <p className="text-white text-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600 }}>
                                    Currently available
                                </p>
                                <p className="text-[#71717a] text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    Open to new projects
                                </p>
                            </div>
                            </div>
                        </motion.div>
                   </div> 
                    </motion.div>

                {/* Text side */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                 <span
                  className="text-xs tracking-[0.2em] text-[#a78bfa] uppercase mb-4 block"
                  style={{ fontFamily: "'jetBrains Monno', monospace"}}
                 >
                   — About Me
                 </span>
                 <h2
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
                  className="text-4xl sm:text-5xl text-white mb-6 leading-tight"
                 >
                  Building the future,{" "}
                  <span className="text-[#a78bfa]">one line</span> at a time
                 </h2>
                 <div 
                   style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
                   className="space-y-4 text-[#a1a1aa] leading-relaxed mb-8"
                 >
                   <p>
                     I'm Ayomide Samuel Akintomide, a software developer based in Lagos, Nigeria with a passion for crafting
                     digital experiences that are as beautiful as they are performant. My journey
                     started with a curiosity for how things work on the web, which quickly evolved
                     into a career building products used by thousands.
                   </p>
                   <p>

                   </p>
                   <p>

                   </p>

                 </div>
                    
                    </motion.div> 
                </div>
            </div>
        </section>
    );
}