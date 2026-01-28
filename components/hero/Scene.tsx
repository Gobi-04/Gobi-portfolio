"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    useGLTF,
    Environment,
    Stars,
    Float,
    Points,
    PointMaterial,
    MeshDistortMaterial,
    Sphere,
    PerspectiveCamera,
    ScrollControls,
    Scroll
} from "@react-three/drei";
import { Suspense, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { useSceneStore } from "@/lib/useSceneStore";
import { useTheme } from "@/components/theme/ThemeProvider";

// 1. HIGH-QUALITY STARFIELD BACKGROUND
function StarBackground() {
    const ref = useRef<any>(null);
    const [sphere] = useState(() => {
        const positions = new Float32Array(5000 * 3);
        for (let i = 0; i < 5000; i++) {
            const r = 40;
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }
        return positions;
    });

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

// 2. SPACE OBJECTS FOR SECTIONS
function SpaceObjects() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <group>
            {/* HERO SECTION: The Black Hole/Core */}
            <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[2, 64, 64]} />
                    <MeshDistortMaterial
                        color="#4834d4"
                        distort={0.4}
                        speed={5}
                        roughness={0}
                        emissive="#4834d4"
                        emissiveIntensity={2}
                    />
                </mesh>
                <Stars radius={4} depth={2} count={500} factor={2} saturation={0} fade speed={1} />
            </Float>

            {/* ABOUT SECTION: The High-Tech Array */}
            <group position={[30, 10, -30]}>
                <Float speed={3} rotationIntensity={2}>
                    <mesh rotation={[Math.PI / 4, 0, 0]}>
                        <torusGeometry args={[10, 0.05, 16, 100]} />
                        <meshStandardMaterial color="#be2edd" emissive="#be2edd" emissiveIntensity={5} />
                    </mesh>
                    <mesh rotation={[0, Math.PI / 4, 0]}>
                        <torusGeometry args={[12, 0.05, 16, 100]} />
                        <meshStandardMaterial color="#00d2ff" emissive="#00d2ff" emissiveIntensity={5} />
                    </mesh>
                </Float>
            </group>

            {/* SKILLS SECTION: Data Pulsar */}
            <group position={[-40, 15, -10]}>
                <Float speed={5} rotationIntensity={10}>
                    <mesh>
                        <octahedronGeometry args={[4]} />
                        <meshStandardMaterial color="#00d2ff" wireframe emissive="#00d2ff" emissiveIntensity={2} />
                    </mesh>
                </Float>
                {[...Array(10)].map((_, i) => (
                    <Float key={i} speed={Math.random() * 5} position={[Math.sin(i) * 10, Math.cos(i) * 10, Math.sin(i * 2) * 10]}>
                        <mesh>
                            <boxGeometry args={[0.5, 0.5, 0.5]} />
                            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
                        </mesh>
                    </Float>
                ))}
            </group>

            {/* PROJECTS SECTION: The Wormhole Tunnel */}
            <group position={[10, -20, -60]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[15, 15, 40, 32, 1, true]} />
                    <meshStandardMaterial color="#130f40" wireframe transparent opacity={0.1} />
                </mesh>
                <Float speed={1} floatIntensity={2}>
                    <Sphere args={[5, 32, 32]}>
                        <MeshDistortMaterial color="#eb4d4b" distort={0.6} speed={2} roughness={1} />
                    </Sphere>
                </Float>
            </group>

            {/* CONTACT: The Distant Supernova */}
            <group position={[-20, -30, 50]}>
                <Float speed={0.5} rotationIntensity={0.2}>
                    <Sphere args={[12, 64, 64]}>
                        <meshStandardMaterial color="#1e272e" emissive="#1e272e" emissiveIntensity={0.1} transparent opacity={0.8} />
                    </Sphere>
                    <Stars radius={25} depth={50} count={2000} factor={4} saturation={0} fade speed={2} />
                </Float>
            </group>
        </group>
    );
}

// 3. CAMERA MANAGER
const CAMERA_POSITIONS: Record<string, { pos: [number, number, number], lookAt: [number, number, number] }> = {
    hero: { pos: [0, 5, 20], lookAt: [0, 0, 0] },
    about: { pos: [25, 15, -10], lookAt: [30, 10, -30] },
    skills: { pos: [-30, 25, 10], lookAt: [-40, 15, -10] },
    projects: { pos: [20, -10, -40], lookAt: [10, -20, -60] },
    education: { pos: [75, 40, 35], lookAt: [60, 30, 20] },
    experience: { pos: [70, 38, 30], lookAt: [60, 30, 20] },
    testimonials: { pos: [0, 20, 70], lookAt: [0, 0, -30] },
    contact: { pos: [-10, -15, 75], lookAt: [-20, -30, 50] },
};

function CameraManager() {
    const { currentSection } = useSceneStore();
    const { camera } = useThree();
    const targetPos = new THREE.Vector3(...(CAMERA_POSITIONS[currentSection]?.pos || CAMERA_POSITIONS.hero.pos));
    const targetLookAt = new THREE.Vector3(...(CAMERA_POSITIONS[currentSection]?.lookAt || CAMERA_POSITIONS.hero.lookAt));
    const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

    useFrame((state, delta) => {
        const speed = delta * 2;
        camera.position.lerp(targetPos, speed);
        currentLookAt.current.lerp(targetLookAt, speed);
        camera.lookAt(currentLookAt.current);
    });

    return null;
}

export default function Scene() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none bg-[#030014]">
            <Canvas shadows gl={{ antialias: true, alpha: true }} camera={{ fov: 45, near: 0.1, far: 1000 }}>
                <Suspense fallback={null}>
                    <StarBackground />
                    <SpaceObjects />
                    <CameraManager />

                    {/* LIGHTING */}
                    <ambientLight intensity={isDark ? 0.3 : 1} />
                    <pointLight position={[10, 10, 10]} intensity={2} color="#4834d4" />
                    <pointLight position={[-10, -10, -10]} intensity={1} color="#be2edd" />
                    <Environment preset="night" />
                </Suspense>
            </Canvas>
        </div>
    );
}
