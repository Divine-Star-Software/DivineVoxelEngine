//objects
import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { ThreadComm } from "@divinestar/threads/";

//functions
import InitWorkers from "./InitThreads.js";

import type { EngineSettingsData } from "../../Types/EngineSettings.types.js";
import type { RecursivePartial } from "../../Types/Util.types";
import { DVERenderer } from "../../Interfaces/Render/DVERenderer.js";
import { DVERenderCore } from "Interfaces/Render/DVERenderCore.js";

type PartialEngineSettings = RecursivePartial<EngineSettingsData>;
export interface DVEHInitData extends PartialEngineSettings {
  worldWorker: Worker;
  constructorWorkers: Worker[];
  core: DVERenderCore;
  renderer: DVERenderer;
}

export class DivineVoxelEngineHeadless {
  static instance: DivineVoxelEngineHeadless;
  static initialized = false;
  TC = ThreadComm;

  settings = EngineSettings;

  core: DVERenderCore;

  get threads() {
    return this.core.threads;
  }

  constructor() {
    if (DivineVoxelEngineHeadless.instance)
      return DivineVoxelEngineHeadless.instance;
    DivineVoxelEngineHeadless.instance = this;
  }
  async init(initData: DVEHInitData) {
    if (DivineVoxelEngineHeadless.initialized) return;
    DivineVoxelEngineHeadless.initialized = true;
    await InitWorkers(this, initData);
    this.core = initData.core;
  }

  /**# clearAll
   *---
   * Clear all world data and meshes.
   */
  async clearAll() {
    await this.threads.world.runAsyncTasks("clear-all", "", []);

    await Promise.all(
      this.threads.construcotrs.__comms.map((_) =>
        _.runAsyncTasks("clear-all", "")
      )
    );
  }
}
