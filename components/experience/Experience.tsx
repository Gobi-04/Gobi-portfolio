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
    <Section id="experience" muted className="bg-transparent relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.3)_1px,transparent_0)] [background-size:35px_35px]" />
      <div className="relative z-10">
        <Reveal>
          <h2 className="text-5xl font-black mb-20 text-center bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
            Experience
          </h2>
        </Reveal>

        <div className="max-w-4xl mx-auto space-y-10">
          {experiences.map((exp, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div
                className="
                rounded-3xl
                p-10
                border
                bg-gradient-to-br from-white/90 to-orange-50/80 dark:from-neutral-900/90 dark:to-orange-900/20
                border-orange-200/50 dark:border-orange-800/50
                shadow-lg hover:shadow-2xl
                transition-all duration-500
                hover:-translate-y-2
                hover:border-orange-400/60
                backdrop-blur-xl
              "
              >
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {exp.role}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {exp.company}
                    </p>
                  </div>

                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {exp.duration}
                  </span>
                </div>

                {/* POINTS */}
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  {exp.points.map((point, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>

                {/* STACK */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      className="
                      text-xs
                      px-3 py-1
                      rounded-full
                      bg-gray-100 dark:bg-neutral-800
                      text-gray-700 dark:text-gray-300
                    "
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
    </Section>
  );
}