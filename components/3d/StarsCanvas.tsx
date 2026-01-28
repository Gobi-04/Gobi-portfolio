"use client";

import { Points, PointMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useState, useRef, Suspense } from "react";
import * as THREE from "three";
import { useTheme } from "@/components/theme/ThemeProvider";

function StarBackground() {
    const ref = useRef<THREE.Points>(null!);
    const [sphere] = useState(() => {
        const count = 5000;
        const positions = new Float32Array(count * 3);
        const radius = 1.2;
        for (let i = 0; i < count; i++) {
            // Uniform distribution in sphere
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);
            const r = radius * Math.cbrt(Math.random());
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
            <Points
                ref={ref}
                stride={3}
                positions={sphere}
                frustumCulled
            >
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

export default function StarsCanvas() {
    const { theme } = useTheme();
    if (theme === "light") return null;

    return (
        <div className="w-full h-auto fixed inset-0 -z-20 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Suspense fallback={null}>
                    <StarBackground />
                </Suspense>
            </Canvas>
        </div>
    );
}
