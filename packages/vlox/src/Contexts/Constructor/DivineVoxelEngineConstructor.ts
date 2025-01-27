//threadcomm
import { Threads } from "@amodx/threads/";
import { ConstructorThreadManager } from "./ConstrcutorTheads.js";
export type DivineVoxelEngineConstructorInitData = {};
export class DivineVoxelEngineConstructor {
  static environment: "node" | "browser" = "browser";
  static instance: DivineVoxelEngineConstructor;
  TC = Threads;
  threads = new ConstructorThreadManager();
  constructor() {
    if (DivineVoxelEngineConstructor.instance)
      return DivineVoxelEngineConstructor.instance;
    DivineVoxelEngineConstructor.instance = this;
  }
}
