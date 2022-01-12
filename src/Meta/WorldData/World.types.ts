
export type ChunkVoxels = any[][][];

export type ChunkData = {
    voxelPallet  ?:  VoxelPallet;
    voxels : ChunkVoxels
}



export type VoxelPallet = Record<number,any[]>;