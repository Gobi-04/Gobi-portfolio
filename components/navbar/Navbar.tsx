"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-full h-[80px] fixed top-0 bg-white/20 dark:bg-black/20 backdrop-blur-xl z-[100] px-10 border-b border-black/5 dark:border-white/5 transition-colors duration-500">
      <div className="max-w-7xl h-full flex flex-row items-center justify-between m-auto">
        <a href="#hero" className="flex flex-row items-center group">
          <span className="font-black text-slate-900 dark:text-white text-2xl tracking-tighter transition-transform group-hover:scale-105">
            GOBINATH<span className="text-purple-500">.</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-12">
          {["about", "skills", "experience", "projects", "contact"].map((link) => (
            <a key={link} href={`#${link}`} className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              {link}
            </a>
          ))}
        </div>

        <div className="flex flex-row gap-6 items-center">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white hover:scale-110 transition-all"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {[
            { icon: <FaGithub />, link: "https://github.com/Gobi-04" },
            { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/gobinath-s-777283298/" },
          ].map((social, i) => (
            <a
              href={social.link}
              key={i}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 dark:text-gray-400 text-2xl hover:text-black dark:hover:text-white transition-all transform hover:scale-110"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
