import {
  AssetContainer,
  RawTexture,
  Scene,
  Texture,
  Vector4,
} from "@babylonjs/core";
import { ShaderMaterial } from "@babylonjs/core/Materials/shaderMaterial.js";
import { Matrix, Vector2, Vector3 } from "@babylonjs/core/Maths/";
import { TextureManager } from "@divinevoxel/vlox/Textures/TextureManager.js";
import { DVEBRShaderStore } from "../../Shaders/DVEBRShaderStore.js";
import { ImageArrayTexture } from "../../Textures/ImageArrayTexture.js";
import { MaterialData, MaterialInterface } from "../MaterialInterface.js";

const conatiner = new AssetContainer();

type MatData = MaterialData<{
  textureTypeId: string;
  effectId: string;
  material?: ShaderMaterial;
  textures?: Map<string, ImageArrayTexture | Texture>;
}>;

export class DVEBRClassicMaterial implements MaterialInterface<MatData> {
  scene: Scene;
  _material: ShaderMaterial;

  constructor(
    public id: string,
    public data: MatData
  ) {}

  afterCreate: ((material: ShaderMaterial) => void)[] = [];

  createMaterial(scene: Scene) {
    this.scene = scene;
    this._create(this.data);
    return this;
  }

  _create(data: DVEBRClassicMaterial["data"]): ShaderMaterial {
    if (this.data.data.material && this.data.data.textures) {
      this._material = this.data.data.material;
      this.textures = this.data.data.textures;
      return this._material;
    }
    let texture;
    let animationTexture;
    if (data.data.textureTypeId) {
      texture = TextureManager.getTexture(
        data.data.textureTypeId ? data.data.textureTypeId : this.id
      );

      if (!texture && data.data.textureTypeId) {
        throw new Error(
          `Could find the texture type for material ${this.id}. Texture typeid:  ${data.data.textureTypeId}`
        );
      }
      animationTexture = texture.animatedTexture;
    }

    const shaderData = DVEBRShaderStore.getShaderData(this.data.data.effectId);
    if (!shaderData) {
      throw new Error(
        `Could not find shader data for ${this.data.data.effectId}`
      );
    }

    const shaderMaterial = new ShaderMaterial(this.id, data.scene, this.id, {
      ...shaderData,
      needAlphaBlending: data.alphaBlending,
      needAlphaTesting: data.alphaTesting,
    });

    conatiner.materials.push(shaderMaterial);
    if (data.backFaceCulling !== undefined) {
      shaderMaterial.backFaceCulling = data.backFaceCulling;
    }
    //   shaderMaterial.needDepthPrePass = true;
    let liquid = false;
    if (this.id.includes("liquid")) {
      liquid = true;

      //  shaderMaterial.alpha = 0.5;
      //     shaderMaterial.disableDepthWrite = true;
      //   shaderMaterial.needDepthPrePass = true;
      //   shaderMaterial.separateCullingPass = false;
      shaderMaterial.forceDepthWrite = true;

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
    this._material.blockDirtyMechanism = true;
    //  this._material.markDirty()
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
      this.setTexture(texture.id, texture.shaderTexture);
      console.warn(animationTexture?.shaderTexture);
      this.setTexture(
        `${texture.id}_animation`,
        animationTexture!.shaderTexture
      );

      this._material.setInt(
        `${texture.id}_animation_size`,
        animationTexture!._size
      );
    }

    this.afterCreate.forEach((_) => _(this._material));
    return this._material;
  }
  setTextureArray(samplerId: string, sampler: Texture[]): void {
    this._material.setTextureArray(samplerId, sampler);
  }
  textures = new Map<string, ImageArrayTexture | Texture>();
  //@ts-ignore
  setTexture(samplerId: string, sampler: ImageArrayTexture | Texture): void {
    this._material.setTexture(samplerId, sampler!);

    this.textures.set(samplerId, sampler);
  }

  clone(scene: Scene) {
    const textures = new Map<string, ImageArrayTexture | Texture>();
    for (const [textId, texture] of this.textures) {
      this._material.removeTexture(textId);
    }

    const newMat = ShaderMaterial.Parse(this._material.serialize(), scene, "/");
    for (const [textId, texture] of this.textures) {
      if (texture instanceof ImageArrayTexture) {
        const newTexture = texture.copy(scene)!;
        textures.set(textId, newTexture);
        newMat.setTexture(textId, newTexture!);
        this._material.setTexture(textId, texture!);
      }
      if (texture instanceof RawTexture) {
        console.warn(
          texture.metadata.buffer,
          texture.getSize().width,
          texture.getSize().height,
          [texture.format, texture.textureType]
        );

        const newTexture = new RawTexture(
          texture.metadata.buffer || new ArrayBuffer(4),
          texture.getSize().width,
          texture.getSize().height,
          texture.format,
          scene,
          false,
          false,
          Texture.NEAREST_NEAREST,
          texture.textureType
        );
        textures.set(textId, newTexture);
        newMat.setTexture(textId, newTexture!);
        this._material.setTexture(textId, texture!);
      }
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
