//objects
import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { RenderTasks } from "./Tasks/RenderTasks.js";
import { Threads } from "@amodx/threads/";

//functions
import InitThreads from "./InitThreads.js";

import type { EngineSettingsData } from "../../Types/EngineSettings.types.js";
import type { RecursivePartial } from "../../Types/Util.types";
import { DVERenderer } from "../../Interfaces/Render/DVERenderer.js";
import { MeshManager } from "./Scene/MeshManager.js";
import { MeshRegister } from "./Scene/MeshRegister.js";

import { DVEDataCore } from "../../Data/DVEDataCore.js";
import { DVERenderThreads } from "./DVERenderThreads.js";

type PartialEngineSettings = RecursivePartial<EngineSettingsData>;
export interface DVERInitData extends PartialEngineSettings {
  worldWorker: Worker;
  constructorWorkers: Worker[];
  renderer: DVERenderer;
  nexusWorker?: Worker;
  richWorldWorker?: Worker;
}

export class DivineVoxelEngineRender {
  static instance: DivineVoxelEngineRender;
  static initialized = false;
  TC = Threads;

  settings = EngineSettings;
  meshManager = MeshManager;
  meshRegister = MeshRegister;

  renderer: DVERenderer;

  tasks = RenderTasks;

  threads = new DVERenderThreads();
  data = new DVEDataCore();

  constructor() {
    if (DivineVoxelEngineRender.instance)
      return DivineVoxelEngineRender.instance;
    DivineVoxelEngineRender.instance = this;
  }

  async init(props: DVERInitData) {
    if (DivineVoxelEngineRender.initialized) return;
    DivineVoxelEngineRender.initialized = true;
    this.renderer = props.renderer;

    if (props.nexusWorker) {
      this.threads.nexus.setPort(props.nexusWorker);
      this.threads.addThread(this.threads.nexus);
    }
    if (props.richWorldWorker) {
      this.threads.richWorld.setPort(props.richWorldWorker);
      this.threads.addThread(this.threads.richWorld);
    }
    await InitThreads(this, props);
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
      this.threads.construcotrs
        .getThreads()
        .map((_) => _.runAsyncTasks("clear-all", ""))
    );
  }
}
