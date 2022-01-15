import { VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types";

export type BaseWorldData = {
 textureAnimations: Record<VoxelSubstanceType, number[][]>;
 textureAnimationTimes: Record<VoxelSubstanceType, number[][]>;
 texturePaths: Record<VoxelSubstanceType, string[]>;
};
