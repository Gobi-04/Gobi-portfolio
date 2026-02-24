"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useRef, useEffect, useState } from "react";

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll parallax
  const { scrollY, scrollYProgress } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} id="hero" className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-transparent py-20 lg:py-0">

      {/* CONTENT CONTAINER */}
      <div className="max-w-7xl w-full px-6 grid grid-cols-1 lg:grid-cols-2 items-center justify-center z-10 gap-10 lg:gap-16 relative pt-20 lg:pt-0">

        {/* LEFT CONTENT: TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6 items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
        >
          {/* Badge - Subtle & High-end */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-2"
          >
            {/* <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40"> */}
            {/* Creative Production Studio */}
            {/* </span> */}
          </motion.div>

          {/* Heading - Reverted & Scaled Down */}
          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-black text-slate-900 dark:text-white leading-[0.85] tracking-tighter mb-4 uppercase italic">
            I AM <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-900/40 dark:from-white dark:to-white/20">GOBINATH.</span>
          </h1>

          {/* Description - Reverted */}
          <p className="text-sm md:text-base text-slate-600 dark:text-white font-medium uppercase tracking-[0.2em] leading-loose max-w-lg mb-4">
            High-Performance Digital Experiences <br />
            Built for the Next Generation.
          </p>

          {/* CTA - Reverted */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap gap-4 mt-4"
          >
            <a
              href="#projects"
              className="px-8 py-4 rounded-full bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all duration-500 transform hover:scale-105 shadow-xl text-center"
            >
              Selected Work
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full border-2 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-black uppercase tracking-widest text-[10px] hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-500 text-center"
            >
              Contact
            </a>
            <a
              href="/resume.pdf"
              download
              className="px-8 py-4 rounded-full border-2 border-purple-500/20 text-purple-400 font-black uppercase tracking-widest text-[10px] hover:bg-purple-500/10 transition-all duration-500 text-center"
            >
              Resume
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT CONTENT: IMAGE (Increased Size) */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex justify-center items-center order-1 lg:order-2 scale-90 lg:scale-100 mt-12 lg:mt-24"
        >
          <div className="relative group">
            {/* Offset Background Shape */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-6 -top-6 w-full h-full bg-cyan-500/10 rounded-[2rem_2rem_0_10rem] z-0"
            />

            {/* Main Image Frame (Increased Size) */}
            <motion.div
              animate={{
                y: [-10, 5, -10],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[26rem] lg:h-[26rem] rounded-[2rem_2rem_0_12rem] overflow-hidden border-4 border-white dark:border-slate-900 shadow-2xl z-10"
            >
              <img
                src="/profile.jpg"
                alt="Gobinath Profile"
                className="w-full h-full object-cover transform transition duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
