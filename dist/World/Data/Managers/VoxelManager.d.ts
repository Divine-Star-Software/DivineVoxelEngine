import { VoxelData } from "Meta/index";
export declare const VoxelManager: {
    voxelData: Map<string, VoxelData>;
    getVoxelData(id: string): VoxelData;
    registerVoxelData(data: VoxelData | VoxelData[]): void;
};
