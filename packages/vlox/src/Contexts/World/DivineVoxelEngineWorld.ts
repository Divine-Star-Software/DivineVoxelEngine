//objects
import { EngineSettings } from "../../Settings/EngineSettings.js";

//functions

import { Threads } from "@amodx/threads/";
import { WorldThreadManager } from "./WorldThreads.js";

import { DVEConstructorTasksQueues } from "../Constructor/Tasks/DVEConstructorTasksQueues.js";

import { WorldTasks } from "./Tasks/WorldTasks";
import { Distance3D } from "@amodx/math";
import { LocationData } from "../../Math";
import { WorldRegister } from "../../Data/World/WorldRegister";
import { DataSync } from "./Data/DataSync.js";

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

  dataSync = new DataSync();
  queues = new DVEConstructorTasksQueues(this.threads.constructors);

  tasks = new WorldTasks(this);

  constructor() {
    if (DivineVoxelEngineWorld.instance) return DivineVoxelEngineWorld.instance;
    DivineVoxelEngineWorld.instance = this;
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
