import { CompassDirections, Vec3Array } from "@amodx/math";

export enum VoxelFaces {
  Top,
  Bottom,
  North,
  South,
  East,
  West,
}

export const VoxelFacesArray = Object.freeze([
  VoxelFaces.Top,
  VoxelFaces.Bottom,
  VoxelFaces.North,
  VoxelFaces.South,
  VoxelFaces.East,
  VoxelFaces.West,
]);

export const VoxelFaceDirections: Readonly<Record<VoxelFaces, Vec3Array>> =
  Object.freeze({
    [VoxelFaces.Top]: [0, 1, 0],
    [VoxelFaces.Bottom]: [0, -1, 0],
    [VoxelFaces.North]: [0, 0, 1],
    [VoxelFaces.South]: [0, 0, -1],
    [VoxelFaces.East]: [1, 0, 0],
    [VoxelFaces.West]: [-1, 0, 0],
  });

export const VoxelFaceCompassDirectionMap: Record<
  VoxelFaces,
  CompassDirections
> = {
  [VoxelFaces.Top]: CompassDirections.North,
  [VoxelFaces.Bottom]: CompassDirections.South,
  [VoxelFaces.North]: CompassDirections.North,
  [VoxelFaces.South]: CompassDirections.South,
  [VoxelFaces.East]: CompassDirections.East,
  [VoxelFaces.West]: CompassDirections.West,
};
export const CompassDirectionVoxelFaceMap: Record<
  CompassDirections,
  VoxelFaces
> = {
  [CompassDirections.North]: VoxelFaces.North,
  [CompassDirections.South]: VoxelFaces.South,
  [CompassDirections.West]: VoxelFaces.West,
  [CompassDirections.East]: VoxelFaces.East,
  [CompassDirections.NorthEast]: VoxelFaces.Top,
  [CompassDirections.NorthWest]: VoxelFaces.Top,
  [CompassDirections.SouthEast]: VoxelFaces.Top,
  [CompassDirections.SouthWest]: VoxelFaces.Top,
};
