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
    title: "Threat-Pulse",
    description:
      "Cyber attack tracking platform with clean dashboards and real-world security insights.",
    image: "/projects/threat-pulse.webp",
    stack: ["Next.js", "Tailwind", "PostgreSQL"],
  },
  {
    title: "ServiceFinder",
    description:
      "Local electrician and plumber service finder with authentication and listings.",
    image: "/projects/servicefinder.jpg",
    stack: ["Next.js", "PHP", "MySQL"],
  },
  {
    title: "Online Security Guard Hiring",
    description:
      "Platform to hire security guards online with booking flow and service management.",
    image: "/projects/security-guard.png",
    stack: ["Next.js", "Tailwind"],
  },
  {
    title: "Food Delivery App",
    description:
      "End-to-end food ordering system with cart, orders, and restaurant workflows.",
    image: "/projects/food-delivery.avif",
    stack: ["Next.js", "Tailwind", "MySQL"],
  },
  {
    title: "Face Attendance System",
    description:
      "Automated attendance system using face recognition and computer vision.",
    image: "/projects/face-attendance.jpg",
    stack: ["Python", "OpenCV", "Flask"],
  },
  {
    title: "Blog Platform",
    description:
      "Multi-user blog system with authentication, post creation, and content management.",
    image: "/projects/blog.jpg",
    stack: ["Next.js", "PHP", "MySQL"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 bg-transparent relative overflow-hidden">
      <div className="relative z-10">
        <Reveal>
          <h2 className="text-5xl font-black mb-20 text-center bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
            Projects
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.06}>
              <div
                className="
                  group h-full flex flex-col
                  rounded-3xl overflow-hidden
                  border border-gray-200/50 dark:border-neutral-800/50
                  bg-white/40 dark:bg-neutral-900/40
                  backdrop-blur-md
                  shadow-lg hover:shadow-2xl
                  transition-all duration-500
                  hover:-translate-y-2
                  hover:border-purple-400/60
                "
              >
                {/* IMAGE */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* CONTENT */}
                <div className="flex flex-col flex-1 p-8">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {project.title}
                  </h3>

                  <p className="text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* STACK */}
                  <div className="flex flex-wrap gap-3 mt-auto">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="
                          text-sm px-4 py-2 rounded-full
                          text-purple-700 dark:text-purple-300
                          font-medium
                          border border-purple-200/50 dark:border-purple-800/50
                        "
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

    </section >
  );
}