import { CompassDirections, Vec3Array } from "@amodx/math";

export type VoxelFaceNames =
  | "up"
  | "down"
  | "north"
  | "south"
  | "east"
  | "west";

export const VoxelFaceNameArray: VoxelFaceNames[] = [
  "up",
  "down",
  "north",
  "south",
  "east",
  "west",
];

export const VoxelFaceNameOppoisteRecord: Record<
  VoxelFaceNames,
  VoxelFaceNames
> = {
  up: "down",
  down: "up",
  north: "south",
  south: "north",
  east: "west",
  west: "east",
};

export const VoxelFaceNameDirectionsRecord: Record<VoxelFaceNames, Vec3Array> =
  {
    up: [0, 1, 0],
    down: [0, -1, 0],
    north: [0, 0, 1],
    south: [0, 0, -1],
    east: [1, 0, 0],
    west: [-1, 0, 0],
  };
export enum VoxelFaces {
  Up,
  Down,
  North,
  South,
  East,
  West,
}

export const VoxelFacesArray = Object.freeze([
  VoxelFaces.Up,
  VoxelFaces.Down,
  VoxelFaces.North,
  VoxelFaces.South,
  VoxelFaces.East,
  VoxelFaces.West,
]);

export const VoxelFaceDirections: Readonly<Record<VoxelFaces, Vec3Array>> =
  Object.freeze({
    [VoxelFaces.Up]: [0, 1, 0],
    [VoxelFaces.Down]: [0, -1, 0],
    [VoxelFaces.North]: [0, 0, 1],
    [VoxelFaces.South]: [0, 0, -1],
    [VoxelFaces.East]: [1, 0, 0],
    [VoxelFaces.West]: [-1, 0, 0],
  });

export const VoxelFaceOpositeDirectionMap: Record<VoxelFaces, VoxelFaces> = {
  [VoxelFaces.Up]: VoxelFaces.Down,
  [VoxelFaces.Down]: VoxelFaces.Up,
  [VoxelFaces.North]: VoxelFaces.South,
  [VoxelFaces.South]: VoxelFaces.North,
  [VoxelFaces.East]: VoxelFaces.West,
  [VoxelFaces.West]: VoxelFaces.East,
};

export const VoxelFaceCompassDirectionMap: Record<
  VoxelFaces,
  CompassDirections
> = {
  [VoxelFaces.Up]: CompassDirections.North,
  [VoxelFaces.Down]: CompassDirections.South,
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
  [CompassDirections.NorthEast]: VoxelFaces.Up,
  [CompassDirections.NorthWest]: VoxelFaces.Up,
  [CompassDirections.SouthEast]: VoxelFaces.Up,
  [CompassDirections.SouthWest]: VoxelFaces.Up,
};

export const VoxelFaceNameRecord: Record<VoxelFaceNames, VoxelFaces> = {
  up: VoxelFaces.Up,
  down: VoxelFaces.Down,
  north: VoxelFaces.North,
  south: VoxelFaces.South,
  east: VoxelFaces.East,
  west: VoxelFaces.West,
};
export const VoxelFaceNameMap: Record<VoxelFaces, VoxelFaceNames> = {
  [VoxelFaces.Up]: "up",
  [VoxelFaces.Down]: "down",
  [VoxelFaces.North]: "north",
  [VoxelFaces.South]: "south",
  [VoxelFaces.East]: "east",
  [VoxelFaces.West]: "west",
};
