import type { VoxelProcessData } from "Meta/Voxels/Voxel.types";
import type { Processor } from "../Processor.js";
declare type Vertexes = 1 | 2 | 3 | 4;
export declare function CalculateVoxelLight(this: typeof Processor, data: VoxelProcessData, tx: number, ty: number, tz: number, ignoreAO?: boolean): void;
export declare function VoxelLightMixCalc(this: typeof Processor, x: number, y: number, z: number, checkSet: number[], vertex: Vertexes): void;
export {};
