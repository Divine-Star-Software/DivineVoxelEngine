import { DirectionNames } from "Meta";
import { TextureRotations } from "./Geometry.types";
export declare type UVData = [
    rotation: TextureRotations,
    ws: number,
    we: number,
    hs: number,
    he: number
];
export declare type QuadVertexDataArray = [v1: number, v2: number, v3: number, v4: number];
export declare type QuadData = [
    direction: DirectionNames,
    dimensions: [width: number, height: number],
    position: [x: number, y: number, z: number],
    AO: QuadVertexDataArray,
    light: QuadVertexDataArray,
    uvs: UVData,
    flip: number
];
export declare type BuilderData = QuadData[][];
