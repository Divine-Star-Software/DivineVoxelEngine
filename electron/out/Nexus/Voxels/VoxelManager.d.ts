import { VoxelData } from "Meta/index";
export declare const VoxelManager: {
    voxelData: Record<string, VoxelData>;
    getVoxelData(id: string): VoxelData;
    registerVoxelData(data: VoxelData): void;
};
