import { Vector3Like } from "@amodx/math";

export interface RenderSettingsData {}
export class RenderSettingsData {
  mode: "webgl" | "webgpu" = "webgl";
  cpuBound = false;
}
export interface TextureSettings {}
export class TextureSettings {
  textureSize = 16;
}
export interface UpdatingSettings {}
export class UpdatingSettings {
  autoRebuild = true;
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
export interface VoxelSettings {}
export class VoxelSettings {
  doColors = true;
}
export interface FlowSettings {}
export class FlowSettings {
  enable = true;
  baseFlowLimit = 200;
}
export interface LightingSettings {}
export class LightingSettings {
  doAO = true;
  doSunLight = true;
  doRGBLight = true;
  autoRGBLight = true;
  autoSunLight = true;
}

export class EngineSettingsData {
  rendererSettings = new RenderSettingsData();
  textures = new TextureSettings();
  updating = new UpdatingSettings();
  world = new WorldSettings();
  sectors = new SectorSettings();
  sections = new SectionSettings();
  voxels = new VoxelSettings();
  flow = new FlowSettings();
  lighting = new LightingSettings();
}
