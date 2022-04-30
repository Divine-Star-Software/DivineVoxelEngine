import type { VoxelData } from "Meta/Voxels/Voxel.types";
import { VoxelHelper } from "../VoxelHelper.js";
export declare function CalculateVoxelLight(this: VoxelHelper, voxel: VoxelData, voxelData: number, lightTemplate: number[], exposedFaces: number[], chunkX: number, chunkY: number, chunkZ: number, x: number, y: number, z: number): void;
export declare function VoxelLightMixCalc(this: VoxelHelper, voxelLigtValue: number, voxel: VoxelData, chunkX: number, chunkY: number, chunkZ: number, voxelX: number, voxelY: number, voxelZ: number, checkSet: number[]): number;
