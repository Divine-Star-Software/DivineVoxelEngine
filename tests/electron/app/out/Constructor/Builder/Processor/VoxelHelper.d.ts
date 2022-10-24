import type { VoxelSubstanceType } from "Meta/index";
export declare const VoxelHelper: {
    substanceMap: Record<VoxelSubstanceType, number>;
    substanceRules: Record<string, boolean>;
    ruleMap: Record<number, boolean>;
    $INIT(): void;
    substanceRuleCheck(voxel: VoxelSubstanceType, neightborVoxel: VoxelSubstanceType): boolean;
};
