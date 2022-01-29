import type { VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types";
/**# ShaderBuilder
 *---
 * Helps construct raw text shaders.
 */
export declare class ShaderBuilder {
    constructor();
    buildFloraVertexSahder(uniformRegister?: string, animationFunction?: string): string;
    buildFluidVertexShader(uniformRegister?: string, animationFunction?: string): string;
    buildSolidVertexShader(uniformRegister?: string, animationFunction?: string): string;
    buildMagmaVertexShader(uniformRegister?: string, animationFunction?: string): string;
    buildSolidFragmentShader(): string;
    buildFluidFragmentShader(): string;
    buildFloraFragmentShader(): string;
    buildMagmaFragmentShader(): string;
    getDefaultVertexShader(voxelSubstance: VoxelSubstanceType, uniformRegister?: string, animationFunction?: string): string;
    getDefaultFragmentShader(voxelSubstance: VoxelSubstanceType): string;
}
