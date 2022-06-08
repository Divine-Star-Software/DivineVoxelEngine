import { VoxelHooks, VoxelData } from "Meta/Voxels/Voxel.types";
export declare const VoxelManager: {
    voxels: Record<string, VoxelData>;
    shapeMap: Record<string, number>;
    shapeMapHasBeenSet: boolean;
    fluidShapeMap: Record<string, number>;
    fluidShapeMapHasBeenSet: boolean;
    getVoxel(id: string): VoxelData;
    registerVoxelData(voxel: VoxelData): void;
    runVoxelHookForAll(hook: VoxelHooks): void;
};
