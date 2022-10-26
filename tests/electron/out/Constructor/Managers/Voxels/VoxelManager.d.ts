import type { VoxelHooks, VoxelConstructorObject } from "Meta/Data/Voxels/Voxel.types";
export declare const VoxelManager: {
    voxelObjects: Record<string, VoxelConstructorObject>;
    syncShapeData(): Generator<never, void, unknown>;
    getVoxel(id: string): VoxelConstructorObject;
    registerVoxel(voxel: VoxelConstructorObject): void;
    runVoxelHookForAll(hook: VoxelHooks): void;
    removeVoxelHookForAll(hook: VoxelHooks): void;
};
