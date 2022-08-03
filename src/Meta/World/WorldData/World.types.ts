import { ChunkData, RichChunk } from "Meta/World/WorldData/Chunk.types";

export type WorldRegion = {
 chunks: Record<string, Record<string, ChunkData>>;
};

export type RichWorldRegion = {
 chunks: Record<string, Record<string, RichChunk>>;
};

export type WorldRegionPalette = {
 count: number;
 record: Record<string, string[]>;
 map: Record<string, number>;
 palette: Record<number, string>;
};

export type VoxelPalette = Record<number, string>;
