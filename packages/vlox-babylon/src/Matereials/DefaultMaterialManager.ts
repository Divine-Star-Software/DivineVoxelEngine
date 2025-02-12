import { Vector4, Color3 } from "@babylonjs/core/Maths/";
import type { RenderFogOptions } from "../Shaders/Shader.types";
import { RecursivePartial } from "@divinevoxel/vlox/Util/Util.types";
import { DVEBabylonRenderer } from "../Renderer/DVEBabylonRenderer";
import { SceneTool } from "../Tools/SceneTool";
export class DefaultMaterialManager {
  static time = 0;
  static fogOptions: RenderFogOptions = {
    mode: "volumetric",
    color: [1, 1, 1],
    density: 0,
    volumetricOptions: {
      heightFactor: 0,
    },
  };
  static fogData = new Vector4();
  static uniforms = {
    lightGradient: [
      0.08, 0.12, 0.16, 0.21, 0.27, 0.34, 0.42, 0.50, 0.59, 0.68, 0.77, 0.85,
      0.91, 0.96, 0.99, 1,
    ],
  };
  
  static sceneTool: SceneTool;
  static init() {
    this.sceneTool = new SceneTool();
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
    for (const [id, mat] of DVEBabylonRenderer.instance.materials
      .materials) {
      
      mat.setNumberArray("lightGradient", this.uniforms.lightGradient);
    }
  }

  static sync() {
    this.updateFogData(this.fogData);

    this.sceneTool.levels.setBase(this.sceneTool.levels.baseLevel);
    this.sceneTool.levels.setSun(this.sceneTool.levels.sunLevel);
    this.sceneTool.options.doAO(this.sceneTool.options.isDoingAO);
    this.sceneTool.options.doRGB(this.sceneTool.options.isDoingRGB);
    this.sceneTool.options.doSun(this.sceneTool.options.isDoingSun);
    this.sceneTool.options.doColor(this.sceneTool.options.isDoingColor);
    this.sceneTool.options.doEffects(this.sceneTool.options.isDoingEffects);
    this.sceneTool.fog.setMode(this.sceneTool.fog.mode);
    this.sceneTool.fog.setColor(...this.sceneTool.fog.color);
    this.sceneTool.fog.setDensity(this.sceneTool.fog.denisty);
    this.sceneTool.fog.setHeightFactor(this.sceneTool.fog.heightFactor);
  }

  static updateUniforms() {
    const position = DVEBabylonRenderer.instance.foManager.activeNode?.position;
    if (!position) return;
    for (const [id, mat] of DVEBabylonRenderer.instance.materials
      .materials) {
      mat.setVector3("worldOrigin", position.x, position.y, position.z);
    }
  }

  static runEffects() {
    for (const [id, mat] of DVEBabylonRenderer.instance.materials
      .materials) {
      mat.setNumber("time", this.time);
      this.time += 0.1;
    }
  }

  static updateFogData(data: Vector4) {
    for (const [id, mat] of DVEBabylonRenderer.instance.materials
      .materials) {
      mat.setVector4("fogOptions", data.x, data.y, data.z, data.w);
    }
  }

  static setSunLevel(level: number) {
    for (const [id, mat] of DVEBabylonRenderer.instance.materials
      .materials) {
      mat.setNumber("sunLightLevel", level);
    }
  }
  static setBaseLevel(level: number) {
    for (const [id, mat] of DVEBabylonRenderer.instance.materials
      .materials) {
      mat.setNumber("baseLevel", level);
    }
  }

  static setOption(id: string, value: boolean) {
    for (const [matid, mat] of DVEBabylonRenderer.instance.materials
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

    if (options.color && DVEBabylonRenderer.instance.scene) {
      DVEBabylonRenderer.instance.scene.fogColor = new Color3(
        ...this.fogOptions.color
      );
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
