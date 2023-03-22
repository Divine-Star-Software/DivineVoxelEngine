import { DirectionNames } from "Meta";
import { CustomVertexData, TextureRotations } from "./Geometry.types";

export type UVData = [
 rotation: TextureRotations,
 ws: number,
 we: number,
 hs: number,
 he: number
];
export type QuadData = [
 direction: DirectionNames,
 dimensions: [width: number, height: number],
 position: [x: number, y: number, z: number],
 AO: CustomVertexData,
 light: CustomVertexData,
 uvs: UVData,
 flip: number
];
export type BuilderData = QuadData[][];
