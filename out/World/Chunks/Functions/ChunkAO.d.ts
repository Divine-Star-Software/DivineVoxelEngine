import { VoxelInteface } from "Meta/World/Voxels/Voxel.types.js";
import { VoxelPallet } from "Meta/WorldData/World.types.js";
import { VoxelManager } from "World/Voxels/VoxelManager.js";
import type { WorldData } from "World/WorldData/WorldData";
export declare function ChunkOcculsionCalcuation(worldData: WorldData, voxelManager: VoxelManager, voxel: VoxelInteface, voxelPallet: VoxelPallet, chunk: number[][][], chunkX: number, chunkZ: number, blockX: number, blockY: number, blockZ: number, x: number, y: number, z: number): 1 | 0.75;
export declare function BuildAmbientOcclusion(worldData: WorldData, voxelManager: VoxelManager, voxel: VoxelInteface, voxelPallet: VoxelPallet, chunk: number[][][], amientOcculusionTemplate: number[], chunkX: number, chunkZ: number, x: number, y: number, z: number, face: "top" | "bottom" | "north" | "east" | "west" | "south"): void;
