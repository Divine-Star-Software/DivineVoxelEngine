import type { Vec2Array, Vec3Array } from "@amodx/math";
export interface VoxelGeometryTransform {
  position?: Vec3Array;
  scale?: Vec3Array;
  rotation?: Vec3Array;
  rotationPivot?: Vec3Array;
  lockUVs?: true;
  flip?: [flipX: 0 | 1, flipY: 0 | 1, flipZ: 0 | 1];
}

export type QuadVertexVec3Data = [Vec3Array, Vec3Array, Vec3Array, Vec3Array];
export type QuadVertexFloatData = [number, number, number, number];
export type QuadUVData = [Vec2Array, Vec2Array, Vec2Array, Vec2Array];

export enum QuadVerticies {
  TopRight,
  TopLeft,
  BottomLeft,
  BottomRight,
}

export const QuadVerticiesArray: QuadVerticies[] = [
  QuadVerticies.TopRight,
  QuadVerticies.TopLeft,
  QuadVerticies.BottomLeft,
  QuadVerticies.BottomRight,
];
export enum TriangleVerticies {
  One,
  Two,
  Three,
}

export const TriangleVerticiesArray: TriangleVerticies[] = [
  TriangleVerticies.One,
  TriangleVerticies.Two,
  TriangleVerticies.Three,
];
