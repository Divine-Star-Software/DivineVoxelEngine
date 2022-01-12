import type { Util } from "Global/Util.helper.js";
import { Chunk } from "Meta/WorldData/World.types.js";
import { BuilderManager } from "../BuilderManager.js";
import type { ChunkProcessor } from "../Chunks/ChunkProcessor.js";
export declare class WorldData {
    private builderManager;
    private UTIL;
    renderDistance: number;
    private chunkProccesor;
    chunks: Record<number, Record<number, Chunk>>;
    constructor(builderManager: BuilderManager, UTIL: Util);
    setChunkProcessor(chunkProccesor: ChunkProcessor): void;
    getChunk(chunkX: number, chunkZ: number): Chunk | false;
    removeChunk(chunkX: number, chunkZ: number): void;
    setChunk(chunkX: number, chunkZ: number, chunk: Chunk): void;
    requestBlockAdd(chunkX: number, chunkZ: number, x: number, y: number, z: number, blockId?: number): false | Chunk;
    _checkNearbyChunksToRebuild(chunkX: number, chunkZ: number, relativeX: number, relativeZ: number): void;
    _getRelativeChunkPosition(chunkX: number, chunkZ: number, x: number, y: number, z: number): number[];
    requestBlockRemove(chunkX: number, chunkZ: number, x: number, y: number, z: number, blockId?: number): false | Chunk;
}
