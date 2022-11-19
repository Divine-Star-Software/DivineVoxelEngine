import type { DirectionNames } from "Meta/Util.types";
import type { TextureRotations } from "Meta/Constructor/Geometry/Geometry.types";
declare type VertexData = [number, number, number, number] | [number];
declare type UVData = [
    rotation: TextureRotations,
    ws: number,
    we: number,
    hs: number,
    he: number
];
export declare type QuadData = [
    direction: DirectionNames,
    dimensions: [width: number, height: number],
    position: [x: number, y: number, z: number],
    AO: VertexData,
    light: VertexData,
    uvs: UVData,
    flip: number
];
export declare type BuilderData = QuadData[][];
export declare const StairBuilderData: Record<number, BuilderData>;
export {};
