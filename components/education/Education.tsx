"use client";

import Reveal from "@/components/animation/Reveal";
import Section from "@/components/layout/Section";

type EducationItem = {
  degree: string;
  institution: string;
  duration: string;
  highlights: string[];
};

const education: EducationItem[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "SNS College Of Technology / Anna University ",
    duration: "2024 – 2026",
    highlights: [
      "Focused on full-stack web development and modern JavaScript frameworks.",
      "Worked extensively on real-world oriented academic and personal projects.",
      "Strengthened backend fundamentals, databases, and system thinking.",
    ],
  },
  {
    degree: "Bachelor’s Degree",
    institution: "RVS Kumaran Arts & Science College ",
    duration: "2021 – 2024",
    highlights: [
      "Built strong foundations in programming and computer science basics.",
      "Explored web technologies and application development concepts.",
    ],
  },
];

export default function Education() {
  return (
    <section id="education" className="py-32 px-6 bg-transparent z-10 relative">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="flex flex-col items-center mb-24 text-center">
            <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-cyan-400 mb-6">
              Learning Journey
            </h2>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-tight">
              Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 italic">Background</span>
            </h1>
          </div>
        </Reveal>

        <div className="space-y-16">
          {education.map((item, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="group relative flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                      {item.degree}
                    </h3>
                    <p className="text-cyan-400 font-bold tracking-widest uppercase text-xs">
                      {item.institution}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-gray-500">
                    {item.duration}
                  </span>
                </div>

                <ul className="space-y-4">
                  {item.highlights.map((point, idx) => (
                    <li key={idx} className="text-slate-500 dark:text-gray-400 text-lg leading-relaxed flex items-start gap-4">
                      <span className="mt-3 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
