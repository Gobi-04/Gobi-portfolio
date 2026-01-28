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

      {/* CENTERED CONTENT */}
      <div className="max-w-4xl w-full px-6 flex flex-col items-center justify-center text-center z-10 gap-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6 items-center"
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

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white leading-tight tracking-tighter">
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
            className="flex flex-col sm:flex-row gap-6 mt-8"
          >
            <a
              href="#projects"
              className="px-12 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-xs hover:bg-slate-800 dark:hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
            >
              My Projects
            </a>
            <a
              href="#contact"
              className="px-12 py-4 rounded-full border border-black/20 dark:border-white/20 text-slate-900 dark:text-white font-bold uppercase tracking-widest text-xs hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 text-center"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
