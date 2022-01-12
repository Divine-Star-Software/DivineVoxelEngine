import { DirectionNames } from "Meta/Util.types";
import { ChunkData, ChunkVoxels } from "Meta/WorldData/World.types";

export interface WorldDataInterface {
 chunks: Record<number, Record<number, ChunkData>>;
 setChunk(chunkX: number, chunkZ: number, chunk: ChunkData): void;
 removeChunk(chunkX: number, chunkZ: number, chunk: ChunkData): void;
}
