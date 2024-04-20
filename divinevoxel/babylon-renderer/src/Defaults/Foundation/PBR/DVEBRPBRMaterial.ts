import { Material, Scene } from "@babylonjs/core";

import { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial";
import { Vector3, Vector4 } from "@babylonjs/core/Maths/";

import { URIShader } from "@divinestar/uri/Shaders/Classes/URIShader";
import {
  URIMaterial,
  URIMaterialData,
} from "@divinestar/uri/Materials/URIMaterial.js";
import { DVEBRScene } from "Scene/DVEBRScene.js";
import { URIScene } from "@divinestar/uri/Scenes/URIScene.js";
import { URITexture } from "@divinestar/uri/Textures/URITexture.js";
import { DVEPBRMaterialPlugin } from "./DVEPBRMaterialPlugin";
import { IMatrixLike } from "@babylonjs/core/Maths/math.like";
import { TextureManager } from "@divinevoxel/foundation/Textures/TextureManager";
import { DefaultMaterialManager } from "../DefaultMaterialManager.js";
import { TextureType } from "@divinevoxel/foundation/Textures/TextureType";
type DVEBRPBRMaterialBaseData = {
  textureTypeId: string;
  shaderId: string;
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
  constructor(public id: string, public data: DVEBRPBRMaterialData) {
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
    if (this.id.includes("liquid")) {

      material.roughness = 0.1;
      //  material.refractionTexture = this.scene.environmentTexture;
      material.reflectionColor.set(0.1, 0.1, 0.1);
      material.metallic = 1;
      // material.reflectivityColor.set(1,1,1);
      material.reflectivityColor.set(1, 1, 1);
      //  material.linkRefractionWithTransparency = true;
      material.alphaMode = Material.MATERIAL_ALPHABLEND;
      material.backFaceCulling = false;
      //  material.refractionTexture = this.scene.environmentTexture;
      material.alpha = 0.9;
    } else {
      material.metallic = 0.0;
      material.roughness = 0;
      material.reflectionColor.set(0, 0, 0);
    }
  material.emissiveColor
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

  setTexture(samplerId: string, sampler: URITexture<URIScene<any>, any>): void {
    if (!this.plugin.uniformBuffer) return;
    this.plugin.uniformBuffer.setTexture(samplerId, sampler._texture);
  }

  setNumber(uniform: string, value: number): void {
    if (!this.plugin.uniformBuffer)
      return// console.warn(`Material is not ready ${uniform} ${this.id}`);
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
