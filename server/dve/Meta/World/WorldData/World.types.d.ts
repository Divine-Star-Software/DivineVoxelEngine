import { ChunkData } from "Meta/Chunks/Chunk.types";
export declare type WorldRegion = {
    palette?: WorldRegionPalette;
    chunks: Record<string, ChunkData>;
};
export declare type WorldRegionPalette = {
    count: number;
    record: Record<string, string[]>;
    map: Record<string, number>;
    palette: Record<number, string>;
};
export declare type VoxelPalette = Record<number, string>;
