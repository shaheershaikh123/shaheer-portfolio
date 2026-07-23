"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";

// The morphing core + a wireframe cage around it. Monochrome to match the site.
function Core({ pointer }) {
  const solid = useRef();
  const cage = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const px = pointer.current.x;
    const py = pointer.current.y;
    if (solid.current) {
      // ease rotation toward the pointer for a "follow the mouse" feel
      solid.current.rotation.y += delta * 0.25;
      solid.current.rotation.x += (py * 0.5 - solid.current.rotation.x) * 0.05;
      solid.current.rotation.z += (px * 0.4 - solid.current.rotation.z) * 0.05;
    }
    if (cage.current) {
      cage.current.rotation.y -= delta * 0.12;
      cage.current.rotation.x = Math.sin(t * 0.2) * 0.25;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.1}>
      {/* morphing solid core */}
      <mesh ref={solid}>
        <icosahedronGeometry args={[1.35, 8]} />
        <MeshDistortMaterial
          color="#1a1a1a"
          roughness={0.1}
          metalness={0.95}
          distort={0.4}
          speed={1.8}
          envMapIntensity={1.2}
        />
      </mesh>
      {/* glowing wireframe cage */}
      <mesh ref={cage} scale={1.72}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshBasicMaterial wireframe color="#ffffff" transparent opacity={0.16} />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 4.6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none", background: "transparent" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 4, 4]} intensity={2.4} />
      <directionalLight position={[-5, -3, -2]} intensity={0.7} color="#aab6ff" />
      <pointLight position={[0, 0, 3]} intensity={1.2} color="#ffffff" />
      <Core pointer={pointer} />
    </Canvas>
  );
}
