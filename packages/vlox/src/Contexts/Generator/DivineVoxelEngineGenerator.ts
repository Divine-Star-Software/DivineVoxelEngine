//threadcomm
import { Threads } from "@amodx/threads/";
import { GeneratorThreadsManager } from "./GeneratorThreads.js";

export class DivineVoxelEngineGenerator {
  static environment: "node" | "browser" = "browser";
  static instance: DivineVoxelEngineGenerator;
  TC = Threads;
  threads = new GeneratorThreadsManager();
  constructor() {
    if (DivineVoxelEngineGenerator.instance)
      return DivineVoxelEngineGenerator.instance;
    DivineVoxelEngineGenerator.instance = this;
  }
}
