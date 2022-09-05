import { Processor } from "../Processor.js";
import { VoxelProcessData } from "Meta/Constructor/Voxel.types.js";
import { DirectionNames } from "Meta/Util.types.js";
declare type Vertexes = 1 | 2 | 3 | 4;
export declare function CalculateVoxelLight(this: typeof Processor, data: VoxelProcessData, tx: number, ty: number, tz: number, ignoreAO?: boolean, LOD?: number): void;
export declare function VoxelLightMixCalc(this: typeof Processor, face: DirectionNames, x: number, y: number, z: number, checkSet: number[], vertex: Vertexes, LOD?: number): void;
export {};
