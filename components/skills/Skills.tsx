"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Reveal from "@/components/animation/Reveal";
import Section from "@/components/layout/Section";
import { useTheme } from "@/components/theme/ThemeProvider";

import {
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaPython,
  FaJava,
  FaGitAlt,
  FaAws,
  FaFigma,
  FaPhp,
  FaGithub,
  FaWordpress,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiMysql,
  SiPostgresql,
  SiTailwindcss,
} from "react-icons/si";

type Skill = {
  name: string;
  percent: number;
  color: string;
  icon: ReactNode;
};

/* ================= SKILL CARD ================= */

function SkillCard({ skill }: { skill: Skill }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }

    let current = 0;
    const target = skill.percent;
    const duration = 700;
    const step = 15;
    const increment = target / (duration / step);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCount(Math.round(current));
    }, step);

    return () => clearInterval(timer);
  }, [isInView, skill.percent]);

  return (
    <div
      ref={ref}
      className="
        h-full
        rounded-2xl
        p-8
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        transition-all duration-500
        hover:-translate-y-2
        hover:border-indigo-500/50
        hover:shadow-[0_0_20px_rgba(72,52,212,0.2)]
      "
    >
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="
            h-14 w-14
            flex items-center justify-center
            rounded-xl
            bg-white/5
            text-2xl text-indigo-400
            border border-white/10
          "
        >
          {skill.icon}
        </div>

        <div className="flex-1">
          <p className="font-bold text-lg text-white">{skill.name}</p>
          <p className="text-xs text-indigo-200/50 font-medium">
            Signal Strength
          </p>
        </div>

        <span className="text-lg font-black text-white/90">
          {count}%
        </span>
      </div>

      {/* PROGRESS BAR */}
      <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
        <div
          className={`h-full rounded-full ${skill.color} shadow-[0_0_10px_rgba(255,255,255,0.2)]`}
          style={{
            width: isInView ? `${count}%` : "0%",
            transition: "width 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>
    </div>
  );
}

/* ================= DATA ================= */

const frontendSkills: Skill[] = [
  { name: "Next.js", percent: 47, color: "bg-gray-800", icon: <SiNextdotjs /> },
  { name: "React", percent: 41, color: "bg-cyan-500", icon: <FaReact /> },
  { name: "JavaScript", percent: 61, color: "bg-yellow-400", icon: <FaJs /> },
  { name: "Tailwind CSS", percent: 53, color: "bg-sky-400", icon: <SiTailwindcss /> },
  { name: "HTML5", percent: 85, color: "bg-orange-500", icon: <FaHtml5 /> },
  { name: "CSS3", percent: 75, color: "bg-blue-500", icon: <FaCss3Alt /> },
];

const backendSkills: Skill[] = [
  { name: "PHP", percent: 51, color: "bg-indigo-500", icon: <FaPhp /> },
  { name: "Node.js", percent: 44, color: "bg-green-500", icon: <FaNodeJs /> },
  { name: "Python", percent: 47, color: "bg-indigo-400", icon: <FaPython /> },
  { name: "Java", percent: 42, color: "bg-amber-500", icon: <FaJava /> },
];

const databaseSkills: Skill[] = [
  { name: "MySQL", percent: 56, color: "bg-sky-500", icon: <SiMysql /> },
  { name: "PostgreSQL", percent: 44, color: "bg-blue-600", icon: <SiPostgresql /> },
];

const toolsSkills: Skill[] = [
  { name: "WordPress", percent: 39, color: "bg-blue-500", icon: <FaWordpress /> },
  { name: "Git", percent: 44, color: "bg-red-500", icon: <FaGitAlt /> },
  { name: "GitHub", percent: 53, color: "bg-gray-700", icon: <FaGithub /> },
  { name: "AWS", percent: 31, color: "bg-yellow-500", icon: <FaAws /> },
  { name: "Figma", percent: 27, color: "bg-pink-500", icon: <FaFigma /> },
];

/* ================= SECTION ================= */

export default function Skills() {
  const { theme } = useTheme();

  return (
    <section id="skills" className="py-32 px-6 flex flex-col items-center justify-center bg-transparent z-10 relative">
      <div className="max-w-7xl w-full">
        <div className="flex flex-col items-center mb-24 text-center">
          <Reveal>
            <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-cyan-500 mb-6">
              Technical Stack
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-8">
              Making apps with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">modern technologies</span>
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-xl text-slate-500 dark:text-gray-400 max-w-2xl font-medium">
              Never miss a task, deadline or idea. I use a diverse set of tools to build high-performance applications.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-24">
          {[
            { title: "Frontend Development", skills: frontendSkills },
            { title: "Backend Development", skills: backendSkills },
            { title: "Databases", skills: databaseSkills },
            { title: "Tools & Design", skills: toolsSkills },
          ].map((category, categoryIdx) => (
            <div key={category.title} className="flex flex-col gap-10">
              <Reveal delay={categoryIdx * 0.1}>
                <h3 className="text-2xl font-black text-slate-800 dark:text-white/80 uppercase tracking-widest border-l-4 border-cyan-500 pl-6">
                  {category.title}
                </h3>
              </Reveal>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {category.skills.map((skill, i) => (
                  <Reveal key={skill.name} delay={i * 0.05}>
                    <div className="group relative flex flex-col items-center gap-4 p-6 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] overflow-hidden">
                      {/* Dynamic Glow Background */}
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl blur-2xl ${skill.color} z-0`} />

                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 3 + Math.random() * 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.1
                        }}
                        className="relative z-10 w-full flex flex-col items-center gap-4"
                      >
                        <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 group-hover:scale-110 transition-transform duration-300 relative">
                          {/* Inner Glow for Icon */}
                          <div className={`absolute inset-0 blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300 ${skill.color}`} />

                          <div className="text-4xl text-purple-500 dark:text-purple-400 relative z-10 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors duration-300">
                            {skill.icon}
                          </div>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <span className="text-sm font-bold text-slate-700 dark:text-white uppercase tracking-wider group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                            {skill.name}
                          </span>
                          <div className="flex items-center gap-1.5 mt-1">
                            <div className="w-12 h-1 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.percent}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-full ${skill.color}`}
                              />
                            </div>
                            <span className="text-[10px] font-black text-purple-500">
                              {skill.percent}%
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-full absolute pointer-events-none">
        <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(72,52,212,0.2)_0%,transparent_70%)]" />
        </div>
      </div>
    </section>
  );
}
