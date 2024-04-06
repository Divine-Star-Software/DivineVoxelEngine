//types
import type { EngineSettingsData } from "Types/Data/Settings/EngineSettings.types.js";

//objects
import { EngineSettings } from "../Data/Settings/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { Propagation } from "./Propagation/Propagation.js";
import { WorldGeneration } from "./WorldGeneration/WorldGeneration.js";
import { Analyzer } from "./Analyzer/Analyzer.js";
//data
import { DataManager } from "../Data/DataManager.js";
import { DataSyncNode } from "../Data/DataSyncNode.js";
//threadcomm
import { ThreadComm } from "@divinestar/threads/";
import { WorldComm, ParentComm } from "./Threads/ConstrcutorTheads.js";
import { Tasks } from "./Tasks/ConstructorTasks.js";
//functions
import { InitWorker } from "./Init/InitWorker.js";
import { ConstructorHooks } from "./Hooks/ConstructorHooks.js";
import { RichDataTool } from "../Tools/Data/RichDataTool.js";
import { TasksRequest } from "./Tasks/TasksRequest.js";
import { DataTool } from "../Tools/Data/DataTool.js";
import { DVEBuilder } from "Interfaces/Builder/DVEBuilder.js";

export type DivineVoxelEngineConstructorInitData = {
  builder: DVEBuilder;
};

export class DivineVoxelEngineConstructor {
  static environment: "node" | "browser" = "browser";
  static instance: DivineVoxelEngineConstructor;

  UTIL = Util;
  settings = EngineSettings;

  propagation = Propagation;
  worldGen = WorldGeneration;
  builder: DVEBuilder;
  analyzer = Analyzer;

  dataSyncNode = DataSyncNode;
  data = DataManager;

  TC = ThreadComm;
  parentComm = ParentComm;
  worldCom = WorldComm;
  tasks = Tasks;
  hooks = ConstructorHooks;
  requests = TasksRequest;

  constructor() {
    if (DivineVoxelEngineConstructor.instance)
      return DivineVoxelEngineConstructor.instance;
    DivineVoxelEngineConstructor.instance = this;
  }

  async init(data: DivineVoxelEngineConstructorInitData) {
    this.builder = data.builder;
    await InitWorker(this);
  }

  getDataTool() {
    return new DataTool();
  }
  getRichDataTool() {
    return new RichDataTool();
  }
}

DivineVoxelEngineConstructor.environment = Util.getEnviorment();
