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
            {/* Main Fluid Blob Cursor */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[10000] hidden md:block"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                {/* Outer Glow / Ring */}
                <motion.div
                    className="rounded-full border border-purple-500/30"
                    animate={{
                        width: isHovered ? 80 : 40,
                        height: isHovered ? 80 : 40,
                        backgroundColor: isHovered ? "rgba(168, 85, 247, 0.05)" : "rgba(168, 85, 247, 0.02)",
                        borderWidth: isHovered ? "1px" : "2px",
                    }}
                    transition={{ type: "spring", damping: 20, stiffness: 200 }}
                />

                {/* Inner Core */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-purple-500 rounded-full"
                    animate={{
                        scale: isHovered ? 0 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                />
            </motion.div>

            {/* Interaction Backdrop Glow (follows mouse but stays behind content) */}
            <div
                className="fixed inset-0 pointer-events-none z-[-1]"
                style={{
                    background: `radial-gradient(1000px circle at ${cursorX}px ${cursorY}px, rgba(139, 92, 246, 0.03), transparent 70%)`
                }}
            />
        </>
    );
}
