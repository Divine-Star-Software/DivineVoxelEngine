import type { RenderFogOptions } from "@divinevoxel/foundation/Default/Shaders/Types/Shader.types.js";
import { RecursivePartial } from "@divinevoxel/core";
import { DVEThreeRenderer } from "../../DVEThreeRenderer";
import { DVEShaders } from "@divinevoxel/foundation/Default/Shaders/DVEShaders";
import { Vector4 } from "three";
export class DefaultMaterialManager {
  static time = 0;
  static shaders = DVEShaders;
  static fogOptions: RenderFogOptions = {
    mode: "volumetric",
    color: [1, 1, 1],
    density: 0,
    volumetricOptions: {
      heightFactor: 0,
    },
  };
  static fogData = new Vector4();
  static unifrosm = {
    //defines the light value gradient for voxxel lighting
    lightGradient: [
      0.06, 0.1, 0.11, 0.14, 0.17, 0.21, 0.26, 0.31, 0.38, 0.45, 0.54, 0.64,
      0.74, 0.85, 0.97, 1,
    ],
  };

  static init() {
    this.fogData = new Vector4();
    this.fogOptions = {
      mode: "volumetric",
      density: 0.0005,
      color: [1, 1, 1],
      volumetricOptions: {
        heightFactor: 0.25,
      },
    };
    this.updateFogOptions(this.fogOptions);
    for (const [id, mat] of DVEThreeRenderer.instance.nodes.materials
      .materials) {
      mat.setNumberArray("lightGradient", this.unifrosm.lightGradient);
    }
  }

  static updateUniforms() {
    const position = DVEThreeRenderer.instance.foManager.activeNode?.position;
    if (!position) return;
    for (const [id, mat] of DVEThreeRenderer.instance.nodes.materials
      .materials) {
      mat.setVector3("worldOrigin", position.x, position.y, position.z);
    }
  }

  static runEffects() {
    for (const [id, mat] of DVEThreeRenderer.instance.nodes.materials
      .materials) {
      mat.setNumber("time", this.time);
    }
  }

  static updateFogData(data: Vector4) {
    console.log("update fog", DVEThreeRenderer.instance);
    for (const [id, mat] of DVEThreeRenderer.instance.nodes.materials
      .materials) {
      mat.setVector4("fogOptions", data.x, data.y, data.z, data.w);
    }
  }

  static setSunLevel(level: number) {
    for (const [id, mat] of DVEThreeRenderer.instance.nodes.materials
      .materials) {
      mat.setNumber("sunLightLevel", level);
    }
  }
  static setBaseLevel(level: number) {
    for (const [id, mat] of DVEThreeRenderer.instance.nodes.materials
      .materials) {
      mat.setNumber("baseLevel", level);
    }
  }

  static setOption(id: string, value: boolean) {
    for (const [matid, mat] of DVEThreeRenderer.instance.nodes.materials
      .materials) {
      mat.setNumber(id, value ? 1 : 0);
    }
  }

  static updateFogOptions(options: RecursivePartial<RenderFogOptions>) {
    for (const key of Object.keys(options)) {
      //@ts-ignore
      const data = options[key];
      if (typeof data == "object") {
        for (const key2 of Object.keys(data)) {
          const data2 = data[key2];
          (this as any).fogOptions[key][key2] = data2;
        }
      } else {
        (this as any).fogOptions[key] = data;
      }
    }

    if (options.color && DVEThreeRenderer.instance.scene) {
      /*  DVEThreeRenderer.instance.scene._scene.fogColor = new Color3(
        ...this.fogOptions.color
      ); */
    }

    if (this.fogOptions.mode == "volumetric") {
      this.fogData.x = 1;
    }
    if (this.fogOptions.mode == "animated-volumetric") {
      this.fogData.x = 2;
    }
    this.fogData.y = this.fogOptions.density;
    this.fogData.z = this.fogOptions.volumetricOptions.heightFactor;
    this.fogData = this.fogData;
    this.updateFogData(this.fogData);
  }
}
