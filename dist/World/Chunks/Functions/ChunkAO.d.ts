import type { WorldData } from "World/WorldData/WorldData";
export declare function ChunkOcculsionCalcuation(worldData: WorldData, chunk: number[][][], chunkX: number, chunkZ: number, voxelX: number, voxelY: number, voxelZ: number, x: number, y: number, z: number): 1 | 0.75;
export declare function BuildAmbientOcclusion(worldData: WorldData, chunk: number[][][], amientOcculusionTemplate: number[], chunkX: number, chunkZ: number, x: number, y: number, z: number, face: "top" | "bottom" | "north" | "east" | "west" | "south"): void;
