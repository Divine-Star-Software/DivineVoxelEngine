//Note to self look into these for adding shadows from a light to the custom shaders.
//https://forum.babylonjs.com/t/mesh-with-custom-shader-material-does-not-cast-shadow/7761/2
//https://playground.babylonjs.com/#ENPTI9#8
//shaders
import { floraShaders } from "./Shaders/Flora/Flora.shader.js";
import { fluidShaders } from "./Shaders/Fluid/Fluid.shaders.js";
import { magmaShaders } from "./Shaders/Magma/Magma.shader.js";
import { solidShaders } from "./Shaders/Solid/Solid.shader.js";
//shared functions
import { SharedFogFunctions } from "./Shaders/Shared/Fog/FogShaderFunctions.js";
import { ShaderNoiseFunctions } from "./Shaders/Shared/Noise/NoiseShaderFunctions.js";
import { SharedFragmentShader } from "./Shaders/Shared/Fragment/FragmentShader.js";
import { CommonShader } from "./Shaders/Shared/CommShader.js";
import { SharedVertexShader } from "./Shaders/Shared/Vertex/VertexShader.js";
/**# ShaderBuilder
 *---
 * Helps construct raw text shaders.
 */
export const ShaderBuilder = {
    buildFloraVertexShader(uniformRegister = "", animationFunction = "") {
        return `
${SharedVertexShader.top}
${SharedVertexShader.attributes}
${SharedVertexShader.uniforams}
${SharedVertexShader.varying}
${SharedVertexShader.optionVars}
${ShaderNoiseFunctions.fluid}
${SharedVertexShader.useTime(true)}
${SharedFogFunctions.fogVertexTop}
${uniformRegister}
${animationFunction}
${CommonShader.getMainFunction(`
 ${floraShaders.setPosition}
 ${SharedFogFunctions.fogVertexMain}
 ${SharedVertexShader.passTime}
 ${SharedVertexShader.setUVInMain}
 ${SharedVertexShader.doAO}
 ${SharedVertexShader.doRGB}
 ${SharedVertexShader.doSun}
 ${SharedVertexShader.doColors}
 ${SharedVertexShader.doNormals}
`)}
`;
    },
    buildFluidVertexShader(uniformRegister = "", animationFunction = "") {
        return `
${SharedVertexShader.top}
${SharedVertexShader.attributesNoAO}
${SharedVertexShader.uniforams}
${SharedVertexShader.varying}
${SharedVertexShader.optionVars}
${SharedVertexShader.useTime(false)}
${ShaderNoiseFunctions.fluid}
${SharedFogFunctions.fogVertexTop}
${uniformRegister}
${animationFunction}
${CommonShader.getMainFunction(`
 ${fluidShaders.vertexWave}
 ${SharedFogFunctions.fogVertexMain}
 ${SharedVertexShader.setUVInMain}
 ${SharedVertexShader.doRGB}
 ${SharedVertexShader.doSun}
 ${SharedVertexShader.doColors}
 ${SharedVertexShader.doNormals}
`)}
`;
    },
    buildSolidVertexShader(uniformRegister = "", animationFunction = "") {
        return `
${SharedVertexShader.top}
${SharedVertexShader.attributes}
${SharedVertexShader.uniforams}
${SharedVertexShader.varying}
${SharedVertexShader.optionVars}
${SharedFogFunctions.fogVertexTop}
${uniformRegister}
${animationFunction}
${CommonShader.getMainFunction(`
 ${SharedVertexShader.standardPositionMain}
 ${SharedFogFunctions.fogVertexMain}
 ${SharedVertexShader.setUVInMain}
 ${SharedVertexShader.doAO}
 ${SharedVertexShader.doRGB}
 ${SharedVertexShader.doSun}
 ${SharedVertexShader.doColors}
 ${SharedVertexShader.doNormals}
`)}
`;
    },
    buildMagmaVertexShader(uniformRegister = "", animationFunction = "") {
        return `
${magmaShaders.vertexTop}

${uniformRegister}

${animationFunction}

${magmaShaders.vertexMain}
`;
    },
    buildSolidFragmentShader() {
        return `
${SharedFragmentShader.top}
${SharedFogFunctions.fogFragConstants}
${SharedFragmentShader.optionVariables}
${SharedFragmentShader.varsNormal}
${SharedFogFunctions.fogFragVars}
${SharedFogFunctions.fogFragFunction}
${SharedFragmentShader.getColor}
${SharedFragmentShader.getAO}
${SharedFragmentShader.getLight}
${SharedFragmentShader.doFog}
${CommonShader.getMainFunction(`
${solidShaders.fragMain}
`)}`;
    },
    buildFluidFragmentShader() {
        return `
${SharedFragmentShader.top}
${SharedFogFunctions.fogFragConstants}
${SharedFragmentShader.optionVariables}
${SharedFragmentShader.varsNoAO}
${SharedFogFunctions.fogFragVars}
${SharedFogFunctions.fogFragFunction}
${SharedFragmentShader.getColor}
${SharedFragmentShader.getLight}
${SharedFragmentShader.doFog}
${CommonShader.getMainFunction(`
${fluidShaders.fragMain}
`)}`;
    },
    buildFloraFragmentShader() {
        return `
  ${SharedFragmentShader.top}
  ${SharedFogFunctions.fogFragConstants}
  ${SharedFragmentShader.optionVariables}
  ${SharedFragmentShader.varsNormal}
  ${SharedFogFunctions.fogFragVars}
  ${SharedFogFunctions.fogFragFunction}
  ${SharedFragmentShader.getColor}
  ${SharedFragmentShader.getAO}
  ${SharedFragmentShader.getLight}
  ${SharedFragmentShader.doFog}
  ${SharedFragmentShader.hsv2rgbSmooth}
  ${SharedFragmentShader.useTime}
  ${CommonShader.getMainFunction(`
  ${floraShaders.fragMain}
  `)}`;
    },
    buildMagmaFragmentShader() {
        return `
${SharedFogFunctions.fogFragConstants}

${magmaShaders.fragTop}

${SharedFogFunctions.fogFragVars}

${SharedFogFunctions.fogFragFunction}

${magmaShaders.fragMain}
`;
    },
    getDefaultVertexShader(voxelSubstance, uniformRegister = "", animationFunction = "") {
        if (voxelSubstance == "magma") {
            return this.buildMagmaVertexShader(uniformRegister, animationFunction);
        }
        if (voxelSubstance == "flora") {
            return this.buildFloraVertexShader(uniformRegister, animationFunction);
        }
        if (voxelSubstance == "fluid") {
            return this.buildFluidVertexShader(uniformRegister, animationFunction);
        }
        if (voxelSubstance == "solid") {
            return this.buildSolidVertexShader(uniformRegister, animationFunction);
        }
        return "";
    },
    getDefaultFragmentShader(voxelSubstance) {
        if (voxelSubstance == "solid") {
            return this.buildSolidFragmentShader();
        }
        if (voxelSubstance == "magma") {
            return this.buildMagmaFragmentShader();
        }
        if (voxelSubstance == "fluid") {
            return this.buildFluidFragmentShader();
        }
        if (voxelSubstance == "flora") {
            return this.buildFloraFragmentShader();
        }
        return "";
    },
};
