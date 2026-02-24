"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/animation/Reveal";
import Section from "@/components/layout/Section";

const personalInfo = [
  { label: "Name", value: "Gobinath" },
  { label: "Role", value: "Full-Stack Developer" },
  { label: "Experience", value: "Production-style Workflows" },
  { label: "Language", value: "Tamil / English" },
];


function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full h-full"
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <Section id="about" className="bg-transparent relative overflow-hidden py-32 md:py-48">
      <div className="max-w-[1400px] mx-auto w-full px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* LEFT: BIO & INFO */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-12">
            <Reveal>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-[1px] bg-purple-500" />
                <span className="text-sm font-bold uppercase tracking-[0.4em] text-purple-500">
                  About
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-8">
                PASSIONATE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">DEVELOPER</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
                I am Gobinath, a full-stack developer focused on building scalable applications.
                Driven by curiosity, I specialize in Next.js, modern JavaScript, and
                production-style workflows. I prioritize performance and clean user experiences.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 pt-8 border-t border-slate-200 dark:border-white/5">
                {personalInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400 w-28 pt-1">
                      {info.label}
                    </span>
                    <span className="text-base font-bold text-slate-800 dark:text-white/80">
                      {info.value}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* RIGHT: IMAGE */}
          <div className="lg:col-span-12 xl:col-span-5 flex justify-center lg:justify-end">
            <Reveal delay={0.4}>
              <div className="relative group">
                {/* Offset Background Shape */}
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 2, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-6 -top-6 w-full h-full bg-purple-500/10 rounded-[2rem_2rem_0_10rem] z-0"
                />

                {/* Main Image Frame (Floating Effect) */}
                <motion.div
                  animate={{
                    y: [-10, 5, -10],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] rounded-[2rem_2rem_0_12rem] overflow-hidden border-4 border-white dark:border-slate-900 shadow-2xl z-10"
                >
                  <img
                    src="/profile.jpg"
                    alt="Gobinath Profile"
                    className="w-full h-full object-cover transform transition duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none" />
                </motion.div>
              </div>
            </Reveal>
          </div>

        </div>

        {/* BACKGROUND ACCENT */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      </div>
    </Section>
  );
}
