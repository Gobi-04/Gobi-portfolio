"use client";

import Image from "next/image";
import Reveal from "@/components/animation/Reveal";

type Project = {
  title: string;
  description: string;
  image: string;
  stack: string[];
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.1} className="h-full">
              <div className="group relative flex flex-col h-full rounded-3xl overflow-hidden bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:shadow-[0_0_80px_rgba(168,85,247,0.1)]">
                {/* Image Container */}
                <div className="relative h-[300px] w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white">{project.title}</h1>
                  </div>

                  <p className="text-slate-500 dark:text-gray-400 text-lg leading-relaxed mb-10 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-auto">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-bold text-cyan-400/80 border border-cyan-400/20 px-4 py-1.5 rounded-full bg-cyan-400/5 backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
