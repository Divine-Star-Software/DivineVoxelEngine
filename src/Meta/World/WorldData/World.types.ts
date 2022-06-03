import { ChunkData } from "Meta/Chunks/Chunk.types";

export type WorldRegion = {
 palette?: WorldRegionPalette;
 chunks: Record<string,Record<string, ChunkData>>;
};

export type WorldRegionPalette =  {
    count: number;
    record: Record<string, string[]>;
    map: Record<string, number>;
    palette : Record<number,string>;
   };

export type VoxelPalette = Record<number, string>;
