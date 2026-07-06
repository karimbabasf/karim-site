const TAU = Math.PI * 2;
const THIRD = TAU / 3;

function fract(value) {
  return value - Math.floor(value);
}

// Deterministic pseudo-random in [0,1). Stable between Node (tests) and the
// browser so the sculpture never "reshuffles" between renders.
function hash(seed) {
  return fract(Math.sin(seed * 127.1 + 311.7) * 43758.5453123);
}

// ---------------------------------------------------------------------------
// A genuine THREE-EDGED Möbius.
//
// A textbook Möbius strip has exactly ONE edge. The brief asks for "a mobius
// with the strip having 3 edges and varying thickness", so we sweep a TRIANGULAR
// cross-section (three vertices -> three real edges) around a tall vertical loop
// while rotating that triangle by 120° over one turn. Because 120° == one vertex
// of spacing, the cross-section at u = 2π lands exactly on the cross-section at
// u = 0, so the tube CLOSES SEAMLESSLY and the three longitudinal edges braid
// into a single continuous curve that winds three times around the loop — the
// defining Möbius "one-piece" character, carried by three edges instead of one.
//
// Bonus vs a flat ribbon: a triangular tube has extent in all three axes, so it
// never degenerates into a flat blade while rotating — every frame reads as a
// solid 3D object.
// ---------------------------------------------------------------------------

// Tall vertical loop (Y stretched, X compressed) so the silhouette is portrait,
// not a squat donut — this is what makes it "vertical and fit the screen".
const LOOP_RX = 0.95;
const LOOP_RY = 1.5;

// Center of the loop at angle u, in the X-Y plane (camera looks down -Z).
function loopCenter(u) {
  return [Math.cos(u) * LOOP_RX, Math.sin(u) * LOOP_RY, 0];
}

// Unit tangent of the loop; its in-plane normal N1 and the world-Z normal N2
// span the cross-section plane. N2 = (0,0,1) is always perpendicular to the
// tangent because the loop is planar, which keeps the frame stable (no Frenet
// flips) all the way around.
function crossSectionFrame(u) {
  const dx = -Math.sin(u) * LOOP_RX;
  const dy = Math.cos(u) * LOOP_RY;
  const len = Math.hypot(dx, dy) || 1;
  const tx = dx / len;
  const ty = dy / len;
  // N1 = T × Z = (ty, -tx, 0), already unit length.
  return { n1: [ty, -tx, 0], n2: [0, 0, 1] };
}

// Varying thickness: the triangle's circumradius pulses along the loop so the
// tube visibly swells and narrows — the "varying thickness" the brief asks for.
function triRadiusAt(u) {
  return 0.42 * (1 + 0.3 * Math.sin(u * 3 + 0.5) + 0.08 * Math.sin(u * 7 - 1.1));
}

// Offset of triangle angle θ from the loop center, in the cross-section plane.
function triOffset(frame, radius, theta) {
  const c = Math.cos(theta) * radius;
  const s = Math.sin(theta) * radius;
  return [
    c * frame.n1[0] + s * frame.n2[0],
    c * frame.n1[1] + s * frame.n2[1],
    c * frame.n1[2] + s * frame.n2[2],
  ];
}

function writeDot(target, cursor, x, y, z, size, intensity, edgeMix, stratum) {
  const p = cursor * 3;
  target.positions[p] = x;
  target.positions[p + 1] = y;
  target.positions[p + 2] = z;
  target.sizes[cursor] = size;
  target.intensities[cursor] = intensity;
  target.edgeMix[cursor] = edgeMix;
  target.strata[cursor] = stratum;
}

