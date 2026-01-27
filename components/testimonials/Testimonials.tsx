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
          rounded-3xl
          p-8
          border
          backdrop-blur-md
          bg-white/40 dark:bg-neutral-900/40
          border-gray-200/50 dark:border-neutral-800/50
          shadow-lg
          transition-all duration-500
          hover:-translate-y-3
          hover:shadow-2xl
          hover:border-indigo-400/60
          cursor-pointer
          hover:bg-white/60 dark:hover:bg-neutral-900/60
        "
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="mb-6">
                    <FaQuoteLeft className="text-indigo-500 text-3xl opacity-80" />
                </div>

                <div className="mb-8">
                    <p className={`text-gray-700 dark:text-gray-300 leading-relaxed text-lg ${!isExpanded && testimonial.content.length > 150 ? "line-clamp-3" : ""}`}>
                        "{testimonial.content}"
                    </p>
                    {testimonial.content.length > 150 && (
                        <button
                            className="text-indigo-500 hover:text-indigo-600 text-sm font-medium mt-2 transition-colors"
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
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
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
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                            {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                            {testimonial.role} at {testimonial.company}
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
            <div className="relative z-10 w-full">
                <Reveal>
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Testimonials
                        </h2>
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
                        <p className="text-gray-500 dark:text-gray-400">
                            Testimonials will appear here once added.
                        </p>
                    </div>
                )}

                <Reveal delay={0.5}>
                    <div className="text-center mt-16">
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Ready to work together?
                        </p>
                        <a
                            href="#contact"
                            className="inline-block px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:rotate-1"
                        >
                            Get In Touch
                        </a>
                    </div>
                </Reveal>
            </div>
        </Section>
    );
}