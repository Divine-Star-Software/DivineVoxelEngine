import { Threads } from "@amodx/threads/";
import { NexusThreads } from "./NexusTheads.js";
export class DivineVoxelEngineNexus {
  static environment: "node" | "browser" = "browser";
  static instance: DivineVoxelEngineNexus;
  TC = Threads;
  threads = new NexusThreads();
  constructor(data: {}) {
    if (DivineVoxelEngineNexus.instance) return DivineVoxelEngineNexus.instance;
    DivineVoxelEngineNexus.instance = this;
  }
}
