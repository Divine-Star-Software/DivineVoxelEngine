import { VoxelData } from "Meta/index";
export declare const VoxelManager: {
    voxelData: Record<string, VoxelData>;
    _onRegister: (data: VoxelData) => void;
    getVoxelData(id: string): VoxelData;
    registerVoxelData(data: VoxelData): void;
    onRegister(func: (data: VoxelData) => void): void;
};
