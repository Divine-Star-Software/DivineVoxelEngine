import type { Vec2Array, Vec3Array } from "@amodx/math";
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
