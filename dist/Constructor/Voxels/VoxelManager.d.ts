import type { VoxelHooks, VoxelConstructorObject, VoxelData } from "Meta/Voxels/Voxel.types";
export declare const VoxelManager: {
    voxelObjects: Record<string, VoxelConstructorObject>;
    setShapeMap(shapeMap: Record<string, number>): void;
    getVoxel(id: string): VoxelConstructorObject;
    getVoxelData(id: string): VoxelData;
    registerVoxel(voxel: VoxelConstructorObject): void;
    runVoxelHookForAll(hook: VoxelHooks): void;
};
