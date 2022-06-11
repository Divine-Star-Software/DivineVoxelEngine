import type { VoxelProcessData } from "Meta/Voxels/Voxel.types";
import type { Processor } from "../Processor.js";
export declare function CalculateVoxelLightO(this: typeof Processor, data: VoxelProcessData, tx: number, ty: number, tz: number): void;
export declare function VoxelLightMixCalcO(this: typeof Processor, voxelLigtValue: number, x: number, y: number, z: number, checkSet: number[], vertex: 1 | 2 | 3 | 4): number;
