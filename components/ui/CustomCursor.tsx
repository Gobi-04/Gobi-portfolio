"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 250 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                window.getComputedStyle(target).cursor === "pointer" ||
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") ||
                target.closest("a")
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Outer Ring - Multi-layered for "glow" and "depth" */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-purple-500/40 pointer-events-none z-[10000] hidden md:block mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovered ? 1.5 : 1,
                    borderWidth: isHovered ? "1px" : "2px",
                    opacity: isHovered ? 0.8 : 0.4,
                }}
                transition={{ type: "spring", damping: 15, stiffness: 150, mass: 0.6 }}
            />

            {/* Inner Dot - Snappy and Precise */}
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-purple-500 rounded-full pointer-events-none z-[10001] hidden md:block"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovered ? 4 : 1,
                    opacity: isHovered ? 0.3 : 1,
                }}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
            />

            {/* Magnetic Glow - Very subtle and follows the cursor */}
            <motion.div
                className="fixed inset-0 pointer-events-none z-[-1] hidden md:block"
                style={{
                    background: `radial-gradient(400px circle at ${cursorX}px ${cursorY}px, rgba(139, 92, 246, 0.02), transparent 80%)`,
                }}
            />
        </>
    );
}
