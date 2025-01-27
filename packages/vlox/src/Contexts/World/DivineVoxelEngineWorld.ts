//objects
import { EngineSettings } from "../../Settings/EngineSettings.js";

//functions
import { Threads } from "@amodx/threads/";
import { WorldThreadManager } from "./WorldThreads.js";

/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker context.
 */

export class DivineVoxelEngineWorld {
  static environment: "node" | "browser" = "browser";
  static instance: DivineVoxelEngineWorld;

  TC = Threads;
  settings = EngineSettings;
  threads = new WorldThreadManager();

  constructor() {
    if (DivineVoxelEngineWorld.instance) return DivineVoxelEngineWorld.instance;
    DivineVoxelEngineWorld.instance = this;
  }
}
