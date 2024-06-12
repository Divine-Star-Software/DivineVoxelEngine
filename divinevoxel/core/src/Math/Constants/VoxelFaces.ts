import { Vec3Array } from "Math/Math.types";

export enum VoxelFaces {
  Top,
  Bottom,
  North,
  South,
  East,
  West,
}

export const VoxelFaceDirections: Record<VoxelFaces, Vec3Array> = {
  [VoxelFaces.Top]: [0, 1, 0],
  [VoxelFaces.Bottom]: [0, -1, 0],
  [VoxelFaces.North]: [0, 0, 1],
  [VoxelFaces.South]: [0, 0, -1],
  [VoxelFaces.East]: [1, 0, 0],
  [VoxelFaces.West]: [-1, 0, 0],
};
