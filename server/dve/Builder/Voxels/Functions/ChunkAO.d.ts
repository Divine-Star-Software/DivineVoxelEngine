import type { VoxelData } from "Meta/World/Voxels/Voxel.types.js";
export declare function OcculsionCalcuation(voxel: VoxelData, voxelX: number, voxelY: number, voxelZ: number, x: number, y: number, z: number): 1 | 0.75;
export declare function BuildAmbientOcclusion(voxel: VoxelData, amientOcculusionTemplate: number[], chunkX: number, chunkY: number, chunkZ: number, x: number, y: number, z: number, face: "top" | "bottom" | "north" | "east" | "west" | "south"): void;
