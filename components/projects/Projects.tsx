"use client";

import Image from "next/image";
import Reveal from "@/components/animation/Reveal";

type Project = {
  title: string;
  description: string;
  image: string;
  stack: string[];
  link?: string;
};

const projects: Project[] = [
  {
    title: "ServiceFinder",
    description:
      "Local electrician and plumber service finder with authentication and listings.",
    image: "/projects/servicefinder.jpg",
    stack: ["HTML", "PHP", "MySQL"],
  },
  {
    title: "Online Security Guard Hiring",
    description:
      "Platform to hire security guards online with booking flow and service management.",
    image: "/projects/security-guard.png",
    stack: ["HTML", "CSS", "JS", "Python", "MySQL"],
  },
  {
    title: "Face Attendance System",
    description:
      "Automated attendance system using face recognition and computer vision.",
    image: "/projects/face-attendance.jpg",
    stack: ["Python", "OpenCV", "Flask"],
  },
  {
    title: "Continental Pipes",
    description:
      "E-Commerce site for selling pipes and fittings.",
    image: "/projects/pro-port.png",
    stack: ["Next.js", "Tailwind", "MySQL"],
    link: "http://46.101.118.118",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 flex flex-col items-center justify-center bg-transparent z-10 relative">
      <div className="max-w-7xl w-full">
        <Reveal>
          <div className="flex flex-col items-center mb-24">
            <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-cyan-400 mb-6">
              Featured Work
            </h2>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white text-center leading-tight">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Projects</span>
            </h1>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.1} className="h-full">
              <div className="group relative h-full flex flex-col rounded-[2rem] overflow-hidden bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-purple-500/50 transition-all duration-500 shadow-sm hover:shadow-[0_0_50px_rgba(168,85,247,0.15)]">

                {/* Image Container with Overlay */}
                <div className="relative h-[220px] w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Floating Tech Badges (Always visible but pop on hover) */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
                    {project.stack.slice(0, 2).map((tech) => (
                      <span key={tech} className="px-3 py-1 text-[10px] font-bold text-white bg-purple-600/80 backdrop-blur-md rounded-full shadow-lg transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 flex flex-col flex-1 relative bg-white/50 dark:bg-transparent backdrop-blur-sm">
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="mt-auto pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {project.stack.map((tech, idx) => (
                          <div key={idx} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[8px] font-bold text-slate-600 dark:text-gray-400">
                            {tech.charAt(0)}
                          </div>
                        ))}
                      </div>

                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-black uppercase tracking-widest text-purple-600 dark:text-purple-400 flex items-center gap-2 group/btn hover:opacity-80 transition-opacity"
                        >
                          View Live
                          <span className="block w-6 h-[2px] bg-purple-600 dark:bg-purple-400 transform origin-left group-hover/btn:scale-x-150 transition-transform duration-300" />
                        </a>
                      ) : (
                        <button className="text-xs font-black uppercase tracking-widest text-purple-600 dark:text-purple-400 flex items-center gap-2 group/btn">
                          View Details
                          <span className="block w-6 h-[2px] bg-purple-600 dark:bg-purple-400 transform origin-left group-hover/btn:scale-x-150 transition-transform duration-300" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Animated Inner Border Glow */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/20 rounded-[2rem] pointer-events-none transition-colors duration-500" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
