import type { VoxelData } from "Meta/index";
export declare const VoxelHelper: {
    substanceRules: Record<string, boolean>;
    substanceRuleCheck(voxel: VoxelData, neightborVoxel: VoxelData): boolean;
};
