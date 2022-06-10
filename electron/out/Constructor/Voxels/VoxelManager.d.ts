import type { VoxelHooks, VoxelBuilderThreadObject, VoxelData } from "Meta/Voxels/Voxel.types";
export declare const VoxelManager: {
    voxelObjects: Record<string, VoxelBuilderThreadObject>;
    setShapeMap(shapeMap: Record<string, number>): void;
    getVoxel(id: string): VoxelBuilderThreadObject;
    getVoxelData(id: string): VoxelData;
    registerVoxel(voxel: VoxelBuilderThreadObject): void;
    runVoxelHookForAll(hook: VoxelHooks): void;
};
