import { AssetContainer, Engine, Scene, Vector4 } from "@babylonjs/core";
import { Effect } from "@babylonjs/core/Materials/effect.js";
import { ShaderMaterial } from "@babylonjs/core/Materials/shaderMaterial.js";
import { Matrix, Vector2, Vector3 } from "@babylonjs/core/Maths/";
import { TextureManager } from "@divinevoxel/vlox/Textures/TextureManager.js";
import { URIShader } from "@amodx/uri/Shaders/Classes/URIShader";
import {
  URIMaterial,
  URIMaterialData,
} from "@amodx/uri/Materials/URIMaterial.js";
import { DVEBRScene } from "../../Renderer/Scene/DVEBRScene.js";
import { URIScene } from "@amodx/uri/Scenes/URIScene.js";
import { URITexture } from "@amodx/uri/Textures/URITexture.js";
import { DefaultMaterialManager } from "../DefaultMaterialManager";
import { DVEBRTexture } from "Renderer/Textures/DVEBRTexture.js";

const conatiner = new AssetContainer();
type DVEBRClassicMaterialBaseData = {
  textureTypeId: string;
  shaderId: string;
  material?: ShaderMaterial;
  textures?: Map<string, DVEBRTexture>;
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

  shader: URIShader;

  afterCreate: ((material: ShaderMaterial) => void)[] = [];
  constructor(
    public id: string,
    public data: DVEBRClassicMaterialData
  ) {
    super();
  }

  createMaterial(scene: Scene): ShaderMaterial | false {
    this.scene = scene;
    this._create(this.data);
    return this._material;
  }

  _create(data: DVEBRClassicMaterialData): ShaderMaterial {
    if (this.data.data.material && this.data.data.textures) {
      this._material = this.data.data.material;
      this.textures = this.data.data.textures;
      return this._material;
    }
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
       // needAlphaBlending: data.alphaBlending,
      //  needAlphaTesting: data.alphaTesting,
      }
    );

    conatiner.materials.push(shaderMaterial);

/*     if (data.alphaBlending) {
    //  shaderMaterial.alpha = .5;
    shaderMaterial.disableDepthWrite = true;
    shaderMaterial.separateCullingPass  = true;
 //   shaderMaterial.needDepthPrePass = true;
   //   shaderMaterial.separateCullingPass = true;
    //  shaderMaterial.needDepthPrePass = true;
  //    shaderMaterial.backFaceCulling = false;
      shaderMaterial.transparencyMode = ShaderMaterial.MATERIAL_ALPHATESTANDBLEND;
    }
 */
    this._material = shaderMaterial;

    this._material.fogEnabled = true;

    // shaderMaterial.wireframe = true;

/*     if (data.stencil) {
      shaderMaterial.stencil.enabled = true;
      shaderMaterial.stencil.func = Engine.NOTEQUAL;
      this.scene.setRenderingAutoClearDepthStencil(0, false, false, false);
    } */
    if (data.backFaceCulling !== undefined) {
      shaderMaterial.backFaceCulling = data.backFaceCulling;
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
  textures = new Map<string, DVEBRTexture>();
  setTexture(samplerId: string, sampler: DVEBRTexture): void {
    this._material.setTexture(samplerId, sampler._texture!);
    this.textures.set(samplerId, sampler);
  }

  clone(scene: Scene) {
    const textures = new Map<string, DVEBRTexture>();
    for (const [textId, texture] of this.textures) {
      this._material.removeTexture(textId);
    }

    const newMat = ShaderMaterial.Parse(this._material.serialize(), scene, "/");

    for (const [textId, texture] of this.textures) {
      const newTexture = texture.clone(scene)!;
      textures.set(textId, newTexture);
      newMat.setTexture(textId, newTexture._texture!);
      this._material.setTexture(textId, texture._texture!);
    }

    const mat = new DVEBRClassicMaterial(this.id, {
      ...this.data,
      data: {
        ...this.data.data,
        material: newMat,
        textures,
      },
    });
    mat._material = newMat;
    mat.textures = textures;
    return mat;
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