export function generateMobiusDotGeometry(options = {}) {
  const majorSegments = options.majorSegments ?? 450;
  const faceSamples = options.faceSamples ?? 7;
  const edgeSegments = options.edgeSegments ?? 3;

  if (!Number.isInteger(majorSegments) || majorSegments < 24) {
    throw new Error("majorSegments must be an integer >= 24");
  }
  if (!Number.isInteger(faceSamples) || faceSamples < 2) {
    throw new Error("faceSamples must be an integer >= 2");
  }
  if (edgeSegments !== 3) {
    throw new Error("This r3f-craft Mobius is art-directed around exactly 3 triangular edges");
  }

  // Surface dots fill the three prism faces (edgeSegments × faceSamples per
  // slice); the vertex rails add three brighter edge dots per slice. Defaults
  // 450 × (3×7) + 450×3 == 10,800: dense, but light for a single R3F hero.
  const surfacePerSlice = edgeSegments * faceSamples;
  const surfaceCount = majorSegments * surfacePerSlice;
  const edgeRailCount = majorSegments * edgeSegments;
  const count = surfaceCount + edgeRailCount;
  const edgeRailStart = surfaceCount;

  const target = {
    count,
    edgeRailCount,
    edgeRailStart,
    positions: new Float32Array(count * 3),
    sizes: new Float32Array(count),
    intensities: new Float32Array(count),
    edgeMix: new Float32Array(count),
    strata: new Float32Array(count),
    bounds: {
      minX: Infinity,
      maxX: -Infinity,
      minY: Infinity,
      maxY: -Infinity,
      minZ: Infinity,
      maxZ: -Infinity,
    },
  };

  let cursor = 0;

  // --- Faces: sweep the three triangle sides along the loop ---------------
  for (let i = 0; i < majorSegments; i += 1) {
    const u = (i / majorSegments) * TAU;
    const [cx, cy, cz] = loopCenter(u);
    const frame = crossSectionFrame(u);
    const radius = triRadiusAt(u);
    const twist = u / 3; // 120° over one full loop -> seamless close
    const longitudinalPulse = 0.5 + 0.5 * Math.sin(u * 3 + 0.55);

    // Precompute the three vertex offsets for this slice.
    const vOff = [];
    for (let k = 0; k < edgeSegments; k += 1) {
      vOff.push(triOffset(frame, radius, twist + k * THIRD));
    }

    for (let k = 0; k < edgeSegments; k += 1) {
      const a = vOff[k];
      const b = vOff[(k + 1) % edgeSegments];
      for (let s = 0; s < faceSamples; s += 1) {
        // Sample the interior of the side (never the vertices — those are the
        // dedicated bright rails), so faces stay dulled and corners pop.
        const t = (s + 0.5) / faceSamples;
        const ox = a[0] + (b[0] - a[0]) * t;
        const oy = a[1] + (b[1] - a[1]) * t;
        const oz = a[2] + (b[2] - a[2]) * t;
        const x = cx + ox;
        const y = cy + oy;
        const z = cz + oz;

        const seed = i * 97.13 + (k * faceSamples + s) * 31.7;
        const dust = hash(seed + 19.9);
        // Brightness climbs toward the triangle corners (the three edges).
        const edgeMix = Math.max(0, 1 - 2 * Math.min(t, 1 - t));
        const intensity = Math.min(
          1.22,
          0.2 + edgeMix * 0.5 + longitudinalPulse * 0.22 + dust * 0.2,
        );
        const size = 1.12 + edgeMix * 0.7 + longitudinalPulse * 0.5 + dust * 0.42 + (radius - 0.42) * 1.1;

        writeDot(target, cursor, x, y, z, size, intensity, edgeMix, k);
        cursor += 1;
      }
    }
  }

  // --- Edge rails: the three triangle vertices swept along the loop -------
  for (let i = 0; i < majorSegments; i += 1) {
    const u = (i / majorSegments) * TAU;
    const [cx, cy, cz] = loopCenter(u);
    const frame = crossSectionFrame(u);
    const radius = triRadiusAt(u) * 1.01;
    const twist = u / 3;

    for (let k = 0; k < edgeSegments; k += 1) {
      const [ox, oy, oz] = triOffset(frame, radius, twist + k * THIRD);
      const x = cx + ox;
      const y = cy + oy;
      const z = cz + oz;

      const seed = i * 53.17 + k * 271.3;
      const pulse = 0.5 + 0.5 * Math.sin(u * 3 + k * THIRD);
      const size = 2.15 + pulse * 0.82 + hash(seed + 8.1) * 0.35 + (radius - 0.42) * 1.2;
      const intensity = 0.92 + pulse * 0.2 + hash(seed + 3.4) * 0.12;

      writeDot(target, cursor, x, y, z, size, Math.min(1.28, intensity), 1, k);
      cursor += 1;
    }
  }

  for (let i = 0; i < count; i += 1) {
    const x = target.positions[i * 3];
    const y = target.positions[i * 3 + 1];
    const z = target.positions[i * 3 + 2];
    target.bounds.minX = Math.min(target.bounds.minX, x);
    target.bounds.maxX = Math.max(target.bounds.maxX, x);
    target.bounds.minY = Math.min(target.bounds.minY, y);
    target.bounds.maxY = Math.max(target.bounds.maxY, y);
    target.bounds.minZ = Math.min(target.bounds.minZ, z);
    target.bounds.maxZ = Math.max(target.bounds.maxZ, z);
  }

  return target;
}
