import type { VoxelConstructor } from "../../../../Meta/Constructor/Voxel.types.js";
export declare const VoxelManager: {
    voxelObjects: Map<string, VoxelConstructor>;
    getVoxel(id: string): VoxelConstructor;
    registerVoxel(voxel: VoxelConstructor): void;
};
