'use client'

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP)

/**
 * Wraps the scrolling part of the page in GSAP ScrollSmoother and adds a
 * consistent scroll-triggered reveal to any element marked `data-reveal`.
 *
 * Fixed-position UI (navbar, music player) must live OUTSIDE this wrapper —
 * ScrollSmoother transforms #smooth-content, which breaks `position: fixed`
 * for anything inside it.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode
}) {
  const wrapper = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      // Reveals work regardless of smoothing; they're just gentler without it.
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]")
      reveals.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: reduceMotion ? 0 : 36,
          duration: reduceMotion ? 0.01 : 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        })
      })

      if (reduceMotion) return

      const smoother = ScrollSmoother.create({
        wrapper: wrapper.current!,
        content: content.current!,
        smooth: 1.2,
        smoothTouch: 0.1,
        effects: true,
        normalizeScroll: true,
      })

      // Make sure triggers measure against the final layout.
      ScrollTrigger.refresh()

      return () => {
        smoother.kill()
      }
    },
    { scope: wrapper }
  )

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content" ref={content}>
        {children}
      </div>
    </div>
  )
}
