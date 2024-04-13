import { Position3Matrix, Vec2Array, Vec3Array } from "@divinevoxel/core/Math";
export type QuadVertexVec3Data = [Vec3Array, Vec3Array, Vec3Array, Vec3Array];
export type QuadVertexFloatData = [number, number, number, number];
export type QuadUVData = [Vec2Array, Vec2Array, Vec2Array, Vec2Array];

export enum QuadVerticies {
  TopRight = 1,
  TopLeft = 2,
  BottomLeft = 3,
  BottomRight = 4,
}
