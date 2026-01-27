"use client";

import { useTheme } from "@/components/theme/ThemeProvider";
import { motion } from "framer-motion";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed top-6 w-full z-50 px-6 flex justify-center">
      <nav className={`
        max-w-4xl w-full rounded-2xl border border-white/20 dark:border-white/10
        bg-white/40 dark:bg-black/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)]
        px-8 py-3 flex justify-between items-center transition-all
      `}>
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-black text-xl bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent cursor-pointer"
        >
          GOBINATH
        </motion.span>

        <div className="flex items-center gap-6 md:gap-10">
          <div className="hidden md:flex gap-8 text-sm font-bold text-gray-600 dark:text-gray-300">
            <a href="#projects" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Projects</a>
            <a href="#about" className="hover:text-indigo-600 dark:hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Contact</a>
          </div>

          <button
            onClick={toggleTheme}
            className={`
              w-10 h-10 rounded-xl flex items-center justify-center text-lg
              bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10
              hover:bg-indigo-50 dark:hover:bg-white/10 transition-all active:scale-95
            `}
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>
    </div>
  );
}
