import type { VoxelData } from "Meta/Voxels/Voxel.types";
import { VoxelHelper } from "../VoxelHelper.js";
export declare function CalculateVoxelLight(this: typeof VoxelHelper, voxel: VoxelData, voxelData: number, lightTemplate: number[], exposedFaces: number[], chunkX: number, chunkY: number, chunkZ: number, x: number, y: number, z: number): void;
export declare function VoxelLightMixCalc(this: typeof VoxelHelper, voxelLigtValue: number, x: number, y: number, z: number, checkSet: number[]): number;
