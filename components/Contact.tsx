"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";
import { Mail, MapPin, Phone, Send, CheckCircle, Loader2, Github, Linkedin, Twitter, Icon,} from "lucide-react";
import { error } from "next/dist/build/output/log";
import { errorStyles } from "next/dist/client/components/builtin/error-styles";
import emailjs from "@emailjs/browser";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
type Errors = Partial<Record<keyof FormData, string>>;

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "akayomide11@gmail.com",
    href: "mailto:akayomide11@gmail.com",
  },
  { icon: MapPin, label: "Location", value: "Lagos, Nigeria", href: "#" },
  {
    icon: Phone,
    label: "Phone Number",
    value: "+234 816-538-5401",
    tel: "08165385401",
  },
];

export default function Contact() {
  const { ref, inView } = useInView(0.1);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.name = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "please Enter a valid email";
    if (!form.subject.trim()) e.subject = "subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 20)
      e.message = "Please write at least 20 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

 const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");

    emailjs
      .send(
        "service_ec6z2ef",
        "template_g1f53c8",
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        },
        "Wz8PY7tRjgTgtoKAp" //public key for my emailJS
      )
      .then(() => {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        setStatus("idle");
        alert("Something went wrong. Please try again or email me directly.");
      });
};

  const field = (
    key: keyof FormData,
    label: string,
    type: string = "text",
    placeholder: string = "",
  ) => (
    <div>
      <label
        htmlFor={key}
        className="block text-sm text-[#a1a1aa] mb-2"
        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
      >
        {label}
      </label>
      <input
        id={key}
        type={type}
        value={form[key]}
        onChange={(e) => {
          setForm((f) => ({ ...f, [key]: e.target.value }));
          if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
        }}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl bg-white/4 border text-white placeholder-[#52525b] text-sm outline-none transition-all duration-200 focus:ring-2 ${
          errors[key]
            ? "boder-red-500/50 focus:ring-red-500/30"
            : "border-white/8 focus:border-[#7c3aed]/50 focus:ring-[#7c3aed]/20"
        }`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      />
      {errors[key] && (
        <p
          className="text-red-400 text-xs mt-1.5"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {errors[key]}
        </p>
      )}
    </div>
  );

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 sm:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-100 rounded-full bg-[#7c3aed]/8 blur-[140px]" />
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
            — Get in Touch
          </span>
          <h2
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
            }}
            className="text-4xl sm:text-5xl text-white mb-4 leading-tight"
          >
            Let's build something <span className="text-[#a78bfa]">great</span>
          </h2>
          <p
            className="text-[#71717a] max-w-xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Have a project in mind, a collaboration opportunity, or just want to
            say hi? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/** left hand side info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-start gap-4 p-5 rounded-xl border border-white/6 bg-white/2 hover:border-[#7c3aed]/30 hover:bg-[#7c3aed]/5 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#7c3aed]/15 flex items-center justify-center shrink-0 group-hover:bg-[#7c3aed]/25 transition-colors">
                  <Icon size={18} className="text-[#a78bfa]" />
                </div>
                <div>
                  <p
                    className="text-xs text-[#52525b] mb-0.5"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-white text-sm"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {value}
                  </p>
                </div>
              </a>
            ))}

            {/** social */}
            <div className="p-5 rounded-xl border border-white/6 bg-white/2">
              <p
                className="text-xs text-[#52525b] mb-4"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Find me on
              </p>
              <div className="flex gap-3">
                {[
                  {
                    icon: Github,
                    href: "https://github.com/DaSpunk778",
                    label: "GitHub",
                  },
                  {
                    icon: Linkedin,
                    href: "https://www.linkedin.com/in/akintomide-ayomide-561832281/",
                    label: "LinkedIn",
                  },
                  {
                    icon: Twitter,
                    href: "https://x.com/Daspunk02",
                    label: "Twitter",
                  },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="p-3 rounded-xl border border-white/8 text-[#71717a] hover:text-white hover:border-[#7c3aed]/30 hover:bg-[#7c3aed]/10 transition-all duration-200"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/** form sharp */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-3"
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-100 flex flex-col items-center justify-center text-center p-12 rounded-2xl border border-[#22d3ee]/20 bg-[#22d3ee]/5"
              >
                <CheckCircle size={56} className="text-[#22d3ee] mb-5" />
                <h3
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 700,
                  }}
                  className="text-2xl text-white mb-3"
                >
                  Message sent!
                </h3>
                <p
                  className="text-[#71717a] mb-6"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-5 py-2.5 text-sm rounded-lg border border-white/8 text-[#a1a1aa] hover:text-white hover:border-white/20 transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {field("name", "Full Name", "text", "Jane Smith")}
                  {field("email", "Email Address", "email", "jane@company.com")}
                </div>
                {field("subject", "Subject", "text", "Project collaboration")}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm text-[#a1a1aa] mb-2"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, message: e.target.value }));
                      if (errors.message)
                        setErrors((er) => ({ ...er, message: undefined }));
                    }}
                    rows={5}
                    placeholder="Tell me about your project, timeline, and budget..."
                    className={`w-full px-4 py-3 rounded-xl bg-white/4 border text-white placeholder-[#52525b] text-sm outline-none transition-all duration-200 focus:ring-2 resize-none ${
                      errors.message
                        ? "border-red-500/50 focus:ring-red-500/30"
                        : "border-white/8 focus:border-[#7c3aed]/50 focus:ring-[#7c3aed]/20"
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                  {errors.message && (
                    <p
                      className="text-red-400 text-xs mt-1.5"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {errors.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-70 text-white text-sm transition-all duration-200 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
