export type PositionMatrix = { x: number; y: number; z: number };

export type DirectionNames =
 | "top"
 | "bottom"
 | "west"
 | "east"
 | "north"
 | "south";

export type MeshData = {
 positions: number[];
 indices: number[];
 colors: number[];
 uvs: number[];
};
