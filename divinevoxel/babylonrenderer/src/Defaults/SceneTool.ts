import type { DVEFogTypes } from "@divinevoxel/default/Shaders/Types/Shader.types.js";
import { DefaultMaterialManager } from "./DefaultMaterialManager";
export class SceneTool {
  constructor() {}
  sky = {
    setColor: (r: number, g: number, b: number) => {
      return <SceneTool>this;
    },
  };
  fog = {
    setHeightFactor: (v: number) => {
      DefaultMaterialManager.updateFogOptions({
        volumetricOptions: { heightFactor: v },
      });
      return <SceneTool>this;
    },
    setDensity: (v: number) => {
      DefaultMaterialManager.updateFogOptions({ density: v });
      return <SceneTool>this;
    },
    setMode: (mode: DVEFogTypes) => {
      DefaultMaterialManager.updateFogOptions({ mode: mode });
      return <SceneTool>this;
    },
    setColor: (r: number, g: number = r, b: number = r) => {
      DefaultMaterialManager.updateFogOptions({
        color: [r, g, b],
      });
      return <SceneTool>this;
    },
  };
  levels = {
    setBase: (v: number) => {
      DefaultMaterialManager.setBaseLevel(v);
      return <SceneTool>this;
    },
    setSun: (v: number) => {
      DefaultMaterialManager.setSunLevel(v);
      return <SceneTool>this;
    },
  };
  options = {
    doColor: (v: boolean) => {
      DefaultMaterialManager.setOption("doColor", v);
      return this.options;
    },
    doAO: (v: boolean) => {
      DefaultMaterialManager.setOption("doAO", v);
      return this.options;
    },
    doSun: (v: boolean) => {
      DefaultMaterialManager.setOption("doSun", v);
      return this.options;
    },
    doRGB: (v: boolean) => {
      DefaultMaterialManager.setOption("doRGB", v);
      return this.options;
    },
    doEffects: (v: boolean) => {
      DefaultMaterialManager.setOption("doEffects", v);
      return this.options;
    },
  };
}
