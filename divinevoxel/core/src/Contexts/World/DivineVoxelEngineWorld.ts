//objects
import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { Environment } from "@amodx/core/Environment/Environment.js";

//functions
import InitWorldWorker from "./InitWorker.js";
import { Threads } from "@amodx/threads/";
import { DVEWorldCore } from "Interfaces/World/DVEWorldCore.js";
/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker context.
 */
export class DivineVoxelEngineWorld {
  static environment: "node" | "browser" = "browser";
  static instance: DivineVoxelEngineWorld;
  TC = Threads;
  settings = EngineSettings;

  core: DVEWorldCore;

  constructor() {
    if (DivineVoxelEngineWorld.instance) return DivineVoxelEngineWorld.instance;
    DivineVoxelEngineWorld.instance = this;
  }

  async init(core: DVEWorldCore) {
    this.core = core;
    await InitWorldWorker(this);
  }
}

DivineVoxelEngineWorld.environment = Environment.nodeJS.isNode
  ? "node"
  : "browser";
Threads.threadName = "world";
