import { VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types";
/**# ShaderBuilder
 *---
 * Helps construct raw text shaders.
 */
export declare class ShaderBuilder {
    defaultVertexSahder: string;
    defaultFragmentShader: string;
    constructor();
    getDefaultVertexShader(voxelSubstance: VoxelSubstanceType): string;
    getDefaultFragmentShader(voxelSubstance: VoxelSubstanceType): string;
}
