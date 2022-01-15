//Note to self look into these for adding shadows from a light to the custom shaders.
//https://forum.babylonjs.com/t/mesh-with-custom-shader-material-does-not-cast-shadow/7761/2
//https://playground.babylonjs.com/#ENPTI9#8

import type { VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types";

//shaders
import { floraShaders } from "./Shaders/Flora/Flora.shader.js";
import { fluidShaders } from "./Shaders/Fluid/Fluid.shaders.js";
import { magmaShaders } from "./Shaders/Magma/Solid.shader.js";
import { solidShaders } from "./Shaders/Solid/Solid.shader.js";

//shared functions
import { SharedFogFunctions } from "./Shaders/Shared/Fog/FogShaderFunctions.js";
import { ShaderNoiseFunctions } from "./Shaders/Shared/Noise/NoiseShaderFunctions.js";

/**# ShaderBuilder
 *---
 * Helps construct raw text shaders.
 */
export class ShaderBuilder {
 constructor() {}

 buildFloraVertexSahder(
  uniformRegister: string = "",
  animationFuction: string = ""
 ) {
  const shader = `
${floraShaders.vertexTop}

${uniformRegister}

${animationFuction}

${floraShaders.vertexMain}
`;

  return shader;
 }

 buildFluidVertexShader(
  uniformRegister: string = "",
  animationFuction: string = ""
 ) {
  const shader = `
${fluidShaders.vertexTop}

${uniformRegister}

${ShaderNoiseFunctions.fluid}

${animationFuction}

${fluidShaders.vertexMain}
`;

  return shader;
 }

 buildSolidVertexShader(
  uniformRegister: string = "",
  animationFuction: string = ""
 ) {
  const shader = `
${solidShaders.vertexTop}

${uniformRegister}

${animationFuction}

${solidShaders.vertexMain}
`;

  return shader;
 }

 buildMagmaVertexShader(
  uniformRegister: string = "",
  animationFuction: string = ""
 ) {
  const shader = `
${magmaShaders.vertexTop}

${uniformRegister}

${animationFuction}

${magmaShaders.vertexMain}
`;

  return shader;
 }

 buildSolidFragmentShader() {
  const shader = `
${SharedFogFunctions.fogFragConstants}

${solidShaders.fragTop}

${SharedFogFunctions.fogFragVars}

${SharedFogFunctions.fogFragFunction}

${solidShaders.fragMain}
`;

  return shader;
 }

 buildFluidFragmentShader() {
  const shader = `
${SharedFogFunctions.fogFragConstants}

${fluidShaders.fragTop}

${SharedFogFunctions.fogFragVars}

${SharedFogFunctions.fogFragFunction}

${fluidShaders.fragMain}
`;

  return shader;
 }

 buildFloraFragmentShader() {
  const shader = `
${SharedFogFunctions.fogFragConstants}

${floraShaders.fragTop}

${SharedFogFunctions.fogFragVars}

${SharedFogFunctions.fogFragFunction}

${floraShaders.fragMain}
`;

  return shader;
 }

 buildMagmaFragmentShader() {
  const shader = `
${SharedFogFunctions.fogFragConstants}

${magmaShaders.fragTop}

${SharedFogFunctions.fogFragVars}

${SharedFogFunctions.fogFragFunction}

${magmaShaders.fragMain}
`;

  return shader;
 }

 getDefaultVertexShader(
  voxelSubstance: VoxelSubstanceType,
  uniformRegister = "",
  animationFuction = ""
 ) {
  if (voxelSubstance == "magma") {
   return this.buildMagmaVertexShader(uniformRegister, animationFuction);
  }
  if (voxelSubstance == "flora") {
   return this.buildFloraVertexSahder(uniformRegister, animationFuction);
  }
  if (voxelSubstance == "fluid") {
   return this.buildFluidVertexShader(uniformRegister, animationFuction);
  }
  if (voxelSubstance == "solid") {
   return this.buildSolidVertexShader(uniformRegister, animationFuction);
  }
  return "";
 }

 getDefaultFragmentShader(voxelSubstance: VoxelSubstanceType) {
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
 }
}
