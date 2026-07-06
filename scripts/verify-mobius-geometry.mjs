import assert from "node:assert/strict";
import { generateMobiusDotGeometry } from "../components/r3f-craft/mobius-geometry.mjs";

// Contract for a genuine THREE-EDGED Möbius: a triangular-cross-section tube
// (three real edges) twisted so it closes seamlessly, art-directed vertical.
// This is deliberately stricter than a flat ribbon with three painted lines —
// the key discriminator is the non-collinear-triangle test below, which a flat
// strip (rails at v=-1,0,+1) can never satisfy.

const DOT_COUNT = 10_800;
const MAJOR = 450;
const geometry = generateMobiusDotGeometry({
  majorSegments: MAJOR,
  faceSamples: 7,
  edgeSegments: 3,
});

assert.equal(geometry.count, DOT_COUNT, "expected dense dot count from 3 faces + 3 edge rails");
assert.equal(geometry.positions.length, DOT_COUNT * 3, "positions should be xyz triples");
assert.equal(geometry.intensities.length, DOT_COUNT, "one intensity per dot");
assert.equal(geometry.sizes.length, DOT_COUNT, "one point size per dot");
assert.equal(geometry.edgeMix.length, DOT_COUNT, "one edge mix value per dot");
assert.equal(geometry.strata.length, DOT_COUNT, "one stratum id per dot");
assert.equal(geometry.edgeRailCount, MAJOR * 3, "three vertex rails run the whole loop");
assert.equal(typeof geometry.edgeRailStart, "number", "generator must expose the edge-rail block offset");

let minX = Infinity, maxX = -Infinity;
let minY = Infinity, maxY = -Infinity;
let minZ = Infinity, maxZ = -Infinity;
let minSize = Infinity, maxSize = -Infinity;
let minIntensity = Infinity, maxIntensity = -Infinity;
let brightEdgeDots = 0;
const strata = new Set();

for (let i = 0; i < geometry.count; i += 1) {
  const x = geometry.positions[i * 3];
  const y = geometry.positions[i * 3 + 1];
  const z = geometry.positions[i * 3 + 2];
  assert.ok(Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z), "positions must be finite");
  minX = Math.min(minX, x); maxX = Math.max(maxX, x);
  minY = Math.min(minY, y); maxY = Math.max(maxY, y);
  minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z);

  const size = geometry.sizes[i];
  const intensity = geometry.intensities[i];
  assert.ok(size > 0, "dot sizes must be positive");
  assert.ok(intensity >= 0 && intensity <= 1.35, "intensity should stay bounded for shader use");
  minSize = Math.min(minSize, size); maxSize = Math.max(maxSize, size);
  minIntensity = Math.min(minIntensity, intensity); maxIntensity = Math.max(maxIntensity, intensity);

  if (geometry.edgeMix[i] > 0.9 && intensity > 0.8) brightEdgeDots += 1;
  strata.add(geometry.strata[i]);
}

const xSpan = maxX - minX;
const ySpan = maxY - minY;
const zSpan = maxZ - minZ;

assert.ok(ySpan > xSpan, "shape must be vertically oriented (Y span dominates X)");
assert.ok(ySpan > zSpan, "vertical span must dominate depth");
assert.ok(zSpan > 0.5, "a real triangular tube must have genuine depth (not a flat ribbon)");
assert.ok(maxSize / minSize >= 1.8, "varying thickness must be visible through point sizes");
assert.ok(maxIntensity - minIntensity > 0.45, "luxury/dulled surface needs meaningful brightness variation");
assert.ok(brightEdgeDots >= 1200, "three edges should visibly pop as brighter rails");
assert.deepEqual([...strata].sort((a, b) => a - b), [0, 1, 2], "geometry must expose exactly three edge strata");

// --- The discriminator: the three edges must form a REAL triangle per slice. ---
// For each u-slice, take the three vertex-rail dots and measure the area of the
// triangle they span in 3D. A flat ribbon puts all three on a line (area ~0);
// a triangular tube gives substantial area. We require the MEDIAN slice area to
// clear a threshold so three painted lines on a flat strip cannot pass.
function triArea(ax, ay, az, bx, by, bz, cx, cy, cz) {
  const ux = bx - ax, uy = by - ay, uz = bz - az;
  const vx = cx - ax, vy = cy - ay, vz = cz - az;
  const px = uy * vz - uz * vy;
  const py = uz * vx - ux * vz;
  const pz = ux * vy - uy * vx;
  return 0.5 * Math.hypot(px, py, pz);
}

const areas = [];
for (let i = 0; i < MAJOR; i += 1) {
  const base = (geometry.edgeRailStart + i * 3) * 3;
  areas.push(
    triArea(
      geometry.positions[base], geometry.positions[base + 1], geometry.positions[base + 2],
      geometry.positions[base + 3], geometry.positions[base + 4], geometry.positions[base + 5],
      geometry.positions[base + 6], geometry.positions[base + 7], geometry.positions[base + 8],
    ),
  );
}
areas.sort((a, b) => a - b);
const medianArea = areas[Math.floor(areas.length / 2)];
const minArea = areas[0];
assert.ok(medianArea > 0.05, `three edges must form a real (non-collinear) triangle, median area=${medianArea.toFixed(4)}`);
assert.ok(minArea > 0.005, `no slice may collapse the three edges to a line, min area=${minArea.toFixed(4)}`);

console.log(JSON.stringify({
  ok: true,
  count: geometry.count,
  edgeRailCount: geometry.edgeRailCount,
  bounds: { minX, maxX, minY, maxY, minZ, maxZ },
  spans: { x: +xSpan.toFixed(3), y: +ySpan.toFixed(3), z: +zSpan.toFixed(3) },
  sizeRange: [minSize, maxSize],
  intensityRange: [minIntensity, maxIntensity],
  brightEdgeDots,
  triangleArea: { median: +medianArea.toFixed(4), min: +minArea.toFixed(4) },
}, null, 2));
