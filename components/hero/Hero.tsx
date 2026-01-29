"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import HeroLandscape from "./HeroLandscape";

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
    <section ref={containerRef} id="hero" className="relative h-[100vh] w-full flex flex-col items-center justify-center overflow-hidden bg-transparent">

      {/* 3D SCROLL-BASED LANDSCAPE BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <Canvas
          shadows
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
          }}
          camera={{
            position: [
              Math.sin(scrollProgress * 2) * 2,
              2 - scrollProgress * 5,
              15 - scrollProgress * 10
            ],
            fov: 50,
          }}
        >
          <Suspense fallback={null}>
            <HeroLandscape />
          </Suspense>
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white dark:via-black/30 dark:to-black pointer-events-none" />
      </div>

      {/* CONTENT CONTAINER */}
      <div className="max-w-7xl w-full px-6 grid grid-cols-1 lg:grid-cols-2 items-center justify-center z-10 gap-12 relative pt-20 lg:pt-0">

        {/* LEFT CONTENT: TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6 items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 px-6 py-2 rounded-full border border-purple-500/30 bg-purple-500/5 backdrop-blur-xl w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em]">
              Full Stack Developer
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white leading-tight tracking-tighter">
            Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500">Gobinath</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-500 dark:text-gray-400 max-w-2xl leading-relaxed font-medium">
            Building digital experiences that combine innovative engineering with elegant design.
            Focused on creating impactful full-stack applications.
          </p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 mt-4"
          >
            <a
              href="#projects"
              className="px-10 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-xs hover:bg-slate-800 dark:hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
            >
              My Projects
            </a>
            <a
              href="#contact"
              className="px-10 py-4 rounded-full border border-black/20 dark:border-white/20 text-slate-900 dark:text-white font-bold uppercase tracking-widest text-xs hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 text-center"
            >
              Contact Me
            </a>
            <a
              href="/resume.pdf"
              download
              className="px-10 py-4 rounded-full border border-purple-500/50 text-purple-600 dark:text-purple-400 font-bold uppercase tracking-widest text-xs hover:bg-purple-500/10 transition-all duration-300 text-center flex items-center justify-center gap-2"
            >
              <span>Resume</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT CONTENT: IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex justify-center items-center order-1 lg:order-2"
        >
          <div className="relative group">
            {/* Animated Ring Background */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

            {/* Circular Frame */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-2xl">
              <img
                src="/profile.jpg"
                alt="Gobinath Profile"
                className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
              />
            </div>

            {/* Floating Elements/Deco */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl hidden md:flex items-center justify-center shadow-xl"
            >
              <span className="text-3xl">🚀</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hidden md:flex items-center justify-center shadow-xl"
            >
              <span className="text-3xl">💻</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
