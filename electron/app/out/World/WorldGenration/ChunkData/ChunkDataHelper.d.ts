import { LightByte } from "Global/Util/LightByte";
import { ChunkData } from "Meta/Chunks/Chunk.types";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";
export declare class ChunkDataHelper {
    DVEW: DivineVoxelEngineWorld;
    lightByte: LightByte;
    constructor(DVEW: DivineVoxelEngineWorld);
    fillWithAir(chunk: ChunkData): void;
    createHeightMap(chunk: ChunkData, chunkX: number, chunkY: number, chunkZ: number): void;
}
