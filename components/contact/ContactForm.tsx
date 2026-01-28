"use client";

import Reveal from "@/components/animation/Reveal";
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 flex flex-col items-center justify-center bg-transparent z-10 relative text-center">
      <div className="max-w-4xl w-full">
        <Reveal>
          <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-purple-500 mb-10">
            Get In Touch
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white leading-tight mb-16">
            LET&apos;S <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 italic">WORK</span> TOGETHER
          </h1>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="text-xl text-slate-500 dark:text-gray-400 mb-20 max-w-2xl mx-auto leading-relaxed">
            I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <a
            href="mailto:ngobi9121@gmail.com"
            className="group relative inline-flex items-center justify-center px-16 py-6 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black font-black text-xl hover:bg-slate-800 dark:hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10">SAY HELLO 👋</span>
          </a>
        </Reveal>

        <div className="mt-32 flex justify-center gap-12">
          <a href="https://github.com/Gobi-04" target="_blank" rel="noopener noreferrer" className="text-4xl text-gray-600 hover:text-white transition-all">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/gobinath-s-777283298/" target="_blank" rel="noopener noreferrer" className="text-4xl text-gray-600 hover:text-white transition-all">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </section>
  );
}
