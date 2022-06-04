export type Position3Matrix = { x: number; y: number; z: number };
export type Position2Matrix = { x: number; z: number };
export type UV3Matrix = { u: number; v: number; index: number };
export type UV2Matrix = { u: number; v: number };
export type Light4Matrix = { s: number; r: number; g: number; b: number };
export type Light3Matrix = { r: number; g: number; b: number };
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
