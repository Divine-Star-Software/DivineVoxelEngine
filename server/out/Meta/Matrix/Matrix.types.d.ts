import type { WorldRegionPalette } from "Meta/World/WorldData/World.types";
export declare type MatrixLoadedChunk = {
    chunkStates: Uint8Array;
    data: DataView;
};
export declare type MatrixLoadedRegion = Record<string, {
    palette?: WorldRegionPalette;
    chunks: Record<string, Record<string, MatrixLoadedChunk>>;
}>;
export declare type MatrixRegionData = {
    threadsLoadedIn: Record<string, boolean>;
    chunks: MatrixChunkData;
};
export declare type WorldThreadMatrixRegionData = {
    threadsLoadedIn: Record<string, boolean>;
    chunks: Record<string, {
        chunkStates: Uint8Array;
        chunkStatesSAB: SharedArrayBuffer;
    }>;
};
export declare type MatrixChunkData = Record<string, {
    chunkStates: Uint8Array;
    chunkStatesSAB: SharedArrayBuffer;
    voxelsSAB: SharedArrayBuffer;
    voxelsStatesSAB: SharedArrayBuffer;
    minMaxMapSAB: SharedArrayBuffer;
    heightMapSAB: SharedArrayBuffer;
}>;
export declare type MatrixVoxelData = {
    substance: number;
    shapeId: number;
    hardness: number;
    material: number;
    checkCollision: number;
    colliderId: number;
    lightSource: number;
    lightValue: number;
};
