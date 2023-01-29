import type { VoxelSubstanceType } from "Meta/index";
export declare const SubstanceRules: {
    rules: Map<string, Map<string, boolean>>;
    registerSubstance(id: string, substanceCulls?: string[]): void;
    $INIT(): void;
    exposedCheck(subject: VoxelSubstanceType, neightborVoxel: VoxelSubstanceType): boolean;
};
