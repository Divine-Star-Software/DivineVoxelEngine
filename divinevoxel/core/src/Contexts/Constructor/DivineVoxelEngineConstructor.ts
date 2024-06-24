//threadcomm
import { Threads } from "@amodx/threads/";
//functions
import InitWorker from "./InitWorker.js";
import { DVEConstructorCore } from "../../Interfaces/Constructor/DVEConstructorCore.js";
import { Environment } from "@amodx/core/Environment/Environment.js";

export type DivineVoxelEngineConstructorInitData = {
  core: DVEConstructorCore;
};


export class DivineVoxelEngineConstructor {
  static environment: "node" | "browser" = "browser";
  static instance: DivineVoxelEngineConstructor;

  TC = Threads;
  core: DVEConstructorCore;

  constructor() {
    if (DivineVoxelEngineConstructor.instance)
      return DivineVoxelEngineConstructor.instance;
    DivineVoxelEngineConstructor.instance = this;
  }

  async init(data: DivineVoxelEngineConstructorInitData) {
    this.core = data.core;
    await InitWorker(this);
  }
}

DivineVoxelEngineConstructor.environment = Environment.nodeJS.isNode
  ? "node"
  : "browser";
