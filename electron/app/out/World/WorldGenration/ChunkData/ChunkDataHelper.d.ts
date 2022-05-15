import type { Flat3DArray } from "Global/Util/Flat3DArray";
import type { LightByte } from "Global/Util/LightByte";
import type { ChunkData } from "Meta/Chunks/Chunk.types";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";
export declare class ChunkDataHelper {
    DVEW: DivineVoxelEngineWorld;
    lightByte: typeof LightByte;
    _3dArray: typeof Flat3DArray;
    constructor(DVEW: DivineVoxelEngineWorld);
    syncChunkBounds(): void;
    fillWithAir(chunk: ChunkData): void;
    createHeightMap(chunk: ChunkData, chunkX: number, chunkY: number, chunkZ: number): void;
}
