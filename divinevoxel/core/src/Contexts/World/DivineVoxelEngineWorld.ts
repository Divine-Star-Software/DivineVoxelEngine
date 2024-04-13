//objects
import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { Environment } from "@divinestar/utils/Environment/Environment.js";

//functions
import InitWorldWorker from "./InitWorker.js";
import { ThreadComm } from "@divinestar/threads/";
import { DVEWorldCore } from "Interfaces/World/DVEWorldCore.js";
/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker context.
 */
export class DivineVoxelEngineWorld {
  static environment: "node" | "browser" = "browser";
  static instance: DivineVoxelEngineWorld;
  TC = ThreadComm;
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
ThreadComm.threadName = "world";
