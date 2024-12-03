import { Engine, Material, PBRBaseMaterial, Scene } from "@babylonjs/core";

import { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial";
import { Vector3, Vector4 } from "@babylonjs/core/Maths/";

import { URIShader } from "@amodx/uri/Shaders/Classes/URIShader";
import {
  URIMaterial,
  URIMaterialData,
} from "@amodx/uri/Materials/URIMaterial.js";
import { DVEBRScene } from "../../Renderer/Scene/DVEBRScene.js";
import { URIScene } from "@amodx/uri/Scenes/URIScene.js";
import { URITexture } from "@amodx/uri/Textures/URITexture.js";
import { DVEPBRMaterialPlugin } from "./DVEPBRMaterialPlugin";
import { IMatrixLike } from "@babylonjs/core/Maths/math.like";
import { TextureManager } from "@divinevoxel/vlox/Textures/TextureManager";
import { DefaultMaterialManager } from "../DefaultMaterialManager.js";
import { TextureType } from "@divinevoxel/vlox/Textures/TextureType";
import { DVEBRTexture } from "Renderer/Textures/DVEBRTexture.js";
type DVEBRPBRMaterialBaseData = {
  textureTypeId: string;
  shaderId: string;

  material?: PBRBaseMaterial;
  plugin?: DVEPBRMaterialPlugin;
  textures?: Map<string, DVEBRTexture>;
};

export type DVEBRPBRMaterialData = URIMaterialData<
  DVEBRScene,
  DVEBRPBRMaterialBaseData
>;

export class DVEBRPBRMaterial extends URIMaterial<
  DVEBRScene,
  DVEBRPBRMaterialBaseData,
  PBRMaterial
> {
  static ready = false;
  scene: Scene;

  plugin: DVEPBRMaterialPlugin;
  shader: URIShader;
  texture: TextureType;

  afterCreate: ((material: PBRMaterial) => void)[] = [];
  constructor(
    public id: string,
    public data: DVEBRPBRMaterialData
  ) {
    super();
  }

  createMaterial(scene: Scene): PBRMaterial | false {
    this.scene = scene;
    this._create(this.data);
    return this._material;
  }

  _create(data: DVEBRPBRMaterialData): PBRMaterial {
    const textureType = TextureManager.getTextureType(
      data.data.textureTypeId ? data.data.textureTypeId : this.id
    );

    this.scene = data.scene._scene;
    if (!textureType && data.data.textureTypeId) {
      throw new Error(
        `Could find the texture type for material ${this.id}. Texture typeid:  ${data.data.textureTypeId}`
      );
    } else if (textureType) {
      this.texture = textureType;
    }

    const shader = DefaultMaterialManager.shaders.register.get(
      data.data.shaderId
    );

    if (!shader) {
      throw new Error(
        `Could find the shader for material ${this.id}. Shader id:  ${data.data.shaderId}`
      );
    }
    if (textureType) textureType.addToShader(shader);

    this.shader = shader;
    shader.compile();
    const material = new PBRMaterial(shader.id, data.scene._scene);
    let synced = false;
    material.onBind = () => {
      const effect = this._material.getEffect();

      if (this?.texture) {
        for (const [segment, textureSemgnet] of this.texture.segments) {
          if (!textureSemgnet.shaderTexture) {
            continue;
          }

          effect.setTexture(
            textureSemgnet.textureID,
            textureSemgnet.shaderTexture._texture
          );
        }
      }

      if (!synced) {
        DefaultMaterialManager.sync();
        synced = true;
      }
    };
    const pluginId = `${this.id.replace("#", "")}`;

    const pluginBase = DVEPBRMaterialPlugin;
    const newPlugin = new Function(
      "extendedClass",
      /* js */ `
      return class ${pluginId} extends extendedClass {
        getClassName() {
          return ${pluginId};
        }
      };
    `
    )(pluginBase);

    const plugin = new newPlugin(material, pluginId, this, () => {});
    this.plugin = plugin;
    this._material = material;

    if (this.data.alphaTesting) {
      material.alphaMode = Material.MATERIAL_ALPHATEST;
    }
    /*   if (this.data.stencil) {
      material.stencil.enabled = true;
      material.stencil.func = Engine.NOTEQUAL;
      this.scene.setRenderingAutoClearDepthStencil(0, false, false, false);
    } */
    if (this.data.backFaceCulling !== undefined) {
      material.backFaceCulling = this.data.backFaceCulling;
    }
    if (this.id.includes("liquid")) {
      material.roughness = 0.1;
      material.reflectionColor.set(0.1, 0.1, 0.1);
      material.metallic = 1;
      material.reflectivityColor.set(0.8, 0.8, 0.8);
      //  material.wireframe = true;
      material.alphaMode = Material.MATERIAL_ALPHABLEND;

      material.alpha = 0.7;
    } else {
      material.metallic = 0.0;
      material.roughness = 0;
      material.reflectionColor.set(0, 0, 0);
    }
    material.emissiveColor;
    // material.sheen.isEnabled = false;
    // material.sheen.intensity = 0;
    //  material.emissiveColor.set(0,0,0);
    // material.ambientColor.set(0,0,0);
    material.anisotropy.dispose();

    //  material.wireframe = true;
    //  material.refraction.set(0.1,0.1,0.1);
    return this._material;
  }

  setTextureArray(
    samplerId: string,
    sampler: URITexture<URIScene<any>, any>[]
  ): void {
    throw new Error(`Function not implemented`);
  }
  textures = new Map<string, DVEBRTexture>();
  setTexture(samplerId: string, sampler: DVEBRTexture): void {
    if (!this.plugin.uniformBuffer) return;
    this.plugin.uniformBuffer.setTexture(samplerId, sampler._texture);
    this.textures.set(samplerId, sampler);
  }
  clone(scene: Scene) {
    for (const [textId, texture] of this.textures) {
      this.plugin.uniformBuffer.setTexture(textId, null);
    }
    const pluginId = `${this.id.replace("#", "")}`;

    const pluginBase = DVEPBRMaterialPlugin;
    const newPlugin = new Function(
      "extendedClass",
      /* js */ `
      return class ${pluginId} extends extendedClass {
        getClassName() {
          return ${pluginId};
        }
      };
    `
    )(pluginBase);
    const newMat = PBRMaterial.Parse(
      this._material.serialize(),
      scene,
      "/"
    )! as PBRMaterial;
    const plugin = new newPlugin(
      newMat,
      pluginId,
      this,
      () => {}
    ) as DVEPBRMaterialPlugin;

    const textures = new Map<string, DVEBRTexture>();
    for (const [textId, texture] of this.textures) {
      const newTexture = texture.clone(scene)!;
      textures.set(textId, newTexture);
      plugin.uniformBuffer.setTexture(textId, newTexture._texture);
      this.plugin.uniformBuffer.setTexture(textId, texture._texture!);
    }

    const mat =  new DVEBRPBRMaterial(this.id, {
      ...this.data,
      data: {
        ...this.data.data,
        material: newMat,
        plugin,
        textures,
      },
    });
    mat.plugin = plugin;
    mat._material = newMat;
    mat.textures = textures;
    return mat;
  }

  setNumber(uniform: string, value: number): void {
    if (!this.plugin.uniformBuffer) return; // console.warn(`Material is not ready ${uniform} ${this.id}`);
    this.plugin.uniformBuffer.updateFloat(uniform, value);
  }
  setNumberArray(uniform: string, value: ArrayLike<number>): void {
    if (!this.plugin.uniformBuffer)
      return console.warn(`Material is not ready ${uniform}`);
    this.plugin.uniformBuffer.updateArray(uniform, value as any);
  }
  setVector2(uniform: string, x: number, y: number): void {
    throw new Error(`Function not implemented`);
  }
  setVector3(uniform: string, x: number, y: number, z: number): void {
    if (!this.plugin.uniformBuffer) return;
    this.plugin.uniformBuffer.updateVector3(uniform, new Vector3(x, y, z));
  }
  setVector4(
    uniform: string,
    x: number,
    y: number,
    z: number,
    w: number
  ): void {
    if (!this.plugin.uniformBuffer) return;
    this.plugin.uniformBuffer.updateVector3(uniform, new Vector4(x, y, z, w));
  }
  setMatrix<MatrixType = IMatrixLike>(
    uniform: string,
    matrix: MatrixType
  ): void {
    if (!this.plugin.uniformBuffer) return;
    this.plugin.uniformBuffer.updateMatrix(uniform, matrix as IMatrixLike);
  }
}
