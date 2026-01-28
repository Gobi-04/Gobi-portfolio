"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/components/theme/ThemeProvider";

// Space particles - floating stars/dust
function SpaceParticles() {
    const particlesRef = useRef<THREE.Points>(null);

    const { positions, velocities } = useMemo(() => {
        const count = 4000;
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Spread particles in a large cube
            positions[i * 3] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

            // Random velocities for floating effect
            velocities[i * 3] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
        }

        return { positions, velocities, count };
    }, []);

    useFrame(() => {
        if (particlesRef.current) {
            const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

            for (let i = 0; i < 4000; i++) {
                // Update positions
                positions[i * 3] += velocities[i * 3];
                positions[i * 3 + 1] += velocities[i * 3 + 1];
                positions[i * 3 + 2] += velocities[i * 3 + 2];

                // Wrap around if out of bounds
                if (Math.abs(positions[i * 3]) > 50) positions[i * 3] *= -1;
                if (Math.abs(positions[i * 3 + 1]) > 50) positions[i * 3 + 1] *= -1;
                if (Math.abs(positions[i * 3 + 2]) > 50) positions[i * 3 + 2] *= -1;
            }

            particlesRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                    count={4000}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                color="#ffffff"
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Main space scene
export default function HeroLandscape() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <>
            {/* Background color based on theme */}
            <color attach="background" args={[isDark ? "#000000" : "#ffffff"]} />

            {/* Ambient light based on theme */}
            <ambientLight intensity={isDark ? 0.1 : 0.8} />

            {/* Space particles only in dark mode */}
            {isDark && <SpaceParticles />}
        </>
    );
}
