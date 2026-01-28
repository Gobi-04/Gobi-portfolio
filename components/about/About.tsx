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
    text: "I built platforms like African valves, Continent pipes, and security service systems focused on real use cases.",
  },
  {
    title: "Now",
    text: "Currently working on production-style workflows through a WordPress internship while strengthening modern JavaScript stacks.",
  },
];

export default function About() {
  return (
    <section id="about" className="flex flex-col items-center justify-center py-32 bg-transparent z-10 relative">
      <div className="px-6 max-w-4xl w-full">
        <Reveal>
          <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-purple-500 mb-6 text-center md:text-left">
            My Journey
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-12 text-center md:text-left">
            Turning <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">ideas</span> into <span className="italic">impactful</span> digital solutions.
          </h1>
        </Reveal>

        <div className="flex flex-col gap-16">
          {journey.map((item, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    {item.title}
                  </h3>
                </div>
                <div className="md:w-2/3">
                  <p className="text-slate-500 dark:text-gray-400 text-lg leading-relaxed font-medium">
                    {item.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}