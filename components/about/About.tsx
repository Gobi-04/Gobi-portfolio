"use client";

import Reveal from "@/components/animation/Reveal";
import Section from "@/components/layout/Section";

const journey = [
  {
    title: "How it started",
    text: "I began with curiosity — understanding how websites actually work beyond just visuals.",
  },
  {
    title: "Learning by building",
    text: "I moved from basic HTML to full-stack applications using Next.js, backend logic, and databases.",
  },
  {
    title: "Real projects, real problems",
    text: "I built platforms like Threat-Pulse, ServiceFinder, and security service systems focused on real use cases.",
  },
  {
    title: "Now",
    text: "Currently working on production-style workflows through a WordPress internship while strengthening modern JavaScript stacks.",
  },
];

export default function About() {
  return (
    <Section id="about" className="bg-transparent relative overflow-hidden">
      <div className="relative z-10 flex justify-center">
        <div className="max-w-5xl w-full">

          {/* Heading */}
          <Reveal>
            <h2 className="text-5xl font-black mb-20 text-center bg-gradient-to-r from-green-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              About Me
            </h2>
          </Reveal>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {journey.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div
                  className="
                    h-full
                    p-10
                    rounded-3xl
                    border border-gray-200/50 dark:border-neutral-800/50
                    bg-white/40 dark:bg-neutral-900/40
                    backdrop-blur-md
                    shadow-lg
                    cursor-pointer
                    transition-all duration-500
                    hover:-translate-y-3
                    hover:scale-[1.03]
                    hover:shadow-2xl
                    hover:border-green-400/60
                    hover:bg-white/60 dark:hover:bg-neutral-900/60
                  "
                >
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </div>

    </Section >
  );
}