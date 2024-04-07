//objects
import { Util } from "../Global/Util.helper.js";
import { EngineSettings } from "../Data/Settings/EngineSettings.js";
import { RenderManager } from "./Scene/RenderManager.js";
import { RenderTasks } from "./Tasks/RenderTasks.js";
import { ThreadComm } from "@divinestar/threads/";


//inter commsP
import {
  DataComm,
  NexusComm,
  WorldComm,
  ConstructorCommManager,
  RichWorldComm,
} from "./Threads/RenderThreads.js";
//functions
import InitWorkers from "./Init/InitThreads.js";
import { DataSyncNode } from "../Data/DataSyncNode.js";
import { DataManager } from "../Data/DataManager.js";

import type { EngineSettingsData } from "../Types/Data/Settings/EngineSettings.types";
import type { RecursivePartial } from "../Types/Util.types";
import { DVERenderer } from "../Interfaces/Render/DVERenderer.js";

export type DVERInitData = {
  worldWorker: Worker;
  constructorWorkers: Worker[];
  renderer: DVERenderer;

  nexusWorker?: Worker;
  dataWorker?: Worker;

  richWorldWorker?: Worker;
} & RecursivePartial<EngineSettingsData>;

export class DivineVoxelEngineRender {
  static instance: DivineVoxelEngineRender;
  static initialized = false;
  UTIL = Util;
  TC = ThreadComm;
  currentCom = ThreadComm.parent;
  worldComm = WorldComm;
  nexusComm = NexusComm;
  dataComm = DataComm;

  richWorldComm = RichWorldComm;
  constructorCommManager = ConstructorCommManager;

  settings = EngineSettings;
  render = RenderManager;

  renderer: DVERenderer;
  dataSyncNode = DataSyncNode;
  data = DataManager;

  tasks = RenderTasks;

  constructor() {
    if (DivineVoxelEngineRender.instance)
      return DivineVoxelEngineRender.instance;
    DivineVoxelEngineRender.instance = this;
  }
  async init(initData: DVERInitData) {
    if (DivineVoxelEngineRender.initialized) return;
    DivineVoxelEngineRender.initialized = true;
    await InitWorkers(this, initData);
    this.renderer = initData.renderer;
    await this.renderer.init(this);
  }

  /**# clearAll
   *---
   * Clear all world data and meshes.
   */
  async clearAll() {
    this.render.meshRegister.clearAll();
    await this.worldComm.runAsyncTasks("clear-all", "", []);

    await Promise.all(
      this.constructorCommManager.__comms.map((_) =>
        _.runAsyncTasks("clear-all", "")
      )
    );
  }
}
