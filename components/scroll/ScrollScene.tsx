"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera, ScrollControls, Scroll } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import { useScroll as useFramerScroll } from "framer-motion";
import HeroLandscape from "../hero/HeroLandscape";
import ProjectCards3D from "../projects/ProjectCards3D";

interface ScrollSceneProps {
    projects: any[];
}

// Camera controller that zooms out based on scroll
function CameraController({ scrollProgress }: { scrollProgress: number }) {
    return (
        <PerspectiveCamera
            makeDefault
            position={[
                0,
                5 - scrollProgress * 10, // Move camera down as we scroll
                25 - scrollProgress * 20, // Zoom out as we scroll
            ]}
            fov={50}
        />
    );
}

export default function ScrollScene({ projects }: ScrollSceneProps) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const { scrollYProgress } = useFramerScroll();

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            setScrollProgress(latest);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none">
            <Canvas
                shadows
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
            >
                <Suspense fallback={null}>
                    {/* Background color */}
                    <color attach="background" args={["#030014"]} />

                    {/* Camera that zooms out on scroll */}
                    <CameraController scrollProgress={scrollProgress} />

                    {/* Hero landscape (visible at scroll 0-0.3) */}
                    {scrollProgress < 0.4 && <HeroLandscape />}

                    {/* Project cards (visible at scroll 0.4-0.8) */}
                    {scrollProgress >= 0.3 && scrollProgress < 0.9 && (
                        <ProjectCards3D projects={projects} scrollProgress={scrollProgress} />
                    )}

                    {/* Environment lighting */}
                    <Environment preset="night" />
                </Suspense>
            </Canvas>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030014] pointer-events-none" />
        </div>
    );
}
