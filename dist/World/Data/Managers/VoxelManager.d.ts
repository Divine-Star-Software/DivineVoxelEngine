import type { VoxelData } from "../../../Meta/Data/Voxels/Voxel.types";
export declare const VoxelManager: {
    voxelData: Map<string, VoxelData>;
    getVoxelData(id: string): VoxelData;
    registerVoxelData(data: VoxelData | VoxelData[]): void;
};
