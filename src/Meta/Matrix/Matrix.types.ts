import type { WorldRegionPalette } from "Meta/World/WorldData/World.types";

export type MatrixLoadedChunk = {
 voxels: Uint32Array;
 voxelStates: Uint32Array;
 heightMap: Uint32Array;
 minMaxMap : Uint32Array;
 chunkStates: Uint8Array;
 position : number[]
};
export type MatrixLoadedRegion = Record<
 string,
 {
  palette?: WorldRegionPalette;
  chunks: Record<string,Record<string, MatrixLoadedChunk>>;
 }
>;

export type MatrixRegionData = {
 threadsLoadedIn: Record<string, boolean>;
 chunks: MatrixChunkData;
};

export type MatrixChunkData = Record<
 string,
 {
  chunkStates: Uint8Array;
  chunkStatesSAB: SharedArrayBuffer;
  voxelsSAB: SharedArrayBuffer;
  voxelsStatesSAB: SharedArrayBuffer;
  minMaxMapSAB : SharedArrayBuffer;
  heightMapSAB: SharedArrayBuffer;
 }
>;
