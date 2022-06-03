import type { WorldRegionPalette } from "Meta/World/WorldData/World.types";
export declare type MatrixLoadedChunk = {
    voxels: Uint32Array;
    voxelStates: Uint32Array;
    heightMap: Uint32Array;
    minMaxMap: Uint32Array;
    chunkStates: Uint8Array;
    position: number[];
};
export declare type MatrixLoadedRegion = Record<string, {
    palette?: WorldRegionPalette;
    chunks: Record<string, Record<string, MatrixLoadedChunk>>;
}>;
export declare type MatrixRegionData = {
    threadsLoadedIn: Record<string, boolean>;
    chunks: MatrixChunkData;
};
export declare type MatrixChunkData = Record<string, {
    chunkStates: Uint8Array;
    chunkStatesSAB: SharedArrayBuffer;
    voxelsSAB: SharedArrayBuffer;
    voxelsStatesSAB: SharedArrayBuffer;
    minMaxMapSAB: SharedArrayBuffer;
    heightMapSAB: SharedArrayBuffer;
}>;
