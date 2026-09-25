"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const SF = { lat: 37.77, lon: -122.42 };

function toVec(lat: number, lon: number, r: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

function Dots() {
  const geo = useMemo(() => {
    const n = 2600;
    const pos = new Float32Array(n * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      pos.set([Math.cos(t) * r, y, Math.sin(t) * r], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  return (
    <points geometry={geo}>
      <pointsMaterial color="#9ba1ab" size={0.012} sizeAttenuation transparent opacity={0.75} fog />
    </points>
  );
}

function Rings() {
  // A few latitude rings, drawn as thin lines, for structure.
  const lines = useMemo(() => {
    return [-60, -30, 0, 30, 60].map((lat) => {
      const pts: THREE.Vector3[] = [];
      for (let lon = -180; lon <= 180; lon += 3) pts.push(toVec(lat, lon, 1.001));
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      return new THREE.Line(g, new THREE.LineBasicMaterial({ color: "#363739", transparent: true, opacity: 0.8, fog: true }));
    });
  }, []);
  return (
    <>
      {lines.map((l, i) => (
        <primitive key={i} object={l} />
      ))}
    </>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null);
  const sf = useMemo(() => toVec(SF.lat, SF.lon, 1.004), []);
  const base = useMemo(() => -Math.atan2(sf.x, sf.z) + 0.35, [sf]);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    pointer.current.x += (state.pointer.x - pointer.current.x) * Math.min(1, dt * 2);
    pointer.current.y += (state.pointer.y - pointer.current.y) * Math.min(1, dt * 2);
    g.rotation.y = base + Math.sin(t * 0.12) * 0.35 + pointer.current.x * 0.25;
    g.rotation.x = 0.32 - pointer.current.y * 0.12;
  });

  return (
    <group ref={group}>
      <Dots />
      <Rings />
      <mesh position={sf}>
        <sphereGeometry args={[0.022, 16, 16]} />
        <meshBasicMaterial color="#3fff6c" />
      </mesh>
      <mesh position={sf} scale={2.6}>
        <sphereGeometry args={[0.022, 16, 16]} />
        <meshBasicMaterial color="#3fff6c" transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

export default function Globe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.1], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      aria-hidden
    >
      <fog attach="fog" args={["#0e0f13", 2.3, 3.9]} />
      <Scene />
    </Canvas>
  );
}
