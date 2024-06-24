import type { DVEFogTypes } from "@divinevoxel/foundation/Default/Shaders/Types/Shader.types.js";
import { DefaultMaterialManager } from "../DefaultMaterialManager.js";
import { Vec3Array } from "@amodx/math";
export class SceneTool {
  constructor() {}

  fog = {
    heightFactor: 0,
    setHeightFactor: (v: number) => {
      DefaultMaterialManager.updateFogOptions({
        volumetricOptions: { heightFactor: v },
      });
      this.fog.heightFactor = v;
      return <SceneTool>this;
    },
    denisty: 0,
    setDensity: (v: number) => {
      DefaultMaterialManager.updateFogOptions({ density: v });
      this.fog.denisty = v;
      return <SceneTool>this;
    },
    mode: "exponential" as DVEFogTypes,
    setMode: (mode: DVEFogTypes) => {
      DefaultMaterialManager.updateFogOptions({ mode: mode });
      this.fog.mode = mode;
      return <SceneTool>this;
    },
    color: [0, 0, 0] as Vec3Array,
    setColor: (r: number, g: number = r, b: number = r) => {
      DefaultMaterialManager.updateFogOptions({
        color: [r, g, b],
      });
      this.fog.color = [r, g, b];
      return <SceneTool>this;
    },
  };
  levels = {
    baseLevel: 0,
    setBase: (v: number) => {
      DefaultMaterialManager.setBaseLevel(v);
      this.levels.baseLevel = v;
      return <SceneTool>this;
    },
    sunLevel: 0,
    setSun: (v: number) => {
      DefaultMaterialManager.setSunLevel(v);
      this.levels.sunLevel = v;
      return <SceneTool>this;
    },
  };
  options = {
    isDoingColor: false,
    doColor: (v: boolean) => {
      DefaultMaterialManager.setOption("doColor", v);
      this.options.isDoingColor = v;
      return this.options;
    },
    isDoingAO: false,
    doAO: (v: boolean) => {
      DefaultMaterialManager.setOption("doAO", v);
      this.options.isDoingAO = v;
      return this.options;
    },
    isDoingSun: false,
    doSun: (v: boolean) => {
      DefaultMaterialManager.setOption("doSun", v);
      this.options.isDoingSun = v;
      return this.options;
    },
    isDoingRGB: false,
    doRGB: (v: boolean) => {
      DefaultMaterialManager.setOption("doRGB", v);
      this.options.isDoingRGB = v;
      return this.options;
    },
    isDoingEffects: false,
    doEffects: (v: boolean) => {
      DefaultMaterialManager.setOption("doEffects", v);
      this.options.isDoingEffects = v;
      return this.options;
    },
  };
}
