"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface FluidMeshProps {
    position?: [number, number, number];
}

export default function FluidMesh({ position = [0, 0, 0] }: FluidMeshProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    // Animate mesh rotation and scale
    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.elapsedTime;

        // Continuous rotation
        meshRef.current.rotation.x = time * 0.2;
        meshRef.current.rotation.y = time * 0.3;

        // Pulsing scale effect
        const scale = 1 + Math.sin(time * 0.5) * 0.1;
        meshRef.current.scale.set(scale, scale, scale);
    });

    return (
        <Float
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={0.5}
        >
            <mesh ref={meshRef} position={position}>
                <icosahedronGeometry args={[3, 4]} />
                <MeshDistortMaterial
                    color="#4834d4"
                    attach="material"
                    distort={0.5}
                    speed={3}
                    roughness={0.2}
                    metalness={0.8}
                    emissive="#4834d4"
                    emissiveIntensity={1.5}
                />
            </mesh>

            {/* Outer glow ring */}
            <mesh position={position}>
                <torusGeometry args={[4.5, 0.1, 16, 100]} />
                <meshStandardMaterial
                    color="#22d3ee"
                    emissive="#22d3ee"
                    emissiveIntensity={2}
                    transparent
                    opacity={0.6}
                />
            </mesh>

            {/* Second ring */}
            <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[5, 0.08, 16, 100]} />
                <meshStandardMaterial
                    color="#be2edd"
                    emissive="#be2edd"
                    emissiveIntensity={2}
                    transparent
                    opacity={0.4}
                />
            </mesh>
        </Float>
    );
}
