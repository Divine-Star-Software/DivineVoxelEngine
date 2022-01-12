import type { Util } from "Global/Util.helper.js";
import { VoxelManager } from "../Voxels/VoxelManager.js";
import type { WorldData } from "../WorldData/WorldData.js";
import { ChunkOcculsionCalcuation } from "./Functions/ChunkAO.js";
export declare class ChunkProcessor {
    private worldData;
    private voxelManager;
    private UTIL;
    worldBottomY: number;
    worldTopY: number;
    chunkOcculsionCalcuation: typeof ChunkOcculsionCalcuation;
    chunkTemplates: Record<number, Record<number, number[][]>>;
    constructor(worldData: WorldData, voxelManager: VoxelManager, UTIL: Util);
    makeChunkTemplate(chunk: any[][][], chunkX: number, chunkZ: number): number[][];
}
