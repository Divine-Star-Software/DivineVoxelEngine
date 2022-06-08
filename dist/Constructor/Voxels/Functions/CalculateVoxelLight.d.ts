import type { VoxelProcessData } from "Meta/Voxels/Voxel.types";
import { VoxelHelper } from "../VoxelHelper.js";
export declare function CalculateVoxelLight(this: typeof VoxelHelper, data: VoxelProcessData, tx: number, ty: number, tz: number): void;
export declare function VoxelLightMixCalc(this: typeof VoxelHelper, voxelLigtValue: number, x: number, y: number, z: number, checkSet: number[], vertex: 1 | 2 | 3 | 4): number;
