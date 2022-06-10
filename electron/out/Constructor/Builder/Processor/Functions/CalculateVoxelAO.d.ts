import type { VoxelData, VoxelProcessData } from "Meta/Voxels/Voxel.types";
import type { ChunkProcessor } from "../ChunkProcessor.js";
export declare function CalculateVoxelAO(this: typeof ChunkProcessor, data: VoxelProcessData, voxelData: VoxelData, tx: number, ty: number, tz: number): void;
export declare function voxelAOCalc(this: typeof ChunkProcessor, voxelData: VoxelData, tx: number, ty: number, tz: number, checkSet: number[], vertex: 1 | 2 | 3 | 4): void;
