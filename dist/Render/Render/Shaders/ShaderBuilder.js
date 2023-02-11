//shared functions
import { SharedFogFunctions } from "./Code/Shared/Fog/FogShaderFunctions.js";
import { ShaderNoiseFunctions } from "./Code/Shared/Noise/NoiseShaderFunctions.js";
import { SharedFragmentShader } from "./Code/Shared/Fragment/FragmentShader.js";
import { CommonShader } from "./Code/Shared/ComonShader.js";
import { SharedVertexShader } from "./Code/Shared/Vertex/VertexShader.js";
import { skyboxShaders } from "./Code/SkyBox/SkyBox.shader.js";
import { VoxelShaders } from "./Code/Voxel/VoxelShader.js";
/**# ShaderBuilder
 *---
 * Helps construct raw text shaders.
 */
export const ShaderBuilder = {
    voxelShaders: VoxelShaders,
    buildVertexShader(data, setPosition, doAO = true, vars = "") {
        return `
${SharedVertexShader.top}
${SharedVertexShader.attributes()}
${SharedVertexShader.uniforams}
${SharedVertexShader.varying()}
${SharedVertexShader.optionVars()}
${ShaderNoiseFunctions.fbm2}
${SharedVertexShader.useTime(true)}
${SharedFogFunctions.fogVertexTop}
${data.uvs.uniformRegisterCode}
${data.overlayUVs.uniformRegisterCode}
${data.uvs.animationFunctionCode}
${data.overlayUVs.animationFunctionCode}
${vars}
${SharedVertexShader.getAnimationType}
${SharedVertexShader.animationFunctions}
${CommonShader.getMainFunction(`
${SharedVertexShader.updateVarying}
 ${setPosition}
 ${SharedFogFunctions.fogVertexMain}
 ${SharedVertexShader.passTime}
 ${SharedVertexShader.setUVInMain}
 ${doAO ? SharedVertexShader.doAO : ""}
 ${SharedVertexShader.doRGB}
 ${SharedVertexShader.doSun}
 ${SharedVertexShader.doColors}
 ${SharedVertexShader.doNormals}
 ${SharedVertexShader.passAnimationState}
`)}
`;
    },
    buildFragmentShader(fragMain, doAO = true, vars = "") {
        return `
  ${SharedFragmentShader.top}
  ${SharedFragmentShader.hsv2rgbSmooth}
  ${SharedFragmentShader.useTime}
  ${ShaderNoiseFunctions.fbm3}
  ${SharedFogFunctions.fogFragConstants}
  ${SharedFragmentShader.optionVariables()}
  ${SharedFragmentShader.varying()}
  ${SharedFogFunctions.fogFragVars}
  ${SharedFogFunctions.fogFunctions}
  ${SharedFragmentShader.getColor}
  ${SharedFragmentShader.getBase}
  ${doAO ? SharedFragmentShader.getAO : ""}
  ${SharedFragmentShader.getLight}
  ${SharedFragmentShader.doFog}
  ${SharedFragmentShader.doVFog}
  ${vars}
  ${CommonShader.getMainFunction(`
  ${fragMain}
  `)}`;
    },
    getDefaultVertexShader(voxelSubstance, data) {
        if (voxelSubstance == "#dve_magma") {
            return this.buildVertexShader(data, VoxelShaders.liquid.vertexWave, false, VoxelShaders.liquid.vertexVars);
        }
        if (voxelSubstance == "#dve_flora") {
            return this.buildVertexShader(data, VoxelShaders.flora.setPosition);
        }
        if (voxelSubstance == "#dve_liquid") {
            return this.buildVertexShader(data, VoxelShaders.liquid.vertexWave, false, VoxelShaders.liquid.vertexVars);
        }
        if (voxelSubstance == "#dve_solid") {
            return this.buildVertexShader(data, SharedVertexShader.standardPositionMain);
        }
        if (voxelSubstance == "Item") {
            return this.buildVertexShader(data, SharedVertexShader.standardPositionMain, false);
        }
        return "";
    },
    getDefaultFragmentShader(voxelSubstance) {
        if (voxelSubstance == "#dve_solid") {
            return this.buildFragmentShader(VoxelShaders.solid.fragMain);
        }
        if (voxelSubstance == "#dve_magma") {
            return this.buildFragmentShader(VoxelShaders.liquid.fragMain, false, VoxelShaders.liquid.fragVars);
        }
        if (voxelSubstance == "#dve_liquid") {
            return this.buildFragmentShader(VoxelShaders.liquid.fragMain, false, VoxelShaders.liquid.fragVars);
        }
        if (voxelSubstance == "#dve_flora") {
            return this.buildFragmentShader(VoxelShaders.flora.fragMain);
        }
        if (voxelSubstance == "Item") {
            return this.buildFragmentShader(VoxelShaders.item.fragMain, false);
        }
        return "";
    },
    getSkyBoxVertexShader() {
        return `
${SharedVertexShader.top}
${SharedVertexShader.defaultAttributes}
${SharedVertexShader.uniforams}
${SharedVertexShader.defaultVarying}
${SharedVertexShader.useTime(true)}
${SharedFogFunctions.fogVertexTop}
${CommonShader.getMainFunction(`
 ${SharedVertexShader.standardPositionMain}
 ${SharedVertexShader.passTime}
 ${SharedVertexShader.updateVarying}
 ${SharedFogFunctions.fogVertexMain}
`)}
`;
    },
    getSkyBoxFragmentShader() {
        return `
${SharedFragmentShader.top}
${SharedFragmentShader.defaultVarying}
${SharedFragmentShader.useTime}
${ShaderNoiseFunctions.fbm3}
${SharedFogFunctions.fogFragConstants}
${SharedFogFunctions.fogFragVars}
${SharedFogFunctions.fogFunctions}
${SharedFragmentShader.doFog}
${CommonShader.getMainFunction(`
${skyboxShaders.fragMain}
`)}`;
    },
};
