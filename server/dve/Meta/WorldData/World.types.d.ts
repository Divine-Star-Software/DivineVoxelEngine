import { ChunkData } from "Meta/Chunks/Chunk.types";
export declare type WorldRegion = {
    palette?: {
        count: number;
        record: Record<number, string>;
        map: Record<string, number>;
    };
    chunks: Record<string, ChunkData>;
};
export declare type VoxelPalette = Record<number, string>;
