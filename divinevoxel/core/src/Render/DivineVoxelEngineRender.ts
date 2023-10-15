//types
import {  type Scene } from "@babylonjs/core";
//objects
import { Util } from "../Global/Util.helper.js";
import { EngineSettings } from "../Data/Settings/EngineSettings.js";
import { RenderManager } from "./Scene/RenderManager.js";
import {Effect} from "@babylonjs/core/Materials/effect";
import { RenderTasks } from "./Tasks/RenderTasks.js";
import { WorldBounds } from "../Data/World/WorldBounds.js";
import { ThreadComm } from "@divinestar/threads/";
import { WorldSpaces } from "../Data/World/WorldSpaces.js";
import { SceneTool } from "./Tools/SceneTool.js";
import "@babylonjs/core/Meshes/thinInstanceMesh";
//inter commsP
import {
  DataComm,
  FXComm,
  NexusComm,
  WorldComm,
  ConstructorCommManager,
  RichWorldComm,
} from "./Threads/RenderThreads.js";
//functions
import { InitWorkers } from "./Init/InitThreads.js";
import { $INITFunction } from "./Init/InitRender.js";
import { RichDataTool } from "../Tools/Data/RichDataTool.js";
import { NodeMeshTool } from "./Tools/NodeMeshTool.js";
import { NodeManager } from "./Nodes/NodeManager.js";
import { DataSyncNode } from "../Data/DataSyncNode.js";
import { DataManager } from "../Data/DataManager.js";

import type { EngineSettingsData } from "../Types/Data/Settings/EngineSettings.types";
import type { RecursivePartial } from "../Types/Util.types";

export type DVERInitData = {
  worldWorker: Worker;
  constructorWorkers: Worker[];
  scene?: Scene;
  nexusWorker?: Worker;
  dataWorker?: Worker;
  fxWorker?: Worker;
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
  fxComm = FXComm;
  richWorldComm = RichWorldComm;
  constructorCommManager = ConstructorCommManager;

  settings = EngineSettings;
  render = RenderManager;

  dataSyncNode = DataSyncNode;
  data = DataManager;

  nodes = NodeManager;

  tasks = RenderTasks;

  constructor() {
    if (DivineVoxelEngineRender.instance)
      return DivineVoxelEngineRender.instance;
    DivineVoxelEngineRender.instance = this;
  }
  async init(initData: DVERInitData) {
    if(DivineVoxelEngineRender.initialized) return;
    DivineVoxelEngineRender.initialized = true;
    await InitWorkers(this, initData);
    if (initData.scene) {
      await $INITFunction(this, initData.scene);
    }

    console.log(Effect.ShadersStore);
  }

  getSceneTool() {
    return new SceneTool();
  }
  getRichDataTool() {
    return new RichDataTool();
  }
  getNodeMeshTool() {
    return new NodeMeshTool();
  }
}
