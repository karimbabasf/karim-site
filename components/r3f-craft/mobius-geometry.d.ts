export type MobiusGeometryOptions = {
  majorSegments?: number;
  faceSamples?: number;
  edgeSegments?: 3;
};

export type MobiusDotGeometry = {
  count: number;
  edgeRailCount: number;
  edgeRailStart: number;
  positions: Float32Array;
  sizes: Float32Array;
  intensities: Float32Array;
  edgeMix: Float32Array;
  strata: Float32Array;
  bounds: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    minZ: number;
    maxZ: number;
  };
};

export function generateMobiusDotGeometry(options?: MobiusGeometryOptions): MobiusDotGeometry;
