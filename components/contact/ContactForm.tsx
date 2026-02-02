"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/animation/Reveal";
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 px-6 flex flex-col items-center justify-center bg-transparent z-10 relative text-center">
      <div className="max-w-4xl w-full">
        <Reveal>
          <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-purple-500 mb-10">
            Get In Touch
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <h1 className="text-4xl md:text-8xl font-black text-slate-900 dark:text-white leading-tight mb-10 md:mb-16">
            LET&apos;S <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 italic">WORK</span> TOGETHER
          </h1>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="text-lg md:text-xl text-slate-500 dark:text-gray-400 mb-12 md:mb-20 max-w-2xl mx-auto leading-relaxed">
            I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
        </Reveal>

        <div className="mt-16 max-w-2xl mx-auto">
          <Reveal delay={0.4}>
            <ContactFormHandler />
          </Reveal>
        </div>

        <div className="mt-20 flex justify-center gap-12">
          <a href="https://github.com/Gobi-04" target="_blank" rel="noopener noreferrer" className="text-4xl text-gray-400 hover:text-purple-500 transition-all">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/gobinath-s-777283298/" target="_blank" rel="noopener noreferrer" className="text-4xl text-gray-400 hover:text-purple-500 transition-all">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactFormHandler() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-10 rounded-3xl bg-green-500/10 border border-green-500/20 text-center"
      >
        <span className="text-5xl mb-6 block">✨</span>
        <h3 className="text-2xl font-bold text-green-500 mb-2">Message Sent!</h3>
        <p className="text-slate-500 dark:text-gray-400">Thanks for reaching out. I&apos;ll get back to you soon.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm font-bold uppercase tracking-widest text-green-500 hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-4">Name</label>
          <input
            required
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="px-6 py-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500/50 transition-all"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-4">Email</label>
          <input
            required
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="px-6 py-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500/50 transition-all"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-4">Message</label>
        <textarea
          required
          rows={5}
          placeholder="How can I help you?"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="px-6 py-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500/50 transition-all resize-none"
        />
      </div>

      <button
        disabled={status === "loading"}
        type="submit"
        className="group relative inline-flex items-center justify-center px-10 py-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black font-black text-lg hover:bg-slate-800 dark:hover:bg-gray-200 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-xl"
      >
        <span className="relative z-10 flex items-center gap-3">
          {status === "loading" ? (
            <>
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              SENDING...
            </>
          ) : formData.message.trim().length > 0 ? (
            <>INITIATE TRANSMISSION 🚀</>
          ) : (
            <>SAY HELLO 👋</>
          )}
        </span>
      </button>

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm font-medium mt-4 p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-center"
        >
          <p>⚠️ Submission Failed</p>
          <p className="mt-1 opacity-70">
            Please ensure you have configured your environment variables (`MAIL_USER` and `MAIL_PASS`) or email me directly at ngobi9121@gmail.com
          </p>
        </motion.div>
      )}
    </form>
  );
}
