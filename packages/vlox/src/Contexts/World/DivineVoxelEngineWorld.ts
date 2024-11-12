//objects
import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { Environment } from "@amodx/core/Environment/Environment.js";

//functions
import InitWorldWorker from "./InitWorker.js";
import { Threads } from "@amodx/threads/";
import { WorldThreadManager } from "./Threads/WorldThreads.js";

import { DVEConstructorTasksQueues } from "../Constructor/Tasks/DVEConstructorTasksQueues.js";

import RegisterDataHooks from "./Data/WorldDataHooks.js";

import InitWorldTasks, { WorldTasks } from "./Tasks/WorldTasks";
import { Distance3D, Vector3Like } from "@amodx/math";
import { LocationData } from "../../Math";
import { WorldRegister } from "../../Data/World/WorldRegister";
import { DataSync } from "./Data/DataSync.js";
import { DataRegister } from "./Data/DataRegister.js";
import { DataStructBuilders } from "./Data/DataStructBuilders.js";
/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker context.
 */
export type DVEWorldProps = {
  nexusEnabled?: boolean;
  richWorldEnabled?: boolean;
  dataLoaderEnabled?: boolean;
};
export class DivineVoxelEngineWorld {
  static environment: "node" | "browser" = "browser";
  static instance: DivineVoxelEngineWorld;

  TC = Threads;
  settings = EngineSettings;
  threads: WorldThreadManager;
  dataSync: DataSync;
  queues: DVEConstructorTasksQueues;
  dataRegiser: DataRegister;
  dataTagBulders: DataStructBuilders;
  tasks = new WorldTasks(this);

  constructor(public props: DVEWorldProps = {}) {
    if (DivineVoxelEngineWorld.instance) return DivineVoxelEngineWorld.instance;
    DivineVoxelEngineWorld.instance = this;
    this.threads = new WorldThreadManager(props);

    this.dataSync = new DataSync();
    this.queues = new DVEConstructorTasksQueues(this.threads.constructors);
    this.dataRegiser = new DataRegister();
    this.dataTagBulders = new DataStructBuilders();
    InitWorldTasks(this);
  }

  async init() {
    await InitWorldWorker(this);
  }

  removeColumnsOutsideRadius(origion: LocationData, radius: number) {
    const [dimesnionId, x, y, z] = origion;
    const dimension = WorldRegister.instance.dimensions.get(dimesnionId);
    if (!dimension) return;
    dimension.regions.forEach((region) => {
      region.columns.forEach((column, index) => {
        WorldRegister.instance.columnTool.setColumn(column);
        const location = region.getColumnPosition(index);
        const distnace = Distance3D(location[0], 0, location[2], x, 0, z);
        if (distnace > radius) {
          this.dataSync.worldData.column.unSync([origion[0], ...location]);
          WorldRegister.instance.setDimension(origion[0]);
          WorldRegister.instance.column.remove(
            location[0],
            location[1],
            location[2]
          );
        }
      });
    });
  }
}

DivineVoxelEngineWorld.environment = Environment.nodeJS.isNode
  ? "node"
  : "browser";
Threads.threadName = "world";
