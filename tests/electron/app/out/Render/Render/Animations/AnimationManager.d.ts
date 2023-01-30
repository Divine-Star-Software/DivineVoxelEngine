/// <reference types="babylonjs" />
import { ShaderDataTypes } from "Libs/Shaders/Types/ShaderData.types";
import { VoxelSubstanceType } from "Meta/Data/Voxels/Voxel.types";
import { ShaderAnimationData } from "Meta/Render/Animations/Animation.types";
export declare const AnimationManager: {
    animatedMaterials: Record<VoxelSubstanceType | "Item", BABYLON.ShaderMaterial>;
    animCount: number;
    animations: {
        uniformShaderId: string;
        keys: number[];
        currentFrame: number;
        currentCount: number;
        keyCounts: number[];
        substance: VoxelSubstanceType | "Item";
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
    registerAnimations(voxelSubstanceType: VoxelSubstanceType | "Item", animations: number[][], animationTimes: number[][], overlay?: boolean): ShaderAnimationData;
    registerAnimationsN(voxelSubstanceType: VoxelSubstanceType | "Item", animations: number[][], animationTimes: number[][], overlay?: boolean): {
        uniforms: [id: string, type: ShaderDataTypes][];
        animationFunctionBody: string;
    };
    registerMaterial(voxelSubstanceType: VoxelSubstanceType | "Item", material: BABYLON.ShaderMaterial): void;
    startAnimations(): void;
};
