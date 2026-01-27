"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, Environment, Stars, useScroll, Sky, Float, ContactShadows } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useSceneStore } from "@/lib/useSceneStore";
import { useTheme } from "@/components/theme/ThemeProvider";

function House() {
  const { scene } = useGLTF("/models/house/scene.gltf");
  const { currentSection, isDoorOpen } = useSceneStore();
  const doorRef = useRef<THREE.Object3D | null>(null);

  // Attempt to find the door node
  useEffect(() => {
    scene.traverse((child) => {
      // In many Sketchfab models, the door might have a specific name
      if (child.name.toLowerCase().includes("door") || child.name.toLowerCase().includes("red")) {
        doorRef.current = child;
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (doorRef.current) {
      // Simple rotation for door opening
      const targetRotation = isDoorOpen ? -Math.PI / 2 : 0;
      doorRef.current.rotation.y = THREE.MathUtils.lerp(
        doorRef.current.rotation.y,
        targetRotation,
        delta * 3
      );
    }
  });

  return (
    <group>
      <primitive object={scene} scale={0.05} />
      {/* Add a simple ground plane */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]} receiveShadow>
        <circleGeometry args={[50, 64]} />
        <meshStandardMaterial color="#3d5a32" roughness={0.8} />
      </mesh>

      {/* Path leading to the door */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.005, 10]} receiveShadow>
        <planeGeometry args={[3, 20]} />
        <meshStandardMaterial color="#555555" roughness={0.9} />
      </mesh>
    </group>
  );
}

// Nature elements - Simple procedural trees
function Nature() {
  return (
    <group>
      {/* Scatter some simple trees around */}
      {[...Array(15)].map((_, i) => {
        const angle = (i / 15) * Math.PI * 2 + Math.random();
        const dist = 15 + Math.random() * 20;
        const x = Math.cos(angle) * dist;
        const z = Math.sin(angle) * dist;
        const scale = 0.5 + Math.random() * 1.5;

        return (
          <group key={i} position={[x, 0, z]} scale={scale}>
            {/* Trunk */}
            <mesh position={[0, 1, 0]}>
              <cylinderGeometry args={[0.2, 0.3, 2]} />
              <meshStandardMaterial color="#4a3728" />
            </mesh>
            {/* Leaves */}
            <mesh position={[0, 2.5, 0]}>
              <coneGeometry args={[1, 3, 8]} />
              <meshStandardMaterial color="#2d5a27" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Positions mapping for each section - Adjusted for better views
const CAMERA_POSITIONS: Record<string, { pos: [number, number, number], lookAt: [number, number, number] }> = {
  hero: { pos: [15, 8, 25], lookAt: [0, 2, 0] },          // Wide outdoor view
  about: { pos: [4, 2, 8], lookAt: [0, 2, 0] },         // Closer to door
  skills: { pos: [-8, 3, -2], lookAt: [-20, 2, -2] },   // Left of house
  projects: { pos: [0, 3, -15], lookAt: [0, 2, -30] },   // Backyard View
  education: { pos: [20, 15, 20], lookAt: [0, 0, 0] },   // High wide view of environment
  experience: { pos: [-20, 10, 10], lookAt: [0, 5, 0] }, // Another wide view
  testimonials: { pos: [0, 20, 40], lookAt: [0, 0, 0] }, // Panoramic view
  contact: { pos: [30, 5, 0], lookAt: [0, 2, 0] },       // Side view
};

function CameraManager() {
  const { currentSection } = useSceneStore();
  const { camera } = useThree();
  const targetPos = new THREE.Vector3(...CAMERA_POSITIONS[currentSection].pos);
  const targetLookAt = new THREE.Vector3(...CAMERA_POSITIONS[currentSection].lookAt);
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    camera.position.lerp(targetPos, delta * 2);
    currentLookAt.current.lerp(targetLookAt, delta * 2);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

export default function Scene() {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas shadows gl={{ antialias: true }}>
        <color attach="background" args={theme === "dark" ? ["#050505"] : ["#87ceeb"]} />
        <fog attach="fog" args={[theme === "dark" ? "#050505" : "#87ceeb", 20, 90]} />

        <Suspense fallback={null}>
          <House />
          <Nature />
          <CameraManager />

          <Sky sunPosition={[100, 20, 100]} />
          <Environment preset="park" />

          <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

          <ambientLight intensity={theme === "dark" ? 0.4 : 0.8} />
          <directionalLight
            position={[10, 20, 10]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />

          <ContactShadows
            position={[0, 0, 0]}
            opacity={0.4}
            scale={40}
            blur={2}
            far={10}
            resolution={256}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
