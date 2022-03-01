import type { Flat3DArray } from "Global/Util/Flat3DArray";
import type { LightByte } from "Global/Util/LightByte";
import type { ChunkData } from "Meta/Chunks/Chunk.types";
import type { ChunkBound } from "Meta/World/ChunkBound.interface";
import type { ChunkBounds } from "World/Chunks/ChunkBounds";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";
export declare class ChunkDataHelper implements ChunkBound {
    DVEW: DivineVoxelEngineWorld;
    lightByte: LightByte;
    _3dArray: Flat3DArray;
    chunkBounds: ChunkBounds;
    constructor(DVEW: DivineVoxelEngineWorld);
    syncChunkBounds(): void;
    fillWithAir(chunk: ChunkData): void;
    createHeightMap(chunk: ChunkData, chunkX: number, chunkY: number, chunkZ: number): void;
}
