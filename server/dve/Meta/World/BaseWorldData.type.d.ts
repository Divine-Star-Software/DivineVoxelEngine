import { VoxelSubstanceType } from "Meta/Voxels/Voxel.types";
/**# BaseWorldData
 * ---
 * This is the data that is registered in the world thread but needs to be also
 * sent to other threads.
 *
 * I.E texture paths and animtions
 */
export declare type BaseWorldData = {
    textureAnimations: Record<VoxelSubstanceType, number[][]>;
    textureAnimationTimes: Record<VoxelSubstanceType, number[][]>;
    texturePaths: Record<VoxelSubstanceType, string[]>;
};
