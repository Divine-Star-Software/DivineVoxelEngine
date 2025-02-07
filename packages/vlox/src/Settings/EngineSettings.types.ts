import { Vector3Like } from "@amodx/math";
export interface MesherSettingsData {}
export class MesherSettingsData {
  /**Tell the mesher to shade voxel faces with sun light data. Disable if you are using a custom renderering pipeline. */
  doSunLight = true;
  /**Tell the mesher to use the built in AO system. Disable if you are using a custom renderering pipeline. */
  doAO = true;
  doColors = true;
}
export interface RenderSettingsData {}
export class RenderSettingsData {
  /**Set the mode to change how mesh data is generated based on the underlying rendering API. */
  mode: "webgl" | "webgpu" = "webgl";
  /**If set to try the engine will not try to send vertex buffers to woerks for GC. */
  cpuBound = false;
}
export interface UpdatingSettings {}
export class UpdatingSettings {
  /**Sector sections are marked as dirty so they can be processed later. */
  dirtyMechanism = true;
  /**Updated sector sections are auto rebuilt */
  autoRebuild = false;
}
export interface WorldSettings {}
export class WorldSettings {
  min = Vector3Like.Create(
    -Number.MAX_SAFE_INTEGER,
    0,
    -Number.MAX_SAFE_INTEGER
  );
  max = Vector3Like.Create(
    Number.MAX_SAFE_INTEGER,
    256,
    Number.MAX_SAFE_INTEGER
  );
}
export interface SectorSettings {}
export class SectorSettings {
  power2Size = Vector3Like.Create(4, 8, 4);
}
export interface SectionSettings {}
export class SectionSettings {
  power2Size = Vector3Like.Create(4, 4, 4);
}

export interface FlowSettings {}
export class FlowSettings {
  enable = true;
}
export interface LightingSettings {}
export class LightingSettings {
  rgbLightEnabled = true;
  sunLightEnabled = true;
}

export class EngineSettingsData {
  mesher = new MesherSettingsData();
  rendererSettings = new RenderSettingsData();
  updating = new UpdatingSettings();
  world = new WorldSettings();
  sectors = new SectorSettings();
  sections = new SectionSettings();
  flow = new FlowSettings();
  lighting = new LightingSettings();
}
