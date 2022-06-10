import type { DirectionNames, VoxelBuilderThreadObject } from "Meta/index";
export declare const VoxelHelper: {
    substanceRules: Record<string, boolean>;
    voxelFaceCheck(face: DirectionNames, voxel: VoxelBuilderThreadObject, x: number, y: number, z: number): boolean;
};
