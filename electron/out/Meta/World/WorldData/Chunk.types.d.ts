export declare type ChunkVoxels = Uint32Array;
export declare type ChunkData = {
    proto: number;
    isEmpty: boolean;
    voxelsSAB: SharedArrayBuffer;
    voxels: Uint32Array;
    voxelsStatesSAB: SharedArrayBuffer;
    voxelsStates: Uint32Array;
    heightMapSAB: SharedArrayBuffer;
    heightMap: Uint32Array;
    minMaxMapSAB: SharedArrayBuffer;
    minMaxMap: Uint32Array;
    position: number[];
};
export declare type RichChunk = Record<string, any>;
