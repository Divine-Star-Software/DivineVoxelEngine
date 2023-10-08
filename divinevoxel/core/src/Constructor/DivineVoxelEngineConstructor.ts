//types
import type { EngineSettingsData } from "Types/Data/Settings/EngineSettings.types.js";

//objects
import { EngineSettings } from "../Data/Settings/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { Builder } from "./Builder/Builder.js";
import { Propagation } from "./Propagation/Propagation.js";
import { WorldGeneration } from "./WorldGeneration/WorldGeneration.js";
import { Analyzer } from "./Analyzer/Analyzer.js";
//data
import { DataManager } from "../Data/DataManager.js";
import { DataSyncNode } from "../Data/DataSyncNode.js";
import { VoxelConstructors } from "./Builder/Constructors/Voxel/VoxelConstructors.js";
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

export class DivineVoxelEngineConstructor {
  static environment: "node" | "browser" = "browser";
  static instance: DivineVoxelEngineConstructor;

  UTIL = Util;
  settings = EngineSettings;

  propagation = Propagation;
  worldGen = WorldGeneration;
  builder = Builder;
  analyzer = Analyzer;

  dataSyncNode = DataSyncNode;
  data = DataManager;
  voxelManager = VoxelConstructors;

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

  async init() {
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
