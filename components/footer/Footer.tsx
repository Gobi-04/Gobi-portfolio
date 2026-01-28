"use client";

import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full py-20 bg-transparent flex flex-col items-center justify-center border-t border-black/5 dark:border-white/5 z-10 relative text-center md:text-left">
      <div className="max-w-7xl w-full px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-gray-500 text-sm font-bold tracking-widest uppercase">
          &copy; {new Date().getFullYear()} GOBINATH. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-8">
          <a href="https://github.com/Gobi-04" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black dark:hover:text-white transition-colors uppercase text-[10px] font-black tracking-[0.2em]">
            Github
          </a>
          <a href="https://www.linkedin.com/in/gobinath-s-777283298/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black dark:hover:text-white transition-colors uppercase text-[10px] font-black tracking-[0.2em]">
            Linkedin
          </a>
        </div>
      </div>
    </footer>
  );
}
