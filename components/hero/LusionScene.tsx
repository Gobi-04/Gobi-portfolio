"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import ParticleField from "./ParticleField";
import FluidMesh from "./FluidMesh";

interface LusionSceneProps {
    mouseX?: number;
    mouseY?: number;
    scrollY?: number;
}

// Camera controller with mouse parallax
function CameraController({ mouseX = 0, mouseY = 0 }: { mouseX: number; mouseY: number }) {
    const { camera } = useThree();

    useFrame(() => {
        // Smooth camera movement based on mouse position
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX * 2, 0.05);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouseY * 2 + 5, 0.05);
        camera.lookAt(0, 0, 0);
    });

    return null;
}

export default function LusionScene({ mouseX = 0, mouseY = 0, scrollY = 0 }: LusionSceneProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect mobile devices for performance optimization
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Reduce particle count on mobile for performance
    const particleCount = isMobile ? 2000 : 10000;

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none">
            <Canvas
                shadows
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
                camera={{
                    position: [0, 5, 25],
                    fov: 50,
                    near: 0.1,
                    far: 1000
                }}
            >
                <Suspense fallback={null}>
                    {/* Background color */}
                    <color attach="background" args={["#030014"]} />
                    <fog attach="fog" args={["#030014", 30, 80]} />

                    {/* Lighting */}
                    <ambientLight intensity={0.3} />
                    <pointLight position={[10, 10, 10]} intensity={2} color="#4834d4" />
                    <pointLight position={[-10, -10, -10]} intensity={1.5} color="#be2edd" />
                    <pointLight position={[0, 0, 20]} intensity={1} color="#22d3ee" />
                    <spotLight
                        position={[0, 20, 0]}
                        angle={0.3}
                        penumbra={1}
                        intensity={1}
                        color="#ffffff"
                        castShadow
                    />

                    {/* 3D Elements */}
                    <ParticleField count={particleCount} mouseX={mouseX} mouseY={mouseY} />
                    <FluidMesh position={[0, 0, 0]} />

                    {/* Camera controller */}
                    <CameraController mouseX={mouseX} mouseY={mouseY} />

                    {/* Environment */}
                    <Environment preset="night" />

                    {/* Post-processing effects (desktop only) */}
                    {!isMobile && (
                        <EffectComposer>
                            <Bloom
                                intensity={0.8}
                                luminanceThreshold={0.2}
                                luminanceSmoothing={0.9}
                                mipmapBlur
                            />
                        </EffectComposer>
                    )}
                </Suspense>
            </Canvas>

            {/* Gradient overlay for smooth transition to content */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030014] pointer-events-none" />
        </div>
    );
}
