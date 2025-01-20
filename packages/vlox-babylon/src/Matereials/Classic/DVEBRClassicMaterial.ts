import {
  AssetContainer,
  Engine,
  Scene,
  Texture,
  Vector4,
} from "@babylonjs/core";
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
import { DVEBRShaderStore } from "../../Renderer/Shaders/DVEBRShaderStore.js";
import { ImageArrayTexture } from "../../Renderer/Textures/ImageArrayTexture.js";

const conatiner = new AssetContainer();
type DVEBRClassicMaterialBaseData = {
  textureTypeId: string;
  effectId: string;
  material?: ShaderMaterial;
  textures?: Map<string, ImageArrayTexture>;
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
    const texture = TextureManager.getTextureType(
      data.data.textureTypeId ? data.data.textureTypeId : this.id
    );

    if (!texture && data.data.textureTypeId) {
      throw new Error(
        `Could find the texture type for material ${this.id}. Texture typeid:  ${data.data.textureTypeId}`
      );
    }

    const shaderData = DVEBRShaderStore.getShaderData(this.data.data.effectId);
    if (!shaderData) {
      throw new Error(
        `Could not find shader data for ${this.data.data.effectId}`
      );
    }

    const shaderMaterial = new ShaderMaterial(
      this.id,
      data.scene._scene,
      this.id,
      {
        ...shaderData,
        needAlphaBlending: data.alphaBlending,
        needAlphaTesting:  data.alphaTesting,
      }
    );

    conatiner.materials.push(shaderMaterial);
    if (data.backFaceCulling !== undefined) {
      shaderMaterial.backFaceCulling = data.backFaceCulling;
    }


    let liquid = false;
    if (this.id.includes("liquid")) {
      liquid = true;

      //  shaderMaterial.alpha = 0.5;
      //     shaderMaterial.disableDepthWrite = true;
      //   shaderMaterial.needDepthPrePass = true;
      //   shaderMaterial.separateCullingPass = false;
       shaderMaterial.forceDepthWrite = true;
shaderMaterial.needDepthPrePass = true; 
      shaderMaterial.backFaceCulling = false;
   // shaderMaterial.transparencyMode = 0;
   // shaderMaterial.alphaMode = 0;
      //  shaderMaterial.alphaMode = 2;
   //   shaderMaterial.stencil.enabled = true;
   //   shaderMaterial.stencil.func = Engine.NOTEQUAL;
 //shaderMaterial.stencil.opStencilDepthPass = Engine.KEEP;
    //  shaderMaterial.stencil.mask = 0x00;
    this.scene.setRenderingAutoClearDepthStencil(0, false, false, false);
    } else if (data.alphaBlending) {
      //  shaderMaterial.alpha = .5;
      shaderMaterial.disableDepthWrite = true;
      shaderMaterial.separateCullingPass = true;
      //   shaderMaterial.needDepthPrePass = true;
      //   shaderMaterial.separateCullingPass = true;
      //  shaderMaterial.needDepthPrePass = true;
      //    shaderMaterial.backFaceCulling = false;
    }

    this._material = shaderMaterial;

    this._material.fogEnabled = true;

    // shaderMaterial.wireframe = true;

    /*     if (data.stencil) {
      shaderMaterial.stencil.enabled = true;
      shaderMaterial.stencil.func = Engine.NOTEQUAL;
      this.scene.setRenderingAutoClearDepthStencil(0, false, false, false);
    } */

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

    if (texture) {
      this.setTexture(texture.textureID, texture.shaderTexture);
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
  textures = new Map<string, ImageArrayTexture>();
  //@ts-ignore
  setTexture(samplerId: string, sampler: ImageArrayTexture): void {
    this._material.setTexture(samplerId, sampler!);
    this.textures.set(samplerId, sampler);
  }

  clone(scene: Scene) {
    const textures = new Map<string, ImageArrayTexture>();
    for (const [textId, texture] of this.textures) {
      this._material.removeTexture(textId);
    }

    const newMat = ShaderMaterial.Parse(this._material.serialize(), scene, "/");

    for (const [textId, texture] of this.textures) {
      const newTexture = texture.copy(scene)!;
      textures.set(textId, newTexture);
      newMat.setTexture(textId, newTexture!);
      this._material.setTexture(textId, texture!);
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
