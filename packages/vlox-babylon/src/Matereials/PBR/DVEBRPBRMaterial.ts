import { Material } from "@babylonjs/core/Materials/material";
import { PBRBaseMaterial } from "@babylonjs/core/Materials/PBR/pbrBaseMaterial";
import { Scene } from "@babylonjs/core/scene";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial";
import { Vector3, Vector4 } from "@babylonjs/core/Maths/";
import { DVEPBRMaterialPlugin } from "./DVEPBRMaterialPlugin";
import { IMatrixLike } from "@babylonjs/core/Maths/math.like";
import { MaterialData, MaterialInterface } from "../MaterialInterface.js";
import { SceneOptions } from "../../Scene/SceneOptions";

export type DVEBRPBRMaterialData = MaterialData<{
  textureTypeId: string;
  effectId: string;

  material?: PBRBaseMaterial;
  plugin?: DVEPBRMaterialPlugin;
  textures?: Map<string, Texture>;
}>;

export class DVEBRPBRMaterial implements MaterialInterface {
  static ready = false;
  _material: PBRMaterial;
  scene: Scene;

  plugin: DVEPBRMaterialPlugin;

  afterCreate: ((material: PBRMaterial) => void)[] = [];
  constructor(
    public options: SceneOptions,
    public id: string,
    public data: DVEBRPBRMaterialData
  ) {}

  createMaterial(scene: Scene) {
    this.scene = scene;
    this._create(this.data);
    return this;
  }

  _create(data: DVEBRPBRMaterialData): PBRMaterial {
    this.scene = data.scene;

    const material = new PBRMaterial(this.id, data.scene);
    let synced = false;
    material.onBind = () => {
      const effect = this._material.getEffect();

      /*      if (this?.texture) {
   

          effect.setTexture(
            this.texture.textureID,
            this.texture.shaderTexture!._texture
          );
        
      }
 */
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

  setTextureArray(samplerId: string, sampler: Texture[]): void {
    throw new Error(`Function not implemented`);
  }
  textures = new Map<string, Texture>();
  setTexture(samplerId: string, sampler: Texture): void {
    if (!this.plugin.uniformBuffer) return;
    this.plugin.uniformBuffer.setTexture(samplerId, sampler);
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

    const textures = new Map<string, Texture>();
    for (const [textId, texture] of this.textures) {
      const newTexture = texture.clone();
      textures.set(textId, newTexture);
      plugin.uniformBuffer.setTexture(textId, newTexture);
      this.plugin.uniformBuffer.setTexture(textId, texture!);
    }

    const mat = new DVEBRPBRMaterial(this.options, this.id, {
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
