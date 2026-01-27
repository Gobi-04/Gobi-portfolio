"use client";

import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="
        border-t border-white/20 dark:border-black/20
        bg-gradient-to-b from-white/80 to-white/60 dark:from-black/80 dark:to-black/60
        backdrop-blur-xl
      "
    >
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* NAME / BRAND */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Gobinath
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
            Full-Stack Developer
          </p>
        </div>

        {/* SOCIAL LINKS */}
        <div className="mt-8 flex justify-center gap-8">
          <a
            href="https://github.com/Gobi-04"
            target="_blank"
            aria-label="GitHub"
            className="
              w-12 h-12 flex items-center justify-center rounded-full
              bg-white/40 dark:bg-black/40 backdrop-blur
              border border-white/20 dark:border-black/20
              text-gray-700 dark:text-gray-300
              hover:text-black dark:hover:text-white
              hover:border-indigo-500/60
              transition-all duration-300 transform hover:scale-110
              shadow-md hover:shadow-lg
            "
          >
            <FaGithub size={22} />
          </a>

          <a
            href="https://www.linkedin.com/in/gobinath-s-777283298/"
            target="_blank"
            aria-label="LinkedIn"
            className="
              w-12 h-12 flex items-center justify-center rounded-full
              bg-white/40 dark:bg-black/40 backdrop-blur
              border border-white/20 dark:border-black/20
              text-gray-700 dark:text-gray-300
              hover:text-blue-600
              hover:border-blue-500/60
              transition-all duration-300 transform hover:scale-110
              shadow-md hover:shadow-lg
            "
          >
            <FaLinkedin size={22} />
          </a>
        </div>

        {/* DIVIDER */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />

        {/* COPYRIGHT */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 font-medium">
          © {new Date().getFullYear()} Gobinath. All rights reserved.
        </p>
      </div>
    </footer>
  );
}