import { Scene, Vector4 } from "@babylonjs/core";
import { Effect } from "@babylonjs/core/Materials/effect.js";
import { ShaderMaterial } from "@babylonjs/core/Materials/shaderMaterial.js";
import { Matrix, Vector2, Vector3 } from "@babylonjs/core/Maths/";
import { TextureManager } from "@divinevoxel/foundation/Textures/TextureManager.js";
import { TextureBuilder } from "@divinevoxel/foundation/Textures/TextureBuilder";

import { DivineShader } from "@divinestar/shaders";
import {
  URIMaterial,
  URIMaterialData,
} from "@divinestar/uri/Materials/URIMaterial.js";
import { DVEBRScene } from "Scene/DVEBRScene.js";
import { URIScene } from "@divinestar/uri/Scenes/URIScene.js";
import { URITexture } from "@divinestar/uri/Textures/URITexture.js";
import { DefaultMaterialManager } from "../DefaultMaterialManager";

type DVEBRClassicMaterialBaseData = {
  textureTypeId: string;
  shaderId: string;
};

export type DVEBRClassicMaterialData = URIMaterialData<
  DVEBRScene,
  DVEBRClassicMaterialBaseData
>;

export class DVEBRClassicMaterial extends URIMaterial<
  DVEBRScene,
  DVEBRClassicMaterialBaseData,
  ShaderMaterial
> {
  scene: Scene;

  shader: DivineShader;

  afterCreate: ((material: ShaderMaterial) => void)[] = [];
  constructor(public id: string, public data: DVEBRClassicMaterialData) {
    super();
  }

  createMaterial(scene: Scene): ShaderMaterial | false {
    this.scene = scene;
    this._create(this.data);
    return this._material;
  }

  _create(data: DVEBRClassicMaterialData): ShaderMaterial {
    const type = TextureManager.getTextureType(
      data.data.textureTypeId ? data.data.textureTypeId : this.id
    );

    if (!type && data.data.textureTypeId) {
      throw new Error(
        `Could find the texture type for material ${this.id}. Texture typeid:  ${data.data.textureTypeId}`
      );
    }
    const shader = DefaultMaterialManager.shaders.register.get(
      data.data.shaderId
    );

    if (!shader) {
      throw new Error(
        `Could find the shader for material ${this.id}. Shader id:  ${data.data.shaderId}`
      );
    }
    if (type) type.addToShader(shader);

    this.shader = shader;
    shader.compile();

    Effect.ShadersStore[`${this.id}VertexShader`] = shader.compiled.vertex;

    Effect.ShadersStore[`${this.id}FragmentShader`] = shader.compiled.fragment;

    const shaderMaterial = new ShaderMaterial(
      this.id,
      data.scene._scene,
      this.id,
      {
        attributes: shader.getAttributeList(),
        uniforms: shader.getUniformList(),
        needAlphaBlending: data.alphaBlending,
        needAlphaTesting: data.alphaTesting,
      }
    );

    this._material = shaderMaterial;

    this._material.fogEnabled = true;

    if (data.alphaBlending) {
      shaderMaterial.separateCullingPass = true;
      shaderMaterial.backFaceCulling = false;
      shaderMaterial.forceDepthWrite = true;
      shaderMaterial.needDepthPrePass = true;
    }

    if (type) type.addToMaterial(this);

    shaderMaterial.setVector3("worldOrigin", Vector3.Zero());
    if (data.mipMapBias) {
      shaderMaterial.setFloat("mipMapBias", data.mipMapBias);
    }
    this._material.onBind = (mesh) => {
      if (!this._material) return;
      const effect = this._material.getEffect();
      const scene = mesh.getScene();
      if (!effect) return;

      effect.setFloat4(
        "vFogInfos",
        scene.fogMode,
        scene.fogStart,
        scene.fogEnd,
        scene.fogDensity
      );
      effect.setColor3("vFogColor", scene.fogColor);
    };

    if (data.backFaceCulling !== undefined) {
      this._material.backFaceCulling = data.backFaceCulling;
    }

    this.afterCreate.forEach((_) => _(this._material));
    return this._material;
  }
  setTextureArray(
    samplerId: string,
    sampler: URITexture<URIScene<any>, any>[]
  ): void {
    this._material.setTextureArray(
      samplerId,
      sampler.map((_) => _._texture)
    );
  }
  setTexture(samplerId: string, sampler: URITexture<URIScene<any>, any>): void {
    this._material.setTexture(samplerId, sampler._texture);
  }
  setNumber(uniform: string, value: number): void {
    this._material.setFloat(uniform, value);
  }
  setNumberArray(uniform: string, value: ArrayLike<number>): void {
    this._material.setFloats(uniform, value as any);
  }
  setVector2(uniform: string, x: number, y: number): void {
    this._material.setVector2(uniform, new Vector2(x, y));
  }
  setVector3(uniform: string, x: number, y: number, z: number): void {
    this._material.setVector3(uniform, new Vector3(x, y, z));
  }
  setVector4(
    uniform: string,
    x: number,
    y: number,
    z: number,
    w: number
  ): void {
    this._material.setVector4(uniform, new Vector4(x, y, z, w));
  }
  setMatrix<MatrixType = Matrix>(uniform: string, matrix: MatrixType): void {
    this._material.setMatrix(uniform, matrix as any);
  }
}
