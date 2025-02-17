//threadcomm
import { Threads } from "@amodx/threads/";
import { MesherThreadsManager } from "./MesherTheads.js";

export class DivineVoxelEngineMesher {
  static environment: "node" | "browser" = "browser";
  static instance: DivineVoxelEngineMesher;
  TC = Threads;
  threads = new MesherThreadsManager();
  constructor() {
    if (DivineVoxelEngineMesher.instance)
      return DivineVoxelEngineMesher.instance;
    DivineVoxelEngineMesher.instance = this;
  }
}
