import type { DVEFogTypes } from "Meta/Render/Render/Render.options.types";
import { DVEBabylon } from "../Babylon/DVEBabylon.js";
import { RenderManager } from "../Render/RenderManager.js";

export class SceneTool {
 constructor() {
  this.sky._s = this;
  this.fog._s = this;
  this.effects._s = this;
  this.levels._s = this;
 }
 sky = {
  _s: <SceneTool>{},
  setColor(r: number, g: number, b: number) {
   //todo
   return this._s;
  },
 };
 fog = {
  _s: <SceneTool>{},
  setHeightFactor(v: number) {
   RenderManager.updateFogOptions({ volumetricOptions: { heightFactor: v } });
   return this._s;
  },
  setDensity(v: number) {
   RenderManager.updateFogOptions({ density: v });
   return this._s;
  },
  setMode(mode: DVEFogTypes) {
   RenderManager.updateFogOptions({ mode: mode });
   return this._s;
  },
  setColor(r: number, g: number = r, b: number = r) {
   RenderManager.updateFogOptions({ color: new DVEBabylon.system.Color3(r, g, b) });
   return this._s;
  },
 };
 effects = {
  _s: <SceneTool>{},
  setFloraEffects(enabled: boolean) {
   RenderManager.updateShaderEffectOptions({ floraEffects: enabled });
   return this._s;
  },
  setLiquidEffects(enabled: boolean) {
   RenderManager.updateShaderEffectOptions({ liquidEffects: enabled });
   return this._s;
  },
 };
 levels = {
  _s: <SceneTool>{},
  setBase(v: number) {
   RenderManager.setBaseLevel(v);
   return this._s;
  },
  setSun(v: number) {
   RenderManager.setSunLevel(v);
   return this._s;
  },
 };
}
