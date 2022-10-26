import type { VoxelSubstanceType } from "Meta/Data/Voxels/Voxel.types";
/**# ShaderBuilder
 *---
 * Helps construct raw text shaders.
 */
export declare const ShaderBuilder: {
    buildFloraVertexShader(uniformRegister?: string, animationFunction?: string, overlayUniformRegister?: string, overlayAnimationFunction?: string): string;
    buildFluidVertexShader(uniformRegister?: string, animationFunction?: string, overlayUniformRegister?: string, overlayAnimationFunction?: string): string;
    buildSolidVertexShader(uniformRegister?: string, animationFunction?: string, overlayUniformRegister?: string, overlayAnimationFunction?: string): string;
    buildItemVertexShader(uniformRegister?: string, animationFunction?: string, overlayUniformRegister?: string, overlayAnimationFunction?: string): string;
    buildMagmaVertexShader(uniformRegister?: string, animationFunction?: string, overlayUniformRegister?: string, overlayAnimationFunction?: string): string;
    buildSolidFragmentShader(): string;
    buildItemFragmentShader(): string;
    buildFluidFragmentShader(): string;
    buildFloraFragmentShader(): string;
    buildMagmaFragmentShader(): string;
    getDefaultVertexShader(voxelSubstance: VoxelSubstanceType, uniformRegister?: string, animationFunction?: string, overlayUniformRegister?: string, ovlerayAnimationFunction?: string): string;
    getDefaultFragmentShader(voxelSubstance: VoxelSubstanceType): string;
    getSkyBoxVertexShader(): string;
    getSkyBoxFragmentShader(): string;
};
