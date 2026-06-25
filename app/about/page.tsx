import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Image from "next/image";
import { Zap } from "lucide-react";
import MusicPlayer from "@/components/musicPlayer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <Navbar />

      <main className="pt-32 pb-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-10">
          {/* Image side */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-sm mx-auto lg:mx-0 aspect-4/5">
              <div className="absolute -inset-3 rounded-2xl border border-[#7c3aed]/20" />
              <div className="absolute -inset-6 rounded-3xl border border-[#7c3aed]/10" />
              <Image
                src="/gemini.png"
                alt="Ay_dev— front-end engineer"
                fill
                className="relative w-full aspect-4/5 object-cover rounded-xl"
              />
              {/* Floating card */}
              <div className="absolute -bottom-6 right-0 lg:right-6 bg-[#111117] border border-white/8 rounded-xl p-4 shadow-2xl overflow-hidden">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#7c3aed]/20 flex items-center justify-center">
                    <Zap size={18} className="text-[#a78bfa]" />
                  </div>
                  <div>
                    <p
                      className="text-white text-sm"
                      style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600 }}
                    >
                      Currently available
                    </p>
                    <p className="text-[#71717a] text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Open to new projects
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <span
              className="text-xs tracking-[0.2em] text-[#a78bfa] uppercase mb-4 block"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              — About Me
            </span>
            <h1
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
              className="text-4xl sm:text-5xl text-white mb-6 leading-tight"
            >
              Building the future,{" "}
              <span className="text-[#a78bfa]">one line</span> at a time
            </h1>

            <div
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
              className="space-y-5 text-[#a1a1aa] leading-relaxed"
            >
              <p>
                I'm Ayomide Samuel Akintomide, a software developer from Lagos Nigeria with a passion for crafting
                digital experiences that are as beautiful as they are performant. My journey
                started with a curiosity for how things works on the web, which quickly evolved
                into a career building products used by thousands.
              </p>
              <p>
                With expertise spanning Next.js, Node.js, TypeScript, and a strong Database infrastructure,
                I bring ideas from raw sketches to polished production-ready applications.
                I believe that a great software is the intersection of solid engineering and thoughtful design.
              </p>
              <p>
                When I'm not writing code, you'll find me contributing to open-source projects,
                writing technical blog posts, exploring the latest in web performance optimization while listening to good music
                like the one you're enjoying now.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/*<Gallery />*/}

      <MusicPlayer />
      <Footer />
    </div>
  );
}