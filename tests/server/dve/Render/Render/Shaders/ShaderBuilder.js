//Note to self look into these for adding shadows from a light to the custom shaders.
//https://forum.babylonjs.com/t/mesh-with-custom-shader-material-does-not-cast-shadow/7761/2
//https://playground.babylonjs.com/#ENPTI9#8
//shaders
import { floraShaders } from "./Code/Flora/Flora.shader.js";
import { fluidShaders } from "./Code/Fluid/Fluid.shaders.js";
import { solidShaders } from "./Code/Solid/Solid.shader.js";
import { itemShaders } from "./Code/Item/Item.shader.js";
//shared functions
import { SharedFogFunctions } from "./Code/Shared/Fog/FogShaderFunctions.js";
import { ShaderNoiseFunctions } from "./Code/Shared/Noise/NoiseShaderFunctions.js";
import { SharedFragmentShader } from "./Code/Shared/Fragment/FragmentShader.js";
import { CommonShader } from "./Code/Shared/ComonShader.js";
import { SharedVertexShader } from "./Code/Shared/Vertex/VertexShader.js";
import { skyboxShaders } from "./Code/SkyBox/SkyBox.shader.js";
/**# ShaderBuilder
 *---
 * Helps construct raw text shaders.
 */
export const ShaderBuilder = {
    buildFloraVertexShader(uniformRegister = "", animationFunction = "", overlayUniformRegister = "", overlayAnimationFunction = "") {
        return `
${SharedVertexShader.top}
${SharedVertexShader.attributes()}
${SharedVertexShader.uniforams}
${SharedVertexShader.varying()}
${SharedVertexShader.optionVars()}
${ShaderNoiseFunctions.fbm2}
${SharedVertexShader.useTime(true)}
${SharedFogFunctions.fogVertexTop}
${uniformRegister}
${overlayUniformRegister}
${animationFunction}
${overlayAnimationFunction}
${SharedVertexShader.getAnimationType}
${SharedVertexShader.animationFunctions}
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
 ${SharedVertexShader.updateVarying}
 ${SharedVertexShader.passAnimationState}
`)}
`;
    },
    buildFluidVertexShader(uniformRegister = "", animationFunction = "", overlayUniformRegister = "", overlayAnimationFunction = "") {
        return `
${SharedVertexShader.top}
${fluidShaders.vertexVars}
${SharedVertexShader.attributes(false)}
${SharedVertexShader.uniforams}
${SharedVertexShader.varying(false)}
${SharedVertexShader.optionVars(false)}
${SharedVertexShader.useTime(true)}
${ShaderNoiseFunctions.fbm2}
${SharedFogFunctions.fogVertexTop}
${uniformRegister}
${overlayUniformRegister}
${animationFunction}
${SharedVertexShader.getAnimationType}
${overlayAnimationFunction}
${CommonShader.getMainFunction(`
 ${fluidShaders.vertexWave}
 ${SharedFogFunctions.fogVertexMain}
 ${SharedVertexShader.passTime}
 ${SharedVertexShader.setUVInMain}
 ${SharedVertexShader.doRGB}
 ${SharedVertexShader.doSun}
 ${SharedVertexShader.doColors}
 ${SharedVertexShader.doNormals}
 ${SharedVertexShader.updateVarying}
 ${SharedVertexShader.passAnimationState}
`)}
`;
    },
    buildSolidVertexShader(uniformRegister = "", animationFunction = "", overlayUniformRegister = "", overlayAnimationFunction = "") {
        return `
${SharedVertexShader.top}
${SharedVertexShader.attributes()}
${SharedVertexShader.uniforams}
${SharedVertexShader.varying()}
${SharedVertexShader.useTime(true)}
${SharedVertexShader.optionVars()}
${SharedFogFunctions.fogVertexTop}
${uniformRegister}
${overlayUniformRegister}
${animationFunction}
${SharedVertexShader.getAnimationType}
${overlayAnimationFunction}
${CommonShader.getMainFunction(`
 ${SharedVertexShader.standardPositionMain}
 ${SharedFogFunctions.fogVertexMain}
 ${SharedVertexShader.setUVInMain}
 ${SharedVertexShader.doAO}
 ${SharedVertexShader.doRGB}
 ${SharedVertexShader.doSun}
 ${SharedVertexShader.doColors}
 ${SharedVertexShader.doNormals}
 ${SharedVertexShader.passTime}
 ${SharedVertexShader.updateVarying}
 ${SharedVertexShader.passAnimationState}
`)}
`;
    },
    buildItemVertexShader(uniformRegister = "", animationFunction = "", overlayUniformRegister = "", overlayAnimationFunction = "") {
        return `
${SharedVertexShader.top}
${SharedVertexShader.attributes(false)}
${SharedVertexShader.uniforams}
${SharedVertexShader.varying()}
${SharedVertexShader.useTime(true)}
${SharedVertexShader.optionVars()}
${SharedFogFunctions.fogVertexTop}
${uniformRegister}
${overlayUniformRegister}
${animationFunction}
${SharedVertexShader.getAnimationType}
${overlayAnimationFunction}
${CommonShader.getMainFunction(`
 ${SharedVertexShader.standardPositionMain}
 ${SharedFogFunctions.fogVertexMain}
 ${SharedVertexShader.setUVInMain}
 ${SharedVertexShader.doRGB}
 ${SharedVertexShader.doSun}
 ${SharedVertexShader.doColors}
 ${SharedVertexShader.doNormals}
 ${SharedVertexShader.passTime}
 ${SharedVertexShader.updateVarying}
 ${SharedVertexShader.passAnimationState}
`)}
`;
    },
    buildMagmaVertexShader(uniformRegister = "", animationFunction = "", overlayUniformRegister = "", overlayAnimationFunction = "") {
        return `
