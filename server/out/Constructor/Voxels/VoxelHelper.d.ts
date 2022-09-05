import type { DirectionNames, VoxelConstructorObject } from "Meta/index";
export declare const VoxelHelper: {
    substanceRules: Record<string, boolean>;
    voxelFaceCheck(face: DirectionNames, voxel: VoxelConstructorObject, x: number, y: number, z: number): boolean;
};
