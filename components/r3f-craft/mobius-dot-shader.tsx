"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { generateMobiusDotGeometry } from "./mobius-geometry.mjs";
import { getTheme, useTheme, type Theme } from "@/lib/theme";

/**
 * The shader reads raw hex, not CSS vars, so each accent needs its own three
 * tones. Blue is the hue-shifted match of the greens (edge = the #4c9ef0 accent).
 */
const SHADER_PALETTE: Record<Theme, { deep: string; terminal: string; edge: string }> = {
  default: { deep: "#050d07", terminal: "#37622a", edge: "#a3f04b" },
  blue: { deep: "#05090d", terminal: "#2a4f62", edge: "#4c9ef0" },
};

type MobiusDotGeometry = {
  positions: Float32Array;
  sizes: Float32Array;
  intensities: Float32Array;
  edgeMix: Float32Array;
  strata: Float32Array;
};

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aIntensity;
  attribute float aEdgeMix;
  attribute float aStratum;

  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uPointScale;

  varying float vIntensity;
  varying float vEdgeMix;
  varying float vPulse;
  varying float vDepthShade;

  void main() {
    vec3 displaced = position;
    float railPhase = aStratum * 2.09439510239;
    float pulse = 0.5 + 0.5 * sin(uTime * 0.82 + railPhase + position.y * 2.4 + position.z * 2.2);
    float breath = sin(uTime * 0.34 + position.y * 1.8) * 0.018;

    displaced.xyz += normalize(position.xyz + vec3(0.001)) * breath * (0.35 + aEdgeMix);

    vec4 modelViewPosition = modelViewMatrix * vec4(displaced, 1.0);
    float perspective = clamp(4.8 / -modelViewPosition.z, 0.28, 1.8);
    gl_PointSize = aSize * uPointScale * uPixelRatio * perspective * (0.9 + pulse * 0.16 + aEdgeMix * 0.12);
    gl_Position = projectionMatrix * modelViewPosition;

    vIntensity = aIntensity;
    vEdgeMix = aEdgeMix;
    vPulse = pulse;
    vDepthShade = smoothstep(-0.62, 0.62, position.z);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform vec3 uDeepGreen;
  uniform vec3 uTerminalGreen;
  uniform vec3 uEdgeGreen;
  uniform float uAlpha;
  uniform float uAura;

  varying float vIntensity;
  varying float vEdgeMix;
  varying float vPulse;
  varying float vDepthShade;

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    float disc = smoothstep(0.52, 0.18, dist);
    float core = smoothstep(0.18, 0.0, dist);
    float halo = smoothstep(0.52, 0.26, dist) * 0.44;

    if (disc <= 0.01) discard;

    float signal = clamp(vIntensity * (0.66 + vPulse * 0.16), 0.0, 1.2);
    vec3 body = mix(uDeepGreen, uTerminalGreen, signal);
    // Reserve the electric brand lime for the very tips of the three edges only,
    // so the object reads as dark/dulled luxury with a menacing glint, not neon.
    vec3 rail = mix(uTerminalGreen, uEdgeGreen, 0.30 + vPulse * 0.22);
    vec3 color = mix(body, rail, clamp(vEdgeMix * (0.46 + vPulse * 0.18), 0.0, 1.0));

    // True vertex rails (vEdgeMix ~ 1) get a tight, brighter core so the three
    // edges read distinctly against the darker face dust — sharper falloff, not
    // more glow, keeps it luxury rather than neon.
    float isRail = smoothstep(0.9, 1.0, vEdgeMix);
    color += rail * isRail * core * 0.28;

    // Points deeper in the fold are quieter, so the three rails feel like a
    // luxury object emerging from black rather than a flat neon poster.
    color *= mix(0.52, 0.92, vDepthShade);

    // Dust faces stay sheer so the rails own their negative space; rails stay solid.
    float faceAlpha = disc * 0.4 + core * 0.5;
    float railAlpha = disc * 0.62 + core * 0.82;
    float alpha = (mix(faceAlpha, railAlpha, isRail) + halo * uAura) * uAlpha;
    alpha *= 0.18 + signal * 0.6 + vEdgeMix * 0.22;

    gl_FragColor = vec4(color, alpha);
  }
