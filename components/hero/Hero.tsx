"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useRef, useEffect, useState } from "react";

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} id="hero" className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-transparent p-6 md:p-12 lg:p-16">

      {/* OUTER FRAME / BORDER EFFECT */}
      <div className="absolute inset-0 border-[1px] border-slate-200 dark:border-white/5 pointer-events-none z-20 m-6 md:m-12 lg:m-16 rounded-[3rem]" />

      <div className="max-w-7xl w-full flex flex-col items-center z-10 relative">

        {/* HEADER AREA (Higher Visibility) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-12 md:top-20 lg:top-24 left-10 md:left-20 lg:left-24 right-10 md:right-20 lg:right-24 flex justify-between items-start z-30"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-purple-500">Portfolio</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-white/60">Ed. 2026</span>
          </div>
          <div className="hidden md:block">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500 dark:text-white/60">Available for Projects</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full min-h-[400px] aspect-auto md:aspect-[21/9] max-h-[70vh] rounded-[3rem] md:rounded-[3.5rem] overflow-hidden bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5 shadow-2xl mb-12 flex items-center justify-center px-6 md:px-12 mt-12 md:mt-0"
        >
          {/* CONTENT INSIDE BOX */}
          <div className="flex flex-col items-center text-center gap-8 max-w-4xl relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-2xl md:text-8xl lg:text-[10rem] font-black text-slate-900 dark:text-white leading-[1.2] md:leading-[0.85] tracking-tighter uppercase italic"
            >
              I AM <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-900/40 dark:from-white dark:to-white/20">GOBINATH.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-xs md:text-sm text-slate-600 dark:text-white/60 font-medium uppercase tracking-[0.4em] leading-loose max-w-2xl"
            >
              Designing and developing high-performance digital experiences <br />
              built for the next generation.
            </motion.p>
          </div>

          {/* GRADIENT BLOOM INSIDE */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1)_0%,transparent_70%)] pointer-events-none" />
        </motion.div>

        {/* CTA PILLS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8"
        >
          <a
            href="#projects"
            className="group relative px-10 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-[10px] transition-all duration-500 overflow-hidden shadow-xl"
          >
            <span className="relative z-10">Selected Work</span>
            <div className="absolute inset-0 bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
          </a>

          <a
            href="#contact"
            className="px-10 py-4 rounded-full border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-500"
          >
            Let's Talk
          </a>

          <a
            href="/resume.pdf"
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-purple-500 transition-colors duration-300"
          >
            Resume <span className="text-[14px]">→</span>
          </a>
        </motion.div>
      </div>

    </section>
  );
}
