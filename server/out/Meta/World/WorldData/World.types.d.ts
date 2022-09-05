import { ChunkData, RichChunk } from "Meta/World/WorldData/Chunk.types";
export declare type WorldRegion = {
    chunks: Record<string, Record<string, ChunkData>>;
};
export declare type RichWorldRegion = {
    chunks: Record<string, Record<string, RichChunk>>;
};
export declare type WorldRegionPalette = {
    count: number;
    record: Record<string, string[]>;
    map: Record<string, number>;
    palette: Record<number, string>;
};
export declare type VoxelPalette = Record<number, string>;
