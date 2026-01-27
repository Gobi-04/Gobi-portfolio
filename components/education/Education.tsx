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
    institution: "Your College / University Name",
    duration: "2023 – 2025",
    highlights: [
      "Focused on full-stack web development and modern JavaScript frameworks.",
      "Worked extensively on real-world oriented academic and personal projects.",
      "Strengthened backend fundamentals, databases, and system thinking.",
    ],
  },
  {
    degree: "Bachelor’s Degree",
    institution: "Your College Name",
    duration: "2020 – 2023",
    highlights: [
      "Built strong foundations in programming and computer science basics.",
      "Explored web technologies and application development concepts.",
    ],
  },
];

export default function Education() {
  return (
    <Section id="education" className="bg-transparent relative overflow-hidden">
      <div className="relative z-10">
        <Reveal>
          <h2 className="text-5xl font-black mb-20 text-center bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 bg-clip-text text-transparent">
            Education
          </h2>
        </Reveal>

        <div className="max-w-4xl mx-auto space-y-10">
          {education.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div
                className="
                rounded-3xl
                p-10
                border
                bg-white/40 dark:bg-neutral-900/40
                border-blue-200/50 dark:border-blue-800/50
                backdrop-blur-md
                shadow-lg hover:shadow-2xl
                transition-all duration-500
                hover:-translate-y-2
                hover:border-blue-400/60
              "
              >
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {item.degree}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.institution}
                    </p>
                  </div>

                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.duration}
                  </span>
                </div>

                {/* HIGHLIGHTS */}
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  {item.highlights.map((point, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}