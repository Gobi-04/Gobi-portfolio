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

const techStack = [
  {
    category: "Front-End",
    skills: "React, Next.js, Tailwind CSS, JavaScript, HTML5/CSS3"
  },
  {
    category: "Back-End",
    skills: "Node.js, PHP, Python, Java, REST APIs"
  },
  {
    category: "Database",
    skills: "MySQL, PostgreSQL, MongoDB"
  },
  {
    category: "Tools & CMS",
    skills: "WordPress, Git, GitHub, AWS, Figma"
  }
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* LEFT: BIO & INFO */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-12">
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

          {/* RIGHT: TECH STACK GRID */}
          <div className="lg:col-span-12 xl:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {techStack.map((stack, i) => (
                <Reveal key={stack.category} delay={0.1 * i}>
                  <TiltCard>
                    <div
                      className="group h-full p-8 rounded-3xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30 dark:hover:border-purple-500/30"
                      style={{ transform: "translateZ(50px)" }}
                    >
                      <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        {stack.category}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                        {stack.skills}
                      </p>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>

        </div>

        {/* BACKGROUND ACCENT */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      </div>
    </Section>
  );
}
