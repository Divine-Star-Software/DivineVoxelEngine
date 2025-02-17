//objects
import { EngineSettings } from "../../Settings/EngineSettings.js";
import { Threads } from "@amodx/threads/";

//functions
import type { EngineSettingsData } from "../../Settings/EngineSettings.types.js";
import type { RecursivePartial } from "../../Util/Util.types.js";
import { DVERenderer } from "../../Renderer/DVERenderer.js";
import { MeshManager } from "../../Renderer/MeshManager.js";
import { MeshRegister } from "../../Renderer/MeshRegister.js";

import { DVERenderThreads } from "./DVERenderThreads.js";

type PartialEngineSettings = RecursivePartial<EngineSettingsData>;
export interface DVERInitData extends PartialEngineSettings {
  worldWorker: Worker;
  mesherWorkers: Worker[];
  generatorWorkers: Worker[];
  renderer: DVERenderer;
  nexusWorker?: Worker;
}

export class DivineVoxelEngineRender {
  static instance: DivineVoxelEngineRender;
  static initialized = false;
  TC = Threads;

  settings = EngineSettings;
  meshManager = MeshManager;
  meshRegister = MeshRegister;

  renderer: DVERenderer;
  threads = new DVERenderThreads();

  constructor() {
    if (DivineVoxelEngineRender.instance)
      return DivineVoxelEngineRender.instance;
    DivineVoxelEngineRender.instance = this;
  }

  /**# clearAll
   *---
   * Clear all world data and meshes.
   */
  async clearAll() {
    this.meshRegister.clearAll();
    await Promise.all([
      this.threads.world.runTaskAsync("clear-all", ""),
      ...this.threads.meshers
        .getThreads()
        .map((_) => _.runTaskAsync("clear-all", "")),
      ...this.threads.generators
        .getThreads()
        .map((_) => _.runTaskAsync("clear-all", "")),
    ]);
  }
}
