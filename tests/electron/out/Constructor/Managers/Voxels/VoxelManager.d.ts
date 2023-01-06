import { VoxelConstructor } from "../../../Meta/Constructor/Voxel.types.js";
import type { VoxelHooks } from "Meta/Data/Voxels/Voxel.types";
export declare const VoxelManager: {
    voxelObjects: Record<string, VoxelConstructor>;
    getVoxel(id: string): VoxelConstructor;
    registerVoxel(voxel: VoxelConstructor): void;
    runVoxelHookForAll(hook: VoxelHooks): void;
    removeVoxelHookForAll(hook: VoxelHooks): void;
};
