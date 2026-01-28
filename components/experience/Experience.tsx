"use client";

import Reveal from "@/components/animation/Reveal";
import Section from "@/components/layout/Section";

type ExperienceItem = {
  role: string;
  company: string;
  duration: string;
  points: string[];
  stack: string[];
};

const experiences: ExperienceItem[] = [
  {
    role: "WordPress Developer Intern",
    company: "Current Internship",
    duration: "2024 – Present",
    points: [
      "Worked on real client websites with WordPress and custom themes.",
      "Customized layouts, components, and UI based on client requirements.",
      "Handled bug fixes, UI improvements, and content updates in production sites.",
    ],
    stack: ["WordPress", "PHP", "HTML", "CSS"],
  },
  {
    role: "Full-Stack Project Developer",
    company: "Academic & Personal Projects",
    duration: "2023 – 2024",
    points: [
      "Built full-stack web applications using Next.js, backend APIs, and databases.",
      "Implemented authentication, CRUD operations, and role-based features.",
      "Focused on clean UI, performance, and real-world usability.",
    ],
    stack: ["Next.js", "Tailwind", "MySQL", "PostgreSQL"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6 bg-transparent z-10 relative">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="flex flex-col items-center mb-24 text-center">
            <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-indigo-400 mb-6">
              Career Path
            </h2>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-tight">
              Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 italic">Experience</span>
            </h1>
          </div>
        </Reveal>

        <div className="space-y-16">
          {experiences.map((exp, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="group relative flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-indigo-400 font-bold tracking-widest uppercase text-xs">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-gray-500">
                    {exp.duration}
                  </span>
                </div>

                <ul className="space-y-4">
                  {exp.points.map((point, idx) => (
                    <li key={idx} className="text-slate-500 dark:text-gray-400 text-lg leading-relaxed flex items-start gap-4">
                      <span className="mt-3 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3">
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-bold text-gray-500 border border-white/5 px-4 py-1.5 rounded-full hover:border-white/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
