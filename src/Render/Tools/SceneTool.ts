import type { DVEFogTypes } from "Meta/Render/Render/Render.options.types";
import { NodeManager } from "../Nodes/NodeManager.js";
import { DVEBabylon } from "../Babylon/DVEBabylon.js";
import { RenderManager } from "../Render/RenderManager.js";

export class SceneTool {
 constructor() {}
 sky = {
  setColor: (r: number, g: number, b: number) => {
   return <SceneTool>this;
  },
 };
 fog = {
  setHeightFactor: (v: number) => {
   RenderManager.updateFogOptions({ volumetricOptions: { heightFactor: v } });
   NodeManager.materials.updateFogOptions(RenderManager.fogData);
   return <SceneTool>this;
  },
  setDensity: (v: number) => {
   RenderManager.updateFogOptions({ density: v });
   NodeManager.materials.updateFogOptions(RenderManager.fogData);
   return <SceneTool>this;
  },
  setMode: (mode: DVEFogTypes) => {
   RenderManager.updateFogOptions({ mode: mode });
   NodeManager.materials.updateFogOptions(RenderManager.fogData);
   return <SceneTool>this;
  },
  setColor: (r: number, g: number = r, b: number = r) => {
   RenderManager.updateFogOptions({
    color: new DVEBabylon.system.Color3(r, g, b),
   });
   NodeManager.materials.updateFogOptions(RenderManager.fogData);
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
