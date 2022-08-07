import type { VoxelData } from "Meta/index";
export declare const VoxelHelper: {
    substanceMap: Record<string, number>;
    substanceRules: Record<string, boolean>;
    ruleMap: Record<number, boolean>;
    $INIT(): void;
    substanceRuleCheck(voxel: VoxelData, neightborVoxel: VoxelData): boolean;
};