`;

type StageVariant = "hero" | "background" | "fullscreen";

type VariantConfig = {
  cameraZ: number;
  fov: number;
  pointScale: number;
  alpha: number;
  aura: number;
  objectScale: number;
  rotationSpeed: number;
  tiltX: number;
  tiltZ: number;
};

const VARIANTS: Record<StageVariant, VariantConfig> = {
  hero: {
    cameraZ: 7.1,
    fov: 42,
    pointScale: 8.4,
    alpha: 0.82,
    aura: 0.2,
    objectScale: 0.88,
    rotationSpeed: 0.115,
    tiltX: -0.11,
    tiltZ: -0.045,
  },
  background: {
    cameraZ: 7.6,
    fov: 44,
    pointScale: 6.4,
    alpha: 0.34,
    aura: 0.12,
    objectScale: 0.98,
    rotationSpeed: 0.055,
    tiltX: -0.08,
    tiltZ: -0.05,
  },
  fullscreen: {
    cameraZ: 7.0,
    fov: 39,
    pointScale: 8.9,
    alpha: 0.9,
    aura: 0.24,
    objectScale: 0.9,
    rotationSpeed: 0.105,
    tiltX: -0.12,
    tiltZ: -0.035,
  },
};

function makeBufferGeometry(dotGeometry: MobiusDotGeometry) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(dotGeometry.positions, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(dotGeometry.sizes, 1));
  geometry.setAttribute("aIntensity", new THREE.BufferAttribute(dotGeometry.intensities, 1));
  geometry.setAttribute("aEdgeMix", new THREE.BufferAttribute(dotGeometry.edgeMix, 1));
  geometry.setAttribute("aStratum", new THREE.BufferAttribute(dotGeometry.strata, 1));
  geometry.computeBoundingSphere();
  return geometry;
}

function makeUniforms(config: VariantConfig, theme: Theme) {
  const p = SHADER_PALETTE[theme];
  return {
    uTime: { value: 1.7 },
    uPixelRatio: { value: 1 },
    uPointScale: { value: config.pointScale },
    uAlpha: { value: config.alpha },
    uAura: { value: config.aura },
    // Dark, desaturated Homebrew/terminal tones with normal blending so the
    // body reads as a deep matte material, not accumulated neon. The bright
    // accent is reserved for edge-tip glints only.
    uDeepGreen: { value: new THREE.Color(p.deep) },
    uTerminalGreen: { value: new THREE.Color(p.terminal) },
    uEdgeGreen: { value: new THREE.Color(p.edge) },
  };
}

function MobiusDots({ variant }: { variant: StageVariant }) {
  const reduce = useReducedMotion();
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const config = VARIANTS[variant];

  const theme = useTheme();

  const geometry = useMemo(() => {
    const dots = generateMobiusDotGeometry({
      majorSegments: 450,
      faceSamples: 7,
      edgeSegments: 3,
    });
    return makeBufferGeometry(dots);
  }, []);

  // Seed with the accent already on <html> so the first frame is the right hue.
  const uniforms = useMemo(() => makeUniforms(config, getTheme()), [config]);

  // Live-recolor the tones if the accent flips while this page is open.
  useEffect(() => {
    const u = material.current?.uniforms;
    if (!u) return;
    const p = SHADER_PALETTE[theme];
    u.uDeepGreen.value.set(p.deep);
    u.uTerminalGreen.value.set(p.terminal);
    u.uEdgeGreen.value.set(p.edge);
  }, [theme]);

  useFrame(({ clock, gl }) => {
    const t = reduce ? 2.4 : clock.getElapsedTime();
    if (material.current) {
      material.current.uniforms.uTime.value = t;
      material.current.uniforms.uPixelRatio.value = Math.min(gl.getPixelRatio(), 1.85);
    }

    if (group.current) {
      group.current.rotation.x = config.tiltX + Math.sin(t * 0.28) * 0.028;
      group.current.rotation.y = -0.42 + (reduce ? 0 : t * config.rotationSpeed);
      group.current.rotation.z = config.tiltZ + Math.sin(t * 0.19) * 0.025;
    }
  });

  return (
    <group ref={group} scale={config.objectScale}>
      <points geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          ref={material}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          depthTest
          blending={THREE.NormalBlending}
          toneMapped={false}
        />
      </points>
    </group>
  );
}

function TerminalVignette({ variant }: { variant: StageVariant }) {
  const full = variant === "fullscreen";
  const theme = useTheme();
  const blue = theme === "blue";

  // Ambient glow + scanline tint, matched to the accent (blue is the hue-shift).
  const glow = blue ? "80,160,240" : "120,200,70";
  const glowDeep = blue ? "32,64,100" : "50,84,32";
  const scan = blue ? "76,158,240" : "163,240,75";

  return (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: full
            ? `radial-gradient(circle at 50% 48%, rgba(${glow},0.07), rgba(${glowDeep},0.03) 31%, rgba(0,0,0,0) 56%)`
            : `radial-gradient(circle at 52% 50%, rgba(${glow},0.06), rgba(${glowDeep},0.025) 34%, rgba(0,0,0,0) 62%)`,
          mixBlendMode: "screen",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0) 44%, rgba(0,0,0,0.42) 76%, rgba(0,0,0,0.9) 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(rgba(${scan},0.45) 1px, transparent 1px)`,
          backgroundSize: "100% 5px",
        }}
        aria-hidden
      />
    </>
  );
}

export function MobiusDotShader({
  variant = "hero",
  className = "",
  label = false,
}: {
  variant?: StageVariant;
  className?: string;
  label?: boolean;
}) {
  const config = VARIANTS[variant];
  const reduce = useReducedMotion();
  const hasPositionUtility = /(?:^|\s)(absolute|fixed|relative|sticky)(?:\s|$)/.test(className);

  return (
    <div className={`${hasPositionUtility ? "" : "relative"} isolate overflow-hidden bg-black ${className}`}>
      <Canvas
        camera={{ position: [0, 0, config.cameraZ], fov: config.fov, near: 0.1, far: 80 }}
        dpr={[1, 1.85]}
        frameloop={reduce ? "demand" : "always"}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <MobiusDots variant={variant} />
      </Canvas>
      <TerminalVignette variant={variant} />
      {label ? (
        <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between font-mono text-[10px] text-neon/50 sm:inset-x-6 sm:bottom-5">
          <span>shader://r3f-craft/mobius-dots</span>
          <span>10,800 pts · 3-edge rail</span>
        </div>
      ) : null}
    </div>
  );
}
