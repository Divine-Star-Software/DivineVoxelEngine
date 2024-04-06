import { DirectionNames } from "@divinevoxel/core/Types";
import { CustomVertexData, TextureRotations } from "./Geometry.types";

export type UVData = [
 rotation: TextureRotations,
 ws: number,
 we: number,
 hs: number,
 he: number
];
export type QuadVertexDataArray  =[v1 : number, v2 : number, v3 : number, v4:number]
export type QuadData = [
 direction: DirectionNames,
 dimensions: [width: number, height: number],
 position: [x: number, y: number, z: number],
 AO: QuadVertexDataArray,
 light: QuadVertexDataArray,
 uvs: UVData,
 flip: number
];
export type BuilderData = QuadData[][];
