"use client"

import { useRef } from "react";
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Terminal } from "@/components/ui/terminal";

gsap.registerPlugin(ScrollTrigger);


export default function HowIWork() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);

    useGSAP(
        () => {
            gsap.set(paragraphRef.current, { opacity: 0, y: 20});

            gsap.to(paragraphRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                trigger: paragraphRef.current,
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
              }, 
            });
        },
        { scope: sectionRef }
    );
  return (
    <section ref={sectionRef} className="max-w-6xl mx-auto px-4 sm:px-6 py-1">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span
            className="text-xs tracking-[0.2em] text-[#a78bfa] uppercase mb-4 block mt-4"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            — How I Work
          </span>
          <h2
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
            className="text-4xl sm:text-5xl text-white mb-6 leading-tight"
          >
            Every project, one migration {" "}
            <span className="text-[#a78bfa]">at</span> a time
          </h2>
          <p 
           ref={paragraphRef}
          className="text-[#71717a] text-sm sm:text-base leading-relaxed max-w-xl">
            I build in small, testable sessions — model, migrate, wire, verify —
            rather than writing everything at once and hoping it connects. Every
            terminal above is a real session from a real build: setting up auth
            for an e-commerce client, one command at a time, with the failures
            included.
          </p>
        </div>

        <Terminal
          commands={[
            "npm install sequelize pg pg-hstore bcryptjs jose",
            "npx sequelize-cli model:generate --name User --attributes email:string,password:string,name:string",
            "npx sequelize-cli db:migrate",
            "npm run dev",
          ]}
          outputs={{
            0: ["added 5 packages in 3s"],
            1: [
              "✔ New model was created at models/user.js.",
              "✔ New migration was created at migrations/20260810101033-create-user.js.",
            ],
            2: [
              "Sequelize CLI [Node: 20.x, CLI: 6.x, ORM: 6.x]",
              "Loaded configuration file \"config/config.json\".",
              "== 20260810101033-create-user: migrating =======",
              "== 20260810101033-create-user: migrated (0.312s)",
            ],
            3: ["✔ Ready in 1.2s", "○ Local: http://localhost:3000"],
          }}
          typingSpeed={45}
          delayBetweenCommands={1000}
        />
      </div>
    </section>
  );
}