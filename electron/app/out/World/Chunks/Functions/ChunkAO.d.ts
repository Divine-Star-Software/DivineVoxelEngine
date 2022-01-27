import { VoxelInteface } from "Meta/World/Voxels/Voxel.types.js";
import { VoxelPalette } from "Meta/WorldData/World.types.js";
import { VoxelManager } from "World/Voxels/VoxelManager.js";
import type { WorldData } from "World/WorldData/WorldData";
export declare function ChunkOcculsionCalcuation(worldData: WorldData, voxelManager: VoxelManager, voxel: VoxelInteface, voxelPalette: VoxelPalette, chunkX: number, chunkY: number, chunkZ: number, voxelX: number, voxelY: number, voxelZ: number, x: number, y: number, z: number): 1 | 0.75;
export declare function BuildAmbientOcclusion(worldData: WorldData, voxelManager: VoxelManager, voxel: VoxelInteface, voxelPalette: VoxelPalette, amientOcculusionTemplate: number[], chunkX: number, chunkY: number, chunkZ: number, x: number, y: number, z: number, face: "top" | "bottom" | "north" | "east" | "west" | "south"): void;