//threadcomm
import { Threads } from "@amodx/threads/";
//functions
import InitWorker from "./InitWorker.js";

import { Environment } from "@amodx/core/Environment/Environment.js";

import { DVEDataCore } from "../../Data/DVEDataCore.js";
import ConstructorTasks from "./Tasks/ConstructorTasks.js";
import { ConstructorThreadManager } from "./Threads/ConstrcutorTheads.js";
import { DVEMesher, DVEMesherInitData } from "../../Mesher/Mesher.js";

export type DivineVoxelEngineConstructorInitData = {
  mesherData: DVEMesherInitData;
};

export class DivineVoxelEngineConstructor {
  static environment: "node" | "browser" = "browser";
  static instance: DivineVoxelEngineConstructor;

  TC = Threads;

  threads = new ConstructorThreadManager();
  data = new DVEDataCore();
  mesher: DVEMesher;
  constructor(data: DivineVoxelEngineConstructorInitData) {
    if (DivineVoxelEngineConstructor.instance)
      return DivineVoxelEngineConstructor.instance;
    DivineVoxelEngineConstructor.instance = this;

    this.mesher = new DVEMesher(data.mesherData);
    ConstructorTasks(this);
  }

  async init() {
    await InitWorker(this);
  }
}

DivineVoxelEngineConstructor.environment = Environment.nodeJS.isNode
  ? "node"
  : "browser";
