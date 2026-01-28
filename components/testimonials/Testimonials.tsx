"use client";
import { useState } from "react";
import Reveal from "@/components/animation/Reveal";
import Section from "@/components/layout/Section";
import { FaQuoteLeft } from "react-icons/fa";

type Testimonial = {
    id: number;
    name: string;
    role: string;
    company: string;
    content: string;
    avatar?: string;
};

/* ================= TESTIMONIAL CARD ================= */

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
    const [isExpanded, setIsExpanded] = useState(false);

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
                    hover:border-indigo-500/50
                    cursor-pointer
                "
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="mb-6">
                    <FaQuoteLeft className="text-indigo-400 text-3xl opacity-50" />
                </div>

                <div className="mb-8">
                    <p className={`text-indigo-100/70 leading-relaxed text-lg ${!isExpanded && testimonial.content.length > 150 ? "line-clamp-3" : ""}`}>
                        "{testimonial.content}"
                    </p>
                    {testimonial.content.length > 150 && (
                        <button
                            className="text-indigo-400 hover:text-indigo-300 text-sm font-bold mt-2 transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(!isExpanded);
                            }}
                        >
                            {isExpanded ? "Show less" : "Read more"}
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-6">
                    <div className="h-14 w-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 font-black text-xl">
                        {testimonial.avatar ? (
                            <img
                                src={testimonial.avatar}
                                alt={testimonial.name}
                                className="h-full w-full rounded-full object-cover"
                            />
                        ) : (
                            testimonial.name.charAt(0).toUpperCase()
                        )}
                    </div>

                    <div className="flex-1">
                        <h4 className="font-bold text-white text-lg tracking-tight">
                            {testimonial.name}
                        </h4>
                        <p className="text-sm text-indigo-300/50 font-medium tracking-wide">
                            {testimonial.role} @ {testimonial.company}
                        </p>
                    </div>
                </div>
            </div>
        </Reveal>
    );
}

const testimonials: Testimonial[] = [];

export default function Testimonials() {
    return (
        <Section id="testimonials" className="bg-transparent relative overflow-hidden">
            <div className="relative z-10 w-full px-6">
                <Reveal>
                    <div className="flex flex-col items-center mb-24 text-center">
                        <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-purple-500 mb-6">
                            Client Kind Words
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-tight">
                            Testimonials
                        </h1>
                    </div>
                </Reveal>

                {testimonials.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard
                                key={testimonial.id}
                                testimonial={testimonial}
                                index={index}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-slate-400 dark:text-indigo-100/30 font-bold uppercase tracking-[0.3em] text-[10px]">
                            No incoming transmissions yet.
                        </p>
                    </div>
                )}

                <Reveal delay={0.5}>
                    <div className="text-center mt-16">
                        <p className="text-slate-500 dark:text-indigo-100/50 mb-8 font-medium">
                            Ready to launch a project together?
                        </p>
                        <a
                            href="#contact"
                            className="group relative inline-flex items-center justify-center px-16 py-6 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black font-black text-xl hover:bg-slate-800 dark:hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 overflow-hidden"
                        >
                            <span className="relative z-10">SAY HELLO 👋</span>
                        </a>
                    </div>
                </Reveal>
            </div>
        </Section>
    );
}
