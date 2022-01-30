import { ChunkData } from "Meta/Chunks/Chunk.types";

export type WorldRegion = {
 palette?: {
  count: number;
  record: Record<number, string>;
  map: Record<string, number>;
 };
 chunks: Record<string, ChunkData>;
};

export type VoxelPalette = Record<number, string>;
