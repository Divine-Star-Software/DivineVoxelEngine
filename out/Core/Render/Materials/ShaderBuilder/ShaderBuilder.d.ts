import type { VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types";
/**# ShaderBuilder
 *---
 * Helps construct raw text shaders.
 */
export declare class ShaderBuilder {
    constructor();
    buildFloraVertexSahder(uniformRegister?: string, animationFuction?: string): string;
    buildFluidVertexShader(uniformRegister?: string, animationFuction?: string): string;
    buildSolidVertexShader(uniformRegister?: string, animationFuction?: string): string;
    buildMagmaVertexShader(uniformRegister?: string, animationFuction?: string): string;
    buildSolidFragmentShader(): string;
    buildFluidFragmentShader(): string;
    buildFloraFragmentShader(): string;
    buildMagmaFragmentShader(): string;
    getDefaultVertexShader(voxelSubstance: VoxelSubstanceType, uniformRegister?: string, animationFuction?: string): string;
    getDefaultFragmentShader(voxelSubstance: VoxelSubstanceType): string;
}
