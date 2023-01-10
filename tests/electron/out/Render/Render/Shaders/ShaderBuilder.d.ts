import type { VoxelTemplateSubstanceType } from "Meta/Data/Voxels/Voxel.types";
import { VertexShaderCreateData } from "Meta/Render/Shaders/Shader.types.js";
/**# ShaderBuilder
 *---
 * Helps construct raw text shaders.
 */
export declare const ShaderBuilder: {
    voxelShaders: {
        solid: {
            fragMain: string;
        };
        flora: {
            setPosition: string;
            fragMain: string;
        };
        liquid: {
            vertexVars: string;
            vertexWave: string;
            fragVars: string;
            fragMain: string;
        };
        item: {
            fragMain: string;
        };
    };
    buildVertexShader(data: VertexShaderCreateData, setPosition: string, doAO?: boolean, vars?: string): string;
    buildFragmentShader(fragMain: string, doAO?: boolean, vars?: string): string;
    getDefaultVertexShader(voxelSubstance: VoxelTemplateSubstanceType | "Item", data: VertexShaderCreateData): string;
    getDefaultFragmentShader(voxelSubstance: VoxelTemplateSubstanceType | "Item"): string;
    getSkyBoxVertexShader(): string;
    getSkyBoxFragmentShader(): string;
};
