"use client";
import Reveal from "@/components/animation/Reveal";
import Section from "@/components/layout/Section";
import { FaCertificate, FaGoogle, FaIbm } from "react-icons/fa";

type Certification = {
    id: number;
    title: string;
    issuer: string;
    icon: React.ReactNode;
    color: string;
};

const certifications: Certification[] = [
    {
        id: 1,
        title: "Generative AI for Educators Certificate",
        issuer: "Google",
        icon: <FaGoogle />,
        color: "text-blue-500",
    },
    {
        id: 2,
        title: "Introduction to ChromeOS for education",
        issuer: "Google",
        icon: <FaGoogle />,
        color: "text-blue-500",
    },
    {
        id: 3,
        title: "Design Thinking",
        issuer: "IBM",
        icon: <FaIbm />,
        color: "text-blue-600",
    }
];

function CertificationCard({ cert, index }: { cert: Certification; index: number }) {
    return (
        <Reveal delay={index * 0.1}>
            <div
                className="
                    h-full
                    rounded-[2rem]
                    p-8
                    border border-white/10
                    bg-white/5
                    backdrop-blur-xl
                    transition-all duration-500
                    hover:-translate-y-2
                    hover:border-purple-500/50
                    group
                "
            >
                <div className={`mb-6 text-4xl ${cert.color} opacity-80 group-hover:scale-110 transition-transform duration-300`}>
                    {cert.icon}
                </div>

                <div className="mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300 leading-tight">
                        {cert.title}
                    </h3>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400 font-medium tracking-wide">
                        Issued by {cert.issuer}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/40" />
                    <span className="text-[10px] font-bold text-purple-500/60 uppercase tracking-widest">
                        Verified
                    </span>
                </div>
            </div>
        </Reveal>
    );
}

export default function Certifications() {
    return (
        <Section id="certifications" className="bg-transparent relative overflow-hidden">
            <div className="relative z-10 w-full px-6">
                <Reveal>
                    <div className="flex flex-col items-center mb-20 text-center">
                        <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-purple-500 mb-6 font-geist">
                            Achievements
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-tight">
                            Certifications
                        </h1>
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certifications.map((cert, index) => (
                        <CertificationCard
                            key={cert.id}
                            cert={cert}
                            index={index}
                        />
                    ))}
                </div>

                <Reveal delay={0.5}>
                    <div className="text-center mt-16">
                        <p className="text-slate-500 dark:text-indigo-100/50 mb-8 font-medium">
                            Constantly learning and expanding my expertise.
                        </p>
                    </div>
                </Reveal>
            </div>
        </Section>
    );
}
