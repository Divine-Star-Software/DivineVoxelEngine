import type { VoxelInteface } from "Meta/World/Voxels/Voxel.types.js";
import type { WorldData } from "World/WorldData/WorldData";
export declare function ChunkOcculsionCalcuation(worldData: WorldData, voxel: VoxelInteface, chunkX: number, chunkY: number, chunkZ: number, voxelX: number, voxelY: number, voxelZ: number, x: number, y: number, z: number): 1 | 0.75;
export declare function BuildAmbientOcclusion(worldData: WorldData, voxel: VoxelInteface, amientOcculusionTemplate: number[], chunkX: number, chunkY: number, chunkZ: number, x: number, y: number, z: number, face: "top" | "bottom" | "north" | "east" | "west" | "south"): void;
