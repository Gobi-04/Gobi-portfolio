"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/components/theme/ThemeProvider";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float d = length(p - uMouse);
    
    // Fluid noise-like movement
    float noise = sin(p.x * 3.0 + uTime) * cos(p.y * 3.0 + uTime) * 0.2;
    float circle = smoothstep(0.8, 0.0, d + noise);
    
    vec3 color = mix(uColor1, uColor2, vUv.y + noise);
    color += circle * 0.15; // Mouse glow
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

function BackgroundMesh() {
    const meshRef = useRef<THREE.Mesh>(null);
    const { viewport } = useThree();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uColor1: { value: new THREE.Color(isDark ? "#080020" : "#f0f4ff") },
            uColor2: { value: new THREE.Color(isDark ? "#030014" : "#e0e7ff") },
        }),
        [isDark]
    );

    useFrame((state) => {
        if (meshRef.current) {
            const { mouse, clock } = state;
            (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime() * 0.5;
            (meshRef.current.material as THREE.ShaderMaterial).uniforms.uMouse.value.lerp(
                new THREE.Vector2(mouse.x, mouse.y),
                0.05
            );
        }
    });

    return (
        <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}

function Starfield() {
    const pointsRef = useRef<THREE.Points>(null);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [positions, sizes] = useMemo(() => {
        const count = 2000;
        const pos = new Float32Array(count * 3);
        const sz = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 50;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
            sz[i] = Math.random() * 2;
        }
        return [pos, sz];
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
            pointsRef.current.rotation.x = state.mouse.y * 0.1;
            pointsRef.current.rotation.z = state.mouse.x * 0.1;
        }
    });

    if (!isDark) return null;

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} count={2000} itemSize={3} />
                <bufferAttribute attach="attributes-size" args={[sizes, 1]} count={2000} itemSize={1} />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#ffffff"
                transparent
                opacity={0.3}
                blending={THREE.AdditiveBlending}
                sizeAttenuation
            />
        </points>
    );
}

export default function Background() {
    return (
        <div className="fixed inset-0 z-[-10] w-full h-full pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ antialias: true, alpha: false }}
                dpr={[1, 2]}
            >
                <BackgroundMesh />
                <Starfield />
            </Canvas>
        </div>
    );
}
