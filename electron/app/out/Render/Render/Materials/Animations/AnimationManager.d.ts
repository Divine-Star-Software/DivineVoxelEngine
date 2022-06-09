/// <reference types="babylonjs" />
import { VoxelSubstanceType } from "Meta/Voxels/Voxel.types";
export declare const AnimationManager: {
    animatedMaterials: Record<VoxelSubstanceType, BABYLON.ShaderMaterial>;
    animCount: number;
    animations: {
        uniformShaderId: string;
        keys: number[];
        currentFrame: number;
        currentCount: number;
        keyCounts: number[];
        substance: VoxelSubstanceType;
    }[];
    /**# Register Animations
     * ---
     * Given the data from the texture creator it will generate
     * the needed shader code for each material.
     * It will also add the all animations into its anim que.
     * @param voxelSubstanceType
     * @param animations
     * @returns
     */
    registerAnimations(voxelSubstanceType: VoxelSubstanceType, animations: number[][], animationTimes: number[][]): {
        uniforms: string[];
        uniformRegisterCode: string;
        animationFunctionCode: string;
    };
    registerMaterial(voxelSubstanceType: VoxelSubstanceType, material: BABYLON.ShaderMaterial): void;
    startAnimations(): void;
};
