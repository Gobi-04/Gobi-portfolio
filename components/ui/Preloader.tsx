"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                const increment = Math.floor(Math.random() * 5) + 1;
                return Math.min(prev + increment, 100);
            });
        }, 30);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 1, ease: "easeInOut", delay: 0.5 }
                    }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030014] overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full" />
                    </div>

                    <div className="relative flex flex-col items-center justify-center h-full w-full">
                        {/* Logo / Portal Letter */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{
                                scale: 60,
                                opacity: 0,
                                filter: "blur(10px)",
                                transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] }
                            }}
                            className="z-20 flex flex-col items-center pointer-events-none"
                        >
                            <span className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase italic">
                                G<span className="text-purple-500">.</span>
                            </span>
                        </motion.div>

                        {/* Loading Info - Fades away first */}
                        <motion.div
                            exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
                            className="absolute bottom-20 flex flex-col items-center gap-6"
                        >
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-4xl md:text-6xl font-black text-white/20 tabular-nums">
                                    {progress}%
                                </span>

                                <div className="w-32 h-[1px] bg-white/5 relative overflow-hidden">
                                    <motion.div
                                        className="absolute inset-y-0 left-0 bg-white/40"
                                        initial={{ width: "0%" }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.1 }}
                                    />
                                </div>
                            </div>

                            <motion.span
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-[8px] uppercase tracking-[0.4em] text-white/40 font-bold"
                            >
                                Loading Experience
                            </motion.span>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
