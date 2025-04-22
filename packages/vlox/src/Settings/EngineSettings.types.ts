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
  /**If set to try the engine will not try to send vertex buffers to workers for GC. */
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
  sectorPower2Size = Vector3Like.Create(4, 8, 4);
  sectionPower2Size = Vector3Like.Create(4, 4, 4);
}

export interface PropagationSettings {}
export class PropagationSettings {
  rgbLightEnabled = true;
  sunLightEnabled = true;
  flowEnabled = true;
  powerEnabled = true;
}

export interface MemoryAndCPUSettings {}
export class MemoryAndCPUSettings {
  useSharedMemory = true;
}

export class EngineSettingsData {
  memoryAndCPU = new MemoryAndCPUSettings();
  mesher = new MesherSettingsData();
  rendererSettings = new RenderSettingsData();
  updating = new UpdatingSettings();
  world = new WorldSettings();
  propagation = new PropagationSettings();
}
