"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/animation/Reveal";
import { FaGithub, FaLinkedin, FaArrowRight } from "react-icons/fa";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function Hero() {
  const { theme } = useTheme();

  return (
    <section id="hero" className="relative min-h-[100vh] flex items-center overflow-hidden bg-transparent pt-36 pb-20">
      {/* ================= CONTENT ================= */}
      <div className="max-w-5xl mx-auto px-6 w-full relative z-10">
        <div className="flex flex-col items-center">

          {/* COMPACT BORDERED TAG */}
          <Reveal>
            <div className={`
              inline-flex items-center gap-3 px-4 py-1.5 rounded-full 
              border border-indigo-500/20 dark:border-white/10 
              bg-white/40 dark:bg-white/5 backdrop-blur-md mb-8
            `}>
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
                Full Stack Architect
              </span>
            </div>
          </Reveal>

          {/* COMPACT HYPER-BOLD TITLE */}
          <Reveal delay={0.2}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-gray-950 dark:text-white leading-[0.85] text-center">
              Elevating <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-300 dark:to-white">
                Digital Ideas.
              </span>
            </h1>
          </Reveal>

          {/* REFINED SUBTEXT */}
          <Reveal delay={0.4}>
            <p className="mt-8 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl text-center leading-relaxed font-medium">
              I engineer <span className="text-gray-950 dark:text-white font-bold decoration-indigo-500 decoration-2 underline-offset-4 underline">singular products</span> that bridge the gap between imagination and technical reality.
            </p>
          </Reveal>

          {/* COMPACT ACTION BUTTONS */}
          <Reveal delay={0.6}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
              <a
                href="#projects"
                className="
                  group relative px-10 py-4
                  bg-gray-950 dark:bg-white text-white dark:text-black font-bold text-lg
                  rounded-2xl transition-all duration-300
                  hover:scale-105 shadow-xl hover:shadow-indigo-500/20
                "
              >
                <span className="flex items-center gap-3">
                  See Projects <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              <a
                href="/resume.pdf"
                className="
                  px-10 py-4
                  rounded-2xl font-bold text-lg
                  border-2 border-gray-950/10 dark:border-white/10
                  text-gray-950 dark:text-white
                  hover:bg-white dark:hover:bg-white/10
                  transition-all duration-300
                "
              >
                Download Resume
              </a>
            </div>
          </Reveal>

          {/* SOCIAL LINKS (MINIMAL) */}
          <Reveal delay={0.8}>
            <div className="mt-16 flex items-center justify-center gap-10">
              {[
                { icon: <FaGithub />, link: "https://github.com/Gobi-04" },
                { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/gobinath-s-777283298/" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  className="text-2xl text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-all hover:scale-125"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
