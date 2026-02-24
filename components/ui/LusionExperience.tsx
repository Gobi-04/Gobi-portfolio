"use client";

import { useGLTF, PerspectiveCamera, Environment, Float, Stars, Sparkles, PerspectiveCamera as PerspectiveCameraImpl } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

// Permanent local fallback for the astronaut model
const LOCAL_MODEL_URL = "/models/astronaut.glb";
// Robust secondary fallback from Google's model-viewer project
const REMOTE_MODEL_URL = "https://modelviewer.dev/shared-assets/models/Astronaut.glb";

function Astronaut() {
    // Try local first, then remote fallback. useGLTF returns an array when passed an array.
    const models = useGLTF([LOCAL_MODEL_URL, REMOTE_MODEL_URL]) as any[];
    const scene = models[0]?.scene || models[1]?.scene;
    const astronautRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (astronautRef.current) {
            // Gentle floating animation
            astronautRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
            astronautRef.current.rotation.y += 0.005;
        }
    });

    if (!scene) return null;

    return (
        <primitive
            ref={astronautRef}
            object={scene}
            scale={1.5}
            position={[0, -1, 0]}
            rotation={[0, Math.PI / 4, 0]}
        />
    );
}

function Terrain() {
    const meshRef = useRef<THREE.Mesh>(null);

    // Create a rocky, moon-like surface
    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(100, 100, 64, 64);
        const pos = geo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const z = Math.sin(x * 0.2) * Math.cos(y * 0.2) * 2 + Math.random() * 0.1;
            pos.setZ(i, z);
        }
        geo.computeVertexNormals();
        return geo;
    }, []);

    return (
        <mesh
            ref={meshRef}
            geometry={geometry}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -5, 0]}
        >
            <meshStandardMaterial
                color="#1a1a1a"
                roughness={1}
                metalness={0.1}
                flatShading
            />
        </mesh>
    );
}

function Scene() {
    return (
        <>
            <color attach="background" args={["#030014"]} />
            <fog attach="fog" args={["#030014", 5, 25]} />

            <ambientLight intensity={0.2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="cyan" />
            <pointLight position={[10, 5, 5]} intensity={0.8} color="purple" />

            <Suspense fallback={<mesh><sphereGeometry args={[0.5, 32, 32]} /><meshStandardMaterial color="white" emissive="white" emissiveIntensity={2} /></mesh>}>
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <Astronaut />
                </Float>
                <Terrain />
            </Suspense>

            <Sparkles count={100} scale={20} size={2} speed={0.2} opacity={0.2} />
            <Environment preset="night" />
        </>
    );
}

export default function LusionExperience() {
    return (
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
            <Canvas
                shadows
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
                <Scene />
            </Canvas>

            {/* Dynamic Overlay Shadow */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030014]/50 via-transparent to-[#030014] pointer-events-none" />
        </div>
    );
}
