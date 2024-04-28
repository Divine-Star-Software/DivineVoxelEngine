//objects
import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { RenderTasks } from "./Tasks/RenderTasks.js";
import { ThreadComm } from "@divinestar/threads/";

//functions
import InitThreads from "./InitThreads.js";

import type { EngineSettingsData } from "../../Types/EngineSettings.types.js";
import type { RecursivePartial } from "../../Types/Util.types";
import { DVERenderer } from "../../Interfaces/Render/DVERenderer.js";
import { MeshManager } from "./Scene/MeshManager.js";
import { MeshRegister } from "./Scene/MeshRegister.js";
import { DVERenderCore } from "../../Interfaces/Render/DVERenderCore.js";
import { RenderThreadManager } from "../../Interfaces/Render/Threads/RenderThreads.js";

type PartialEngineSettings = RecursivePartial<EngineSettingsData>;
export interface DVERInitData extends PartialEngineSettings {
  worldWorker: Worker;
  constructorWorkers: Worker[];
  core: DVERenderCore;
  renderer: DVERenderer;
}

export class DivineVoxelEngineRender {
  static instance: DivineVoxelEngineRender;
  static initialized = false;
  TC = ThreadComm;

  settings = EngineSettings;
  meshManager = MeshManager;
  meshRegister = MeshRegister;

  renderer: DVERenderer;
  core: DVERenderCore;

  tasks = RenderTasks;

  get threads(): RenderThreadManager {
    return this.core.threads;
  }

  constructor() {
    if (DivineVoxelEngineRender.instance)
      return DivineVoxelEngineRender.instance;
    DivineVoxelEngineRender.instance = this;
  }

  async init(initData: DVERInitData) {
    if (DivineVoxelEngineRender.initialized) return;
    DivineVoxelEngineRender.initialized = true;
    this.renderer = initData.renderer;
    this.core = initData.core;
    await InitThreads(this, initData);
    await this.renderer.init(this);
  }

  /**# clearAll
   *---
   * Clear all world data and meshes.
   */
  async clearAll() {
    this.meshRegister.clearAll();
    await this.threads.world.runAsyncTasks("clear-all", "", []);

    await Promise.all(
      this.threads.construcotrs.__comms.map((_) =>
        _.runAsyncTasks("clear-all", "")
      )
    );
  }
}
