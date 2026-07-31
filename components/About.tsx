'use client'
import { MapPin, Calendar, Coffee, Zap } from "lucide-react";
import { useInView } from "../hooks/useInView";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";


const stats = [
  { value: "2+", label: "Years Experience", icon: Calendar },
  { value: "100%", label: "Efficiency and exceptional product delivery", icon: Zap },
  { value: "5+", label: "Happy Clients", icon: Coffee },
  { value: "24/7", label: "active all round the globe", icon: MapPin }, 
]


export default function About() {
    const { ref, inView } = useInView(0.15);

    // ---- Wipe/eraser reveal on the portrait ----
    const wipeLayerRef = useRef<HTMLDivElement>(null); // sizing box
    const eraserCanvasRef = useRef<HTMLCanvasElement>(null); // real Canvas
    const eraserImgRef = useRef<HTMLImageElement | null>(null); 
    const eraserLast = useRef<{ x: number; y: number } | null>(null);
    const eraserScratch = useRef<HTMLCanvasElement | null>(null);
    const BRUSH = 40;       // reveal circle radius (px)
    const STEP = BRUSH * 0.35; // spacing between stamps on a drag

    const drawCover = (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      w: number,
      h: number,
    ) => {
      const ir = img.naturalWidth / img.naturalHeight;
      let dw = w, dh = h;
      if (ir > w / h) dw = h * ir;
      else dh = w / ir;
      ctx.drawImage(img, (w - dw) / 2, (h -dh) / 2, dw, dh);
    };

    const stampDab = (
       main: CanvasRenderingContext2D,
        img: HTMLImageElement,
        cx: number,
        cy: number,
        r: number,
        w: number,
        h: number,
    ) => {
      let sc = eraserScratch.current;
      if (!sc || sc.width !== w || sc.height !== h) {
          sc = eraserScratch.current ?? document.createElement("canvas");
          sc.width = w;
          sc.height = h;
          eraserScratch.current = sc;
      }
      const s = sc.getContext("2d");
      if (!s) return;
      s.globalCompositeOperation = "source-over";
      s.clearRect(0, 0, w, h);
      const g = s.createRadialGradient(cx, cy, r * 0.4, cx, cy, r);
      g.addColorStop(0, "rgba(0,0,0,1)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      s.fillStyle = g;
      s.fillRect(cx - r, cy - r, r * 2, r * 2);
      s.globalCompositeOperation = "source-in";
      drawCover(s, img, w, h);
      main.drawImage(sc, 0, 0);
    };

    // No rotation on this card, so mapping is a straight px → canvas-px scale.
    const toCanvas = (clientX: number, clientY: number) => {
       const cv = eraserCanvasRef.current!;
       const box = wipeLayerRef.current!;
       const rect = cv.getBoundingClientRect();
       const cssW = box.clientWidth;
       const cssH = box.clientHeight;
       if (!cssW || !cssH) return null;
       const sx = cv.width / cssW;
       const sy = cv.height / cssH;
       return {
        x: (clientX - rect.left) * sx,
        y: (clientY - rect.top) * sy,
        sx,
        sy,
       };
    };

    const eraseTo = (clientX: number, clientY: number) => {
       const cv = eraserCanvasRef.current;
        const img = eraserImgRef.current;
        if (!cv || !img) return;
        const ctx = cv.getContext("2d");
        if (!ctx) return;
        const p = toCanvas(clientX, clientY);
        if (!p) return;
        const r = BRUSH * p.sx;
        const prev = eraserLast.current ?? { x: p.x, y: p.y };
        const dx = p.x - prev.x;
        const dy = p.y - prev.y;
        const dist = Math.hypot(dx, dy);
        const steps = Math.min(64, Math.max(1, Math.round(dist / (STEP * p.sx))));
        for (let i = 1; i <= steps; i++) {
            stampDab(
              ctx,
                img,
                prev.x + (dx * i) / steps,
                prev.y + (dy * i) / steps,
                r,
                cv.width,
                cv.height,
            );
        }
        eraserLast.current = { x: p.x, y: p.y };
    };

    const onGlassMove = (e: React.PointerEvent<HTMLDivElement>) => {
      const native = e.nativeEvent;
      const events = 
          typeof native.getCoalescedEvents === "function"
             ? native.getCoalescedEvents()
             : [];
        if (events.length) {
          for (const ev of events) eraseTo(ev.clientX, ev.clientY);
        } else {
          eraseTo(e.clientX, e.clientY);
        }
    };
    const onGlassDown =  (e: React.PointerEvent<HTMLDivElement>) => {
       eraserLast.current = null;
        eraseTo(e.clientX, e.clientY);
    };
    const onGlassEnd = () => {
        eraserLast.current = null;
    };

    useEffect(() => {
       const cv = eraserCanvasRef.current;
        const box = wipeLayerRef.current;
        if (!cv || !box) return;
        const img = new window.Image();
        img.src = "/Timi.png"; //my image
        img.onload = () => {
          eraserImgRef.current = img;
        };
        const size = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const w = Math.round(box.clientWidth * dpr);
            const h = Math.round(box.clientHeight * dpr);
            if (!w || !h || (cv.width === w && cv.height === h)) return;
            const prevW = cv.width, prevH = cv.height;
            let snapshot: HTMLCanvasElement | null = null;
            if (prevW && prevH) {
               snapshot = document.createElement("canvas");
                snapshot.width = prevW;
                snapshot.height = prevH;
                snapshot.getContext("2d")?.drawImage(cv, 0, 0);
            }
            cv.width = w;
            cv.height = h;
            if (snapshot) cv.getContext("2d")?.drawImage(snapshot, 0, 0, w, h);
            eraserLast.current = null;
        };
        size();
        const ro = new ResizeObserver(size);
        ro.observe(box);
        return () => ro.disconnect();
    }, []);


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

                         {/* Wipe layer: pointer handlers live here; touch-none
                            so a finger drag paints instead of scrolling the page. */}
                        <div
                          ref={wipeLayerRef}
                          onPointerDown={onGlassDown}
                          onPointerMove={onGlassMove}
                          onPointerLeave={onGlassEnd}
                          onPointerUp={onGlassEnd}
                          onPointerCancel={onGlassEnd}
                          className="relative w-full h-full rounded-xl overflow-hidden touch-none"
                        >
                          {/* Base: sharp image, desaturated + darkened */}
                        <Image
                            src="/Timi.png"
                            alt="Ay_dev— front-end engineer "
                            fill
                            className="object-cover grayscale brightness-[0.7] contrast-[1.1]"
                        />

                        {/* Full blur layer — the frosted surface over the whole image. This
                          is the missing piece: without it the base image just looks like
                          a plain grayscale photo, not "blurred glass". */}
                          <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0"
                            style={{
                              backgroundImage: "url(/Timi.png)",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              filter: "blur(7px) grayscale(1) brightness(0.72) contrast(1.12)",
                              transform: "scale(1.06)", // hides blur bleeding past the edges
                            }}
                          />


                         {/* Reveal canvas: sharp colour photo, painted in only
                              where the pointer has dragged/hovered. Accumulates —
                              revealed colour never disappears. */}
                        <canvas 
                          ref={eraserCanvasRef}
                          aria-hidden
                          className="pointer-events-none absolute inset-0 h-full w-full"
                        />
                       {/* Focus window — a SHARP copy clipped to a band via clip-path.
                          This is the "eyes" strip that's always in focus, drawing the eye
                          and signaling something's hidden. Adjust the % values to match
                          where your subject's eyes actually sit. */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0"
                          style={{
                            backgroundImage: "url(/Timi.png)",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            clipPath: "inset(28.5% 11% 54.5% 11%)",
                            WebkitClipPath: "inset(28.5% 11% 54.5% 11%)",
                          }}
                        />
                         {/* Thin frame around the focus window + center crosshair — visually
                          marks it as a "viewfinder", reinforcing "there's something to see
                          here, interact with it". */}
                         <div
                            aria-hidden
                            className="pointer-events-none absolute flex items-center justify-center border-2 border-white/70 shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
                            style={{
                              left: "11%",
                              right: "11%",
                              top: "28.5%",
                              bottom: "54.5%",
                            }}
                          >
                            <span className="relative block h-6 w-6">
                              <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/80 shadow-[0_0_0_0.5px_rgba(0,0,0,0.2)]" />
                              <span className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-white/80 shadow-[0_0_0_0.5px_rgba(0,0,0,0.2)]" />
                            </span>
                          </div>

                          {/* Caption split left/right below the focus band. */}
                          <div
                            aria-hidden
                            className="pointer-events-none absolute left-[11%] right-[11%] top-[60%] flex items-start justify-between text-white"
                          >
                            <p className="text-[11px] sm:text-[13px] font-light leading-snug tracking-wide">
                              clean the image
                            </p>
                            <p className="text-[11px] sm:text-[13px] font-light leading-snug tracking-wide text-right">
                              to see Ayomide 
                            </p>
                          </div>

                        </div>
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
                    className="space-y-4 text-[#a1a1aa] leading-relaxed mb-6"
                  >
                    <p>
                      I'm Ayomide Samuel Akintomide, a software developer from Lagos Nigeria with a passion for crafting
                      digital experiences that are as beautiful as they are performant. My journey
                      started with a curiosity for how things works on the web, which quickly evolved
                      into a career building products used by thousands.
                    </p>
                  </div>

                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 mb-8 text-sm text-[#a78bfa] hover:text-white transition-colors group"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                  >
                    Read more about me
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>

                 {/* skills highligh */}
                 <div className="flex flex-wrap gap-2 mb-10">
                  {["Clean code", "Agile", "TDD", "System Design", "Comunication"].map((tag) => (
                    <span
                     key={tag}
                     className="px-3 py-1 text-xs rounded-full border border-[#7c3aed]/30 text-[#a78bfa] bg-[#7c3aed]/10"
                     style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                    {tag}
                    </span>
                  ))}
                 </div>

                 {/* stats */}
                    <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="p-4 rounded-xl border border-white/6 bg-white/2 hover:border-[#7c3aed]/30 transition-colors group"
                >
                  <stat.icon
                    size={20}
                    className="text-[#7c3aed] group-hover:text-[#a78bfa] transition-colors mb-2"
                  />
                  <p
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
                    className="text-2xl text-white"
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#71717a]" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>  
                    </motion.div> 
                </div>
            </div>
        </section>
    );
}