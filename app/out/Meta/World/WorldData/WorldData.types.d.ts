import { Chunk } from "Meta/WorldData/World.types";
export interface WorldDataInterface {
    chunks: Record<number, Record<number, Chunk>>;
    setChunk(chunkX: number, chunkZ: number, chunk: Chunk): void;
    removeChunk(chunkX: number, chunkZ: number, chunk: Chunk): void;
}
