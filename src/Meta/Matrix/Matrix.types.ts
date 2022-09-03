import type { WorldRegionPalette } from "Meta/World/WorldData/World.types";

export type MatrixLoadedChunk = {
 chunkStates: Uint8Array;   
 data: DataView;
};
export type MatrixLoadedRegion = Record<
 string,
 {
  palette?: WorldRegionPalette;
  chunks: Record<string, Record<string, MatrixLoadedChunk>>;
 }
>;

export type MatrixRegionData = {
 threadsLoadedIn: Record<string, boolean>;
 chunks: MatrixChunkData;
};

export type WorldThreadMatrixRegionData = {
    threadsLoadedIn: Record<string, boolean>;
    chunks: Record<string,{
        chunkStates:  Uint8Array,
        chunkStatesSAB: SharedArrayBuffer  
    }>;
   };

export type MatrixChunkData = Record<
 string,
 {
  chunkStates: Uint8Array;
  chunkStatesSAB: SharedArrayBuffer;
  voxelsSAB: SharedArrayBuffer;
  voxelsStatesSAB: SharedArrayBuffer;
  minMaxMapSAB: SharedArrayBuffer;
  heightMapSAB: SharedArrayBuffer;
 }
>;

export type MatrixVoxelData = {
 substance: number;
 shapeId: number;
 hardness: number;
 material: number;
 checkCollision: number;
 colliderId: number;
 lightSource: number;
 lightValue: number;
};
