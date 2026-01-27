"use client";

import Reveal from "@/components/animation/Reveal";
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-transparent relative overflow-hidden">
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">

          {/* HEADING */}
          <Reveal>
            <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Let’s Work Together
            </h2>
          </Reveal>

          {/* SUBTEXT */}
          <Reveal>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-16 leading-relaxed">
              If you’re looking for someone who can build clean, functional,
              real-world web applications — or you just want to discuss an idea —
              feel free to reach out.
            </p>
          </Reveal>

          {/* PRIMARY CTA */}
          <Reveal>
            <a
              href="mailto:ngobi9121@gmail.com"
              className="
              inline-flex items-center gap-3
              px-10 py-5
              rounded-2xl
              bg-gradient-to-r from-indigo-600 to-purple-600 text-white
              font-bold text-lg
              hover:from-indigo-700 hover:to-purple-700
              transition-all duration-300 transform hover:scale-105
              shadow-2xl hover:shadow-2xl
            "
            >
              <FaEnvelope size={22} />
              Send me an email
            </a>
          </Reveal>

          {/* DIVIDER */}
          <div className="my-20 h-1 w-32 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 dark:from-indigo-600 dark:via-purple-600 dark:to-pink-600 mx-auto rounded-full" />

          {/* SOCIALS */}
          <Reveal>
            <div className="flex justify-center gap-8">
              <a
                href="https://github.com/Gobi-04"
                target="_blank"
                className="
                w-16 h-16
                flex items-center justify-center
                rounded-full
                bg-gradient-to-br from-white/80 to-white/60 dark:from-black/80 dark:to-black/60
                backdrop-blur-xl
                border border-white/20 dark:border-black/20
                text-gray-700 dark:text-gray-300
                hover:text-black dark:hover:text-white
                hover:shadow-2xl
                transition-all duration-300 transform hover:scale-110 hover:-rotate-6
              "
                aria-label="GitHub"
              >
                <FaGithub size={24} />
              </a>

              <a
                href="https://www.linkedin.com/in/gobinath-s-777283298/"
                target="_blank"
                className="
                w-16 h-16
                flex items-center justify-center
                rounded-full
                bg-gradient-to-br from-white/80 to-white/60 dark:from-black/80 dark:to-black/60
                backdrop-blur-xl
                border border-white/20 dark:border-black/20
                text-gray-700 dark:text-gray-300
                hover:text-blue-600
                hover:shadow-2xl
                transition-all duration-300 transform hover:scale-110 hover:rotate-6
              "
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}