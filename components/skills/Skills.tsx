"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Reveal from "@/components/animation/Reveal";
import Section from "@/components/layout/Section";

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
        rounded-3xl
        p-8
        border
        backdrop-blur-md
        bg-white/40 dark:bg-neutral-900/40
        border-indigo-200/50 dark:border-indigo-800/50
        shadow-xl hover:shadow-2xl
        transition-all duration-500
        hover:-translate-y-3
        hover:border-indigo-400/80
        hover:scale-105
      "
    >
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="
            h-16 w-16
            flex items-center justify-center
            rounded-2xl
            bg-gradient-to-br from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/30 dark:to-purple-500/30
            text-2xl
            border border-indigo-200/50 dark:border-indigo-700/50
          "
        >
          {skill.icon}
        </div>

        <div className="flex-1">
          <p className="font-bold text-lg text-gray-900 dark:text-white">{skill.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Proficiency
          </p>
        </div>

        <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {count}%
        </span>
      </div>

      {/* PROGRESS BAR */}
      <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-neutral-700 overflow-hidden border border-gray-300/50 dark:border-neutral-600/50">
        <div
          className={`h-full rounded-full ${skill.color} shadow-lg`}
          style={{
            width: isInView ? `${count}%` : "0%",
            transition: "width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      </div>
    </div>
  );
}

/* ================= DATA ================= */

const coreFrontend: Skill[] = [
  { name: "Next.js", percent: 47, color: "bg-gray-800", icon: <SiNextdotjs /> },
  { name: "React", percent: 41, color: "bg-cyan-500", icon: <FaReact /> },
  { name: "JavaScript", percent: 61, color: "bg-yellow-400", icon: <FaJs /> },
  { name: "Tailwind CSS", percent: 53, color: "bg-sky-400", icon: <SiTailwindcss /> },
  { name: "HTML5", percent: 85, color: "bg-orange-500", icon: <FaHtml5 /> },
  { name: "CSS3", percent: 75, color: "bg-blue-500", icon: <FaCss3Alt /> },
];

const backendAndData: Skill[] = [
  { name: "PHP", percent: 51, color: "bg-indigo-500", icon: <FaPhp /> },
  { name: "Node.js", percent: 44, color: "bg-green-500", icon: <FaNodeJs /> },
  { name: "Python", percent: 47, color: "bg-indigo-400", icon: <FaPython /> },
  { name: "Java", percent: 42, color: "bg-amber-500", icon: <FaJava /> },
  { name: "MySQL", percent: 46, color: "bg-sky-500", icon: <SiMysql /> },
  { name: "PostgreSQL", percent: 54, color: "bg-blue-600", icon: <SiPostgresql /> },
];

const toolsAndCms: Skill[] = [
  { name: "WordPress", percent: 39, color: "bg-blue-500", icon: <FaWordpress /> },
  { name: "Git", percent: 44, color: "bg-red-500", icon: <FaGitAlt /> },
  { name: "GitHub", percent: 53, color: "bg-gray-700", icon: <FaGithub /> },
  { name: "AWS", percent: 31, color: "bg-yellow-500", icon: <FaAws /> },
  { name: "Figma", percent: 27, color: "bg-pink-500", icon: <FaFigma /> },
];

/* ================= SECTION ================= */

export default function Skills() {
  return (
    <Section
      id="skills"
      className="bg-transparent relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6">

          <Reveal>
            <h2 className="text-5xl font-black mb-20 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Skills
            </h2>
          </Reveal>

          {/* CORE */}
          <Reveal><h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Core Frontend</h3></Reveal>
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {coreFrontend.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.05}>
                <SkillCard skill={s} />
              </Reveal>
            ))}
          </div>

          {/* BACKEND */}
          <Reveal><h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Backend & Databases</h3></Reveal>
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {backendAndData.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.05}>
                <SkillCard skill={s} />
              </Reveal>
            ))}
          </div>

          {/* TOOLS */}
          <Reveal><h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">CMS & Tools</h3></Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {toolsAndCms.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.05}>
                <SkillCard skill={s} />
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </Section>
  );
}