import type { DVEFogTypes } from "Meta/Render/Render/Render.options.types";
import { NodeManager } from "../Nodes/NodeManager.js";
import { DVEBabylon } from "../Nodes/DVEBabylon.js";
import { RenderManager } from "../Scene/RenderManager.js";

export class SceneTool {
 constructor() {}
 sky = {
  setColor: (r: number, g: number, b: number) => {
   return <SceneTool>this;
  },
 };
 fog = {
  setHeightFactor: (v: number) => {
   NodeManager.materials.updateFogOptions({
    volumetricOptions: { heightFactor: v },
   });
   return <SceneTool>this;
  },
  setDensity: (v: number) => {
   NodeManager.materials.updateFogOptions({ density: v });
   return <SceneTool>this;
  },
  setMode: (mode: DVEFogTypes) => {
   NodeManager.materials.updateFogOptions({ mode: mode });
   return <SceneTool>this;
  },
  setColor: (r: number, g: number = r, b: number = r) => {
   NodeManager.materials.updateFogOptions({
    color: new DVEBabylon.system.Color3(r, g, b),
   });
   return <SceneTool>this;
  },
 };
 levels = {
  setBase: (v: number) => {
   NodeManager.materials.setBaseLevel(v);
   return <SceneTool>this;
  },
  setSun: (v: number) => {
   NodeManager.materials.setSunLevel(v);
   return <SceneTool>this;
  },
 };
 options = {
  doColor: (v: boolean) => {
   NodeManager.materials.setOption("doColor", v);
   return this.options;
  },
  doAO: (v: boolean) => {
   NodeManager.materials.setOption("doAO", v);
   return this.options;
  },
  doSun: (v: boolean) => {
   NodeManager.materials.setOption("doSun", v);
   return this.options;
  },
  doRGB: (v: boolean) => {
   NodeManager.materials.setOption("doRGB", v);
   return this.options;
  },
  doEffects: (v: boolean) => {
   NodeManager.materials.setOption("doEffects", v);
   return this.options;
  },
 };
}