${SharedVertexShader.top}
${fluidShaders.vertexVars}
${SharedVertexShader.attributes(false)}
${SharedVertexShader.uniforams}
${SharedVertexShader.varying(false)}
${SharedVertexShader.optionVars(false)}
${SharedVertexShader.useTime(true)}
${ShaderNoiseFunctions.fbm2}
${SharedFogFunctions.fogVertexTop}
${uniformRegister}
${overlayUniformRegister}
${animationFunction}
${SharedVertexShader.getAnimationType}
${overlayAnimationFunction}
${CommonShader.getMainFunction(`
 ${fluidShaders.vertexWave}
 ${SharedFogFunctions.fogVertexMain}
 ${SharedVertexShader.passTime}
 ${SharedVertexShader.setUVInMain}
 ${SharedVertexShader.doRGB}
 ${SharedVertexShader.doSun}
 ${SharedVertexShader.doColors}
 ${SharedVertexShader.doNormals}
 ${SharedVertexShader.updateVarying}
 ${SharedVertexShader.passAnimationState}
`)}`;
    },
    buildSolidFragmentShader() {
        return `
${SharedFragmentShader.top}
${ShaderNoiseFunctions.fbm3}
${SharedFragmentShader.useTime}
${SharedFogFunctions.fogFragConstants}
${SharedFragmentShader.optionVariables()}
${SharedFragmentShader.varying()}
${SharedFogFunctions.fogFragVars}
${SharedFogFunctions.fogFunctions}
${SharedFragmentShader.getColor}
${SharedFragmentShader.getAO}
${SharedFragmentShader.getLight}
${SharedFragmentShader.doFog}
${SharedFragmentShader.doVFog}

${CommonShader.getMainFunction(`
${solidShaders.fragMain}
`)}`;
    },
    buildItemFragmentShader() {
        return `
${SharedFragmentShader.top}
${ShaderNoiseFunctions.fbm3}
${SharedFragmentShader.useTime}
${SharedFogFunctions.fogFragConstants}
${SharedFragmentShader.optionVariables(false)}
${SharedFragmentShader.varying(false)}
${SharedFogFunctions.fogFragVars}
${SharedFogFunctions.fogFunctions}
${SharedFragmentShader.getColor}
${SharedFragmentShader.getLight}
${SharedFragmentShader.doFog}
${SharedFragmentShader.doVFog}

${CommonShader.getMainFunction(`
${itemShaders.fragMain}
`)}`;
    },
    buildFluidFragmentShader() {
        return `
${SharedFragmentShader.top}
${fluidShaders.fragVars}
${SharedFragmentShader.useTime}
${ShaderNoiseFunctions.fbm3}
${SharedFogFunctions.fogFragConstants}
${SharedFragmentShader.optionVariables(false)}
${SharedFragmentShader.varying(false)}
${SharedFogFunctions.fogFragVars}
${SharedFogFunctions.fogFunctions}
${SharedFragmentShader.getColor}
${SharedFragmentShader.getLight}
${SharedFragmentShader.doFog}
${SharedFragmentShader.doVFog}

${CommonShader.getMainFunction(`
${fluidShaders.fragMain}
`)}`;
    },
    buildFloraFragmentShader() {
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
  ${SharedFragmentShader.getAO}
  ${SharedFragmentShader.getLight}
  ${SharedFragmentShader.doFog}
  ${SharedFragmentShader.doVFog}

  ${CommonShader.getMainFunction(`
  ${floraShaders.fragMain}
  `)}`;
    },
    buildMagmaFragmentShader() {
        return `
${SharedFragmentShader.top}
${SharedFogFunctions.fogFragConstants}
${SharedFragmentShader.optionVariables(false)}
${SharedFragmentShader.varying(false)}
${SharedFogFunctions.fogFragVars}
${SharedFogFunctions.fogFunctions}
${SharedFragmentShader.getColor}
${SharedFragmentShader.getAO}
${SharedFragmentShader.getLight}
${SharedFragmentShader.doFog}
${CommonShader.getMainFunction(`
${solidShaders.fragMain}
`)}`;
    },
    getDefaultVertexShader(voxelSubstance, uniformRegister = "", animationFunction = "", overlayUniformRegister = "", ovlerayAnimationFunction = "") {
        if (voxelSubstance == "magma") {
            return this.buildMagmaVertexShader(uniformRegister, animationFunction, overlayUniformRegister, ovlerayAnimationFunction);
        }
        if (voxelSubstance == "flora") {
            return this.buildFloraVertexShader(uniformRegister, animationFunction, overlayUniformRegister, ovlerayAnimationFunction);
        }
        if (voxelSubstance == "fluid") {
            return this.buildFluidVertexShader(uniformRegister, animationFunction, overlayUniformRegister, ovlerayAnimationFunction);
        }
        if (voxelSubstance == "solid") {
            return this.buildSolidVertexShader(uniformRegister, animationFunction, overlayUniformRegister, ovlerayAnimationFunction);
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
