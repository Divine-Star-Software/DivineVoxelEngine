import type { VoxelSubstanceType } from "Meta/index";
export declare const SubstanceRules: {
    rules: Map<string, Map<string, boolean>>;
    parents: Map<string, string>;
    registerSubstance(id: string, substanceCulls?: string[], parentId?: string): void;
    $INIT(): void;
    exposedCheck(subject: VoxelSubstanceType, neightborVoxel: VoxelSubstanceType): boolean;
    getSubstanceParent(id: string): string;
};
