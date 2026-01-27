"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";
import { FaArrowRight, FaHome } from "react-icons/fa";

export default function NotFound() {
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 flex items-center justify-center relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.3)_1px,transparent_0)] [background-size:30px_30px]" />

            {/* Animated background elements */}
            <motion.div
                className="absolute top-20 left-10 w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-20 dark:opacity-10"
                animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-20 dark:opacity-10"
                animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
                transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            />

            <motion.div
                className="relative z-10 text-center px-6 max-w-2xl"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* 404 Number */}
                <motion.div variants={ variants }  className="mb-8">
                    <motion.span
                        className="text-9xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block leading-none"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        404
                    </motion.span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    variants={variants}
                    className="text-5xl md:text-6xl font-black mb-6 text-gray-900 dark:text-white leading-tight"
                >
                    Oops! Page Not Found
                </motion.h1>

                {/* Description */}
                <motion.p
                    variants={variants}
                    className="text-xl text-gray-700 dark:text-gray-300 mb-12 leading-relaxed"
                >
                    The page you're looking for doesn't exist. It might have been moved or deleted. Let's get you back on track!
                </motion.p>

                {/* Buttons */}
                <motion.div
                    variants={variants}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center sm:items-stretch"
                >
                    {/* Home Button */}
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                        <FaHome size={20} />
                        Back to Home
                    </Link>

                    {/* Contact Button */}
                    <Link
                        href="/#contact"
                        className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl border-2 border-gray-400 dark:border-neutral-600 bg-white/60 dark:bg-black/60 backdrop-blur-lg text-gray-900 dark:text-white font-bold text-lg hover:border-purple-500 hover:bg-white/80 dark:hover:bg-black/80 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        Get in Touch
                        <FaArrowRight size={18} />
                    </Link>
                </motion.div>

                {/* Helpful Links */}
                <motion.div variants={variants} className="mt-16 pt-12 border-t border-gray-300/50 dark:border-gray-700/50">
                    <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium">
                        Or explore these pages:
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {[
                            { href: "/#projects", label: "Projects" },
                            { href: "/#about", label: "About" },
                            { href: "/#skills", label: "Skills" },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-5 py-2 rounded-full bg-white/50 dark:bg-black/50 border border-gray-300/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 font-semibold hover:border-purple-500/60 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
