import type { BaseTexture } from "@babylonjs/core/Materials/Textures/baseTexture";
import type { Engine } from "@babylonjs/core/Engines/engine";
import type { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial";
import type { Scene } from "@babylonjs/core/scene";
import type { UniformBuffer } from "@babylonjs/core/Materials/uniformBuffer";
import { MaterialPluginBase } from "@babylonjs/core/Materials/materialPluginBase";
import { DVEBRPBRMaterial } from "./DVEBRPBRMaterial";

export class DVEPBRMaterialPlugin extends MaterialPluginBase {
  uniformBuffer: UniformBuffer;

  id = crypto.randomUUID();
  constructor(
    material: PBRMaterial,
    name: string,
    public dveMaterial: DVEBRPBRMaterial,
    public onUBSet: (uniformBuffer: UniformBuffer) => void
  ) {
    //  shaders.set(material.id, dveMaterial.shader);
    //  textures.set(material.id, dveMaterial.texture);

    super(material, name, 20, {
      [`DVE_${name}`]: false,
    });

    this._enable(true);
  }

  hasTexture(texture: BaseTexture): boolean {
    return true;
  }
  /*   getActiveTextures(activeTextures: BaseTexture[]) {
    const texture = textures.get(this._material.id);
    if (!texture) return [];

    for (const [key, segment] of texture.segments) {
      if (!segment.shaderTexture) continue;
      activeTextures.push(segment.shaderTexture._texture);
    }
    return activeTextures;
  } */

  prepareDefines(defines: any) {
    defines[`DVE_${this.name}`] = true;
  }

  getClassName() {
    return "DVEPBRMaterialPlugin";
  }
  /* 
  getSamplers(samplers: string[]) {
    const shader = this.dveMaterial?.shader || shaders.get(this._material.id)!;
  
    samplers.push(...shader.getTextureList());
  }

  getAttributes(attributes: string[]) {
    const shader = this.dveMaterial?.shader || shaders.get(this._material.id)!;
    for(const atr of shader.data.mesh.getAttributeList()){
      if(["position","normal"].includes(atr))continue;
    }
    attributes.push(...shader.data.mesh.getAttributeList());
  } */

  /*   getUniforms() {
    const shader = this.dveMaterial?.shader || shaders.get(this._material.id)!;
    const ubo: {
      name: string;
      size?: number;
      arraySize?: number;
      type: string;
    }[] = [];
    const ignoreUniforms = ["viewProjection", "world", "lightGradient"];
    for (const [key, [name, type, length]] of shader.getUniformDataList()) {
      if (ignoreUniforms.includes(key)) continue;
      if (type == "ignore") continue;
      let isArray = false;
      if (length) isArray = true;
      if (type == "float") {
        if (!isArray) ubo.push({ name, size: 1, type });
        if (isArray) ubo.push({ name, arraySize: length, size: 1, type });
        continue;
      }
      if (type == "vec2") {
        if (!isArray) ubo.push({ name, size: 2, type });
        if (isArray) ubo.push({ name, arraySize: length, size: 2, type });
        continue;
      }
      if (type == "vec3") {
        if (!isArray) ubo.push({ name, size: 3, type });
        if (isArray) ubo.push({ name, arraySize: length, size: 3, type });
        continue;
      }
      if (type == "vec4") {
        if (!isArray) ubo.push({ name, size: 4, type });
        if (isArray) ubo.push({ name, arraySize: length, size: 4, type });
        continue;
      }
      if (type == "mat3") {
        ubo.push({ name, size: 3 * 3, type });
        continue;
      }
      if (type == "mat4") {
        ubo.push({ name, size: 4 * 4, type });
        continue;
      }
    }
  
    const uniforms = shader.compileUniforms(
      (id) => !ignoreUniforms.includes(id)
    );
    return {
      ubo,
      vertex: uniforms.vertex,
      fragment: uniforms.fragment,
    };
  }
 */
  _textureBound = false;
  bindForSubMesh(uniformBuffer: UniformBuffer, scene: Scene, engine: Engine) {
    if (!this.uniformBuffer) this.uniformBuffer = uniformBuffer;
  }

  //@ts-ignore
  getCustomCode(shaderType: any) {
    const textures = "";
    const varying = "";

    const ignoreFunctions = ["toGammaSpace", "toLinearSpace"];
    const functions = "";
    const ignoreAttributes = ["position", "normal"];
    const attributes = "";
    if (shaderType === "vertex") {
      return {
        CUSTOM_VERTEX_DEFINITIONS: /*glsl*/ `
#ifdef  DVE_${this.name}
const float lightGradient[16] = float[16]( 0.06, 0.1, 0.11, 0.14, 0.17, 0.21, 0.26, 0.31, 0.38, 0.45, 0.54, 0.64, 0.74, 0.85, 0.97, 1.);
${attributes}
${varying}
${functions}
#endif
`,
        CUSTOM_VERTEX_UPDATE_NORMAL: /*glsl*/ `
#ifdef  DVE_${this.name}
#ifdef  DVE_dve_liquid
vec3 noisePOS = vec3(worldPOSNoOrigin.x/10., worldPOSNoOrigin.y, worldPOSNoOrigin.z/10.);

// Sample the noise at the current position
float noiseSample = fbm3(noisePOS  + time * 0.01) * 0.1;

// Calculate the gradient (partial derivatives) of the noise to adjust normals
vec3 dNoise_dPos;
dNoise_dPos.x = fbm3(noisePOS + vec3(0.01, 0.0, 0.0) + time * 0.01) - noiseSample;
dNoise_dPos.y = fbm3(noisePOS + vec3(0.0, 0.01, 0.0) + time * 0.01) - noiseSample;
dNoise_dPos.z = fbm3(noisePOS + vec3(0.0, 0.0, 0.01) + time * 0.01) - noiseSample;

// Adjust the normal with the gradient of the noise function
normalUpdated += dNoise_dPos * 0.1; // Adjust multiplier as needed for visual effect

// Update the position to simulate wave heights
positionUpdated = vec3(
    positionUpdated.x,
    positionUpdated.y + noiseSample, // Adding, assuming 'y' is up. Adjust as needed.
    positionUpdated.z
);

#endif
#endif

`,

        CUSTOM_VERTEX_MAIN_BEGIN: /*glsl*/ `
#ifdef  DVE_${this.name}
${varying}



#endif
        `,
      };
    }
    if (shaderType === "fragment") {
      return {
        CUSTOM_FRAGMENT_DEFINITIONS: /*glsl*/ `
#ifdef  DVE_${this.name}
precision highp sampler2DArray;
const float lightGradient[16] = float[16]( 0.06, 0.1, 0.11, 0.14, 0.17, 0.21, 0.26, 0.31, 0.38, 0.45, 0.54, 0.64, 0.74, 0.85, 0.97, 1.);
${textures}
${varying}
${functions}
#endif
`,

        CUSTOM_FRAGMENT_UPDATE_ALBEDO: /*glsl*/ `
#ifdef  DVE_${this.name}

#ifndef  DVE_dve_liquid
vec4 voxelBaseColor = toLinearSpace(getBaseColor(vec2(0.,0.)));
voxelBaseColor = getAO(voxelBaseColor);
//vec4 voxelMixLight = vec4(vec3(VOXEL[2].rgb + 1.).xyz,1.) * voxelBaseColor;
surfaceAlbedo = vec3(voxelBaseColor.r,voxelBaseColor.g,voxelBaseColor.b);
alpha = voxelBaseColor.a;
#endif

#ifdef  DVE_dve_liquid
vec4 voxelBaseColor = vec4(VOXEL[2].rgb + 1.,1.) *  vec4(.2, .58, .79,1.);
surfaceAlbedo = toLinearSpace(vec3(voxelBaseColor.r,voxelBaseColor.g,voxelBaseColor.b));
alpha = .9;

#endif


#endif
`,
        /* "!finalIrradiance\\*\\=surfaceAlbedo.rgb;":
`finalIrradiance*=surfaceAlbedo.rgb;\nfinalIrradiance = vec3(VOXEL[2].rgb ) ;`, */
        CUSTOM_FRAGMENT_BEFORE_FINALCOLORCOMPOSITION: /*glsl*/ `
#ifdef  DVE_${this.name}

if(finalDiffuse.r * VOXEL[2].r > finalDiffuse.r) {
  finalDiffuse.r *= VOXEL[2].r;
}
if(finalDiffuse.g * VOXEL[2].g > finalDiffuse.g) {
  finalDiffuse.g *= VOXEL[2].g;
}
if(finalDiffuse.b * VOXEL[2].b > finalDiffuse.b) {
  finalDiffuse.b *= VOXEL[2].b;
}
//add base color
finalDiffuse.rgb += .01;
#endif
`,
        CUSTOM_FRAGMENT_MAIN_END: /*glsl*/ `
#ifdef  DVE_${this.name}
if (glFragColor.a < 0.05) {
  discard;
}
#endif
`,
      };
    }
    return null;
  }
}
