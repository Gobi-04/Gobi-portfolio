"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Image, Text } from "@react-three/drei";
import * as THREE from "three";

interface Project {
    title: string;
    description: string;
    image: string;
    stack: string[];
}

interface ProjectCards3DProps {
    projects: Project[];
    scrollProgress: number;
}

function ProjectCard({
    project,
    position,
    index,
    scrollProgress
}: {
    project: Project;
    position: [number, number, number];
    index: number;
    scrollProgress: number;
}) {
    const meshRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (!meshRef.current) return;

        // Calculate rotation based on scroll progress
        // Cards start rotating when scroll reaches project section (0.4-0.7)
        const cardStart = 0.4 + (index * 0.05);
        const cardEnd = cardStart + 0.15;

        const progress = THREE.MathUtils.clamp(
            (scrollProgress - cardStart) / (cardEnd - cardStart),
            0,
            1
        );

        // Rotate card from 0 to PI (180 degrees)
        meshRef.current.rotation.y = progress * Math.PI;

        // Add slight tilt during rotation
        meshRef.current.rotation.x = Math.sin(progress * Math.PI) * 0.1;
    });

    return (
        <group ref={meshRef} position={position}>
            {/* Front face */}
            <mesh position={[0, 0, 0.02]}>
                <planeGeometry args={[3, 4]} />
                <meshStandardMaterial
                    color="#ffffff"
                    side={THREE.FrontSide}
                />
            </mesh>

            {/* Project image on front */}
            <Image
                url={project.image || "/placeholder.jpg"}
                position={[0, 0.8, 0.03]}
                scale={[2.6, 1.8]}
            />

            {/* Project title */}
            <Text
                position={[0, -0.5, 0.03]}
                fontSize={0.25}
                color="#000000"
                anchorX="center"
                anchorY="middle"
                maxWidth={2.5}
            >
                {project.title}
            </Text>

            {/* Project description */}
            <Text
                position={[0, -1, 0.03]}
                fontSize={0.15}
                color="#333333"
                anchorX="center"
                anchorY="middle"
                maxWidth={2.5}
            >
                {project.description}
            </Text>

            {/* Tech stack */}
            <Text
                position={[0, -1.5, 0.03]}
                fontSize={0.12}
                color="#666666"
                anchorX="center"
                anchorY="middle"
                maxWidth={2.5}
            >
                {project.stack.join(" • ")}
            </Text>

            {/* Back face */}
            <mesh position={[0, 0, -0.02]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[3, 4]} />
                <meshStandardMaterial
                    color="#0066ff"
                    side={THREE.FrontSide}
                />
            </mesh>

            {/* Card border/frame */}
            <mesh>
                <boxGeometry args={[3.1, 4.1, 0.05]} />
                <meshStandardMaterial
                    color="#1a1a2e"
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
        </group>
    );
}

export default function ProjectCards3D({ projects, scrollProgress }: ProjectCards3DProps) {
    const groupRef = useRef<THREE.Group>(null);

    // Arrange cards in a fan/spread layout
    const cardPositions: [number, number, number][] = [
        [-4, 0, 0],
        [-1.5, 0, 0.5],
        [1.5, 0, 0.5],
        [4, 0, 0],
    ];

    return (
        <group ref={groupRef} position={[0, 0, -5]}>
            {projects.slice(0, 4).map((project, index) => (
                <ProjectCard
                    key={index}
                    project={project}
                    position={cardPositions[index] || [0, 0, 0]}
                    index={index}
                    scrollProgress={scrollProgress}
                />
            ))}

            {/* Spotlight on cards */}
            <spotLight
                position={[0, 5, 5]}
                angle={0.6}
                penumbra={1}
                intensity={2}
                castShadow
            />
        </group>
    );
}
