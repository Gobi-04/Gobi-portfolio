"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";

interface ParticleFieldProps {
    count?: number;
    mouseX?: number;
    mouseY?: number;
}

export default function ParticleField({
    count = 10000,
    mouseX = 0,
    mouseY = 0
}: ParticleFieldProps) {
    const pointsRef = useRef<THREE.Points>(null);
    const noise3D = useMemo(() => createNoise3D(), []);

    // Generate particle positions using noise for organic distribution
    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Spherical distribution with noise
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 15 + noise3D(i * 0.01, i * 0.01, 0) * 8;

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            // Color gradient based on position (purple to cyan to white)
            const depth = (positions[i * 3 + 2] + 25) / 50; // Normalize z position
            colors[i * 3] = THREE.MathUtils.lerp(0.28, 0.13, depth); // R
            colors[i * 3 + 1] = THREE.MathUtils.lerp(0.2, 0.83, depth); // G
            colors[i * 3 + 2] = THREE.MathUtils.lerp(0.83, 0.93, depth); // B
        }

        return { positions, colors };
    }, [count, noise3D]);

    // Animate particles with noise-based movement and mouse interaction
    useFrame((state) => {
        if (!pointsRef.current) return;

        const time = state.clock.elapsedTime;
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Original position
            const originalX = particles.positions[i3];
            const originalY = particles.positions[i3 + 1];
            const originalZ = particles.positions[i3 + 2];

            // Noise-based movement
            const noiseX = noise3D(originalX * 0.05, originalY * 0.05, time * 0.1) * 0.5;
            const noiseY = noise3D(originalY * 0.05, originalZ * 0.05, time * 0.1) * 0.5;
            const noiseZ = noise3D(originalZ * 0.05, originalX * 0.05, time * 0.1) * 0.5;

            // Mouse interaction - particles move away from cursor
            const mouseInfluence = 5;
            const mouseDistX = originalX - mouseX * mouseInfluence;
            const mouseDistY = originalY - mouseY * mouseInfluence;
            const mouseDist = Math.sqrt(mouseDistX * mouseDistX + mouseDistY * mouseDistY);
            const mouseForce = Math.max(0, 1 - mouseDist / 10);

            positions[i3] = originalX + noiseX + mouseDistX * mouseForce * 0.3;
            positions[i3 + 1] = originalY + noiseY + mouseDistY * mouseForce * 0.3;
            positions[i3 + 2] = originalZ + noiseZ;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // Gentle rotation
        pointsRef.current.rotation.y = time * 0.05;
        pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.1;
    });

    return (
        <Points
            ref={pointsRef}
            positions={particles.positions}
            colors={particles.colors}
            stride={3}
            frustumCulled={false}
        >
            <PointMaterial
                transparent
                vertexColors
                size={0.08}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.8}
            />
        </Points>
    );
}
