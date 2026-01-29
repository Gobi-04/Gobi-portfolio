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
  varying vec2 vUv;

  vec3 palette(float t) {
      vec3 a = vec3(0.5, 0.5, 0.5);
      vec3 b = vec3(0.5, 0.5, 0.5);
      vec3 c = vec3(1.0, 1.0, 1.0);
      vec3 d = vec3(0.263, 0.416, 0.557);
      return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
      vec2 uv = vUv * 2.0 - 1.0;
      vec2 uv0 = uv;
      vec3 finalColor = vec3(0.0);
      
      for (float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * 1.5) - 0.5;

          float d = length(uv) * exp(-length(uv0));

          vec3 col = palette(length(uv0) + i*.4 + uTime*.4);

          d = sin(d*8. + uTime)/8.;
          d = abs(d);

          d = pow(0.01 / d, 1.2);

          finalColor += col * d;
      }
      
      // Integrate mouse interactivity
      float mouseDist = length(vUv - uMouse);
      float glow = smoothstep(0.5, 0.0, mouseDist);
      finalColor += glow * vec3(0.2, 0.1, 0.4) * 0.5;

      gl_FragColor = vec4(finalColor * 0.15, 1.0);
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
        }),
        []
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
