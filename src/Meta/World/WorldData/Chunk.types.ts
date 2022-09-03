export type ChunkVoxels = Uint32Array;

export type ChunkData = {
 buffer : SharedArrayBuffer,
 data : DataView
};



export type RichChunk = Record<string, any>;