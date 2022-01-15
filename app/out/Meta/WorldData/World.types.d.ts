export declare type ChunkVoxels = any[][][];
export declare type ChunkData = {
    voxelPallet?: VoxelPallet;
    voxels: ChunkVoxels;
};
export declare type VoxelPallet = Record<number, any[]>;
