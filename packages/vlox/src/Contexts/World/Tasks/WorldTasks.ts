import type { LocationData } from "../../../Math/index.js";

import { Threads } from "@amodx/threads/";
//data
import { WorldRegister } from "../../../Data/World/WorldRegister.js";

import {
  LoadRegionHeadertasks,
  WorldLockTasks,
  LoadColumnDataTasks,
} from "../../../Types/Tasks.types.js";
import { RegionHeaderRegister } from "../../../Data/RegionHeaderRegister.js";
import { DataLoaderTool } from "../../../DataLoader/World/Tools/DataLoaderTool.js";
import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";
import { WorldLock } from "../Lock/WorldLock.js";

import { ColumnData } from "../../../Data/World/Classes/Column.js";
import { DivineVoxelEngineWorld } from "../index.js";
import { DataSync } from "../Data/DataSync.js";

export class WorldTasks {
  constructor(public DVEW: DivineVoxelEngineWorld) {}

  loadColumn(location: LocationData, column: ColumnData) {
    WorldRegister.instance.setDimension(location[0]);
    WorldRegister.instance.column.add(
      location[1],
      location[2],
      location[3],
      column
    );
    DataSync.instance.worldData.column.sync(location);
  }
  unLoadColumn(location: LocationData) {
    if (WorldLock.isLocked(location)) return false;

    this.DVEW.dataSync.worldData.column.unSync(location);
    WorldRegister.instance.setDimension(location[0]);
    WorldRegister.instance.column.remove(location[1], location[2], location[3]);
    const region = WorldRegister.instance.region.get(
      location[1],
      location[2],
      location[3]
    );
    if (region && region.columns.size == 0) {
      WorldRegister.instance.region.remove(
        location[1],
        location[2],
        location[3]
      );
      this.DVEW.dataSync.worldData.region.unSync(location);
      return true;
    }
    return false;
  }

  loadRegionHeader(location: LocationData, data: SharedArrayBuffer) {
    RegionHeaderRegister.add(location, data);

    DataSync.instance.worldData.regionHeader.sync(location);
  }
}

export default function (DVEW: DivineVoxelEngineWorld) {
  const dataLoaderTool = new DataLoaderTool();
  const loadInMap: Map<string, boolean> = new Map();

  Threads.registerTasks("add-chunk", async (location: LocationData) => {
    WorldRegister.instance.setDimension(location[0]);
    const chunk = WorldRegister.instance.chunk.get(
      location[1],
      location[2],
      location[3]
    );

    if (chunk) {
      DVEW.dataSync.worldData.chunk.sync(location);
      return;
    }
    if (dataLoaderTool.isEnabled()) {
      WorldSpaces.column.getPositionXYZ(location[1], location[2], location[3]);
      const colunPos = WorldSpaces.column.getPosition();
      const columnLocation = <LocationData>[
        location[0],
        colunPos.x,
        colunPos.y,
        colunPos.z,
      ];
      if (loadInMap.has(columnLocation.toString())) return;
      loadInMap.set(columnLocation.toString(), true);
      const success = await dataLoaderTool.loadIfExists(columnLocation);
      loadInMap.delete(columnLocation.toString());
      if (!success) {
        WorldRegister.instance.setDimension(columnLocation[0]);
        WorldRegister.instance.column.fill(
          columnLocation[1],
          columnLocation[2],
          columnLocation[3]
        );
      }

      return;
    }

    if (!chunk) {
      WorldRegister.instance.setDimension(location[0]);
      WorldRegister.instance.column.fill(location[1], location[2], location[3]);
    }
  });
  Threads.registerTasks<WorldLockTasks>(
    "world-alloc",
    async (data, onDone) => {
      await WorldLock.addLock(data);
      if (onDone) onDone();
    },
    "deferred"
  );
  Threads.registerTasks<WorldLockTasks>(
    "world-dealloc",
    async (data, onDone) => {
      await WorldLock.removeLock(data);
      if (onDone) onDone();
    },
    "deferred"
  );
  Threads.registerTasks<LocationData>(
    "unload-column",
    (data, onDone) => {
      const resutls = DVEW.tasks.unLoadColumn(data);
      return onDone ? onDone(resutls) : resutls;
    },
    "deferred"
  );

  Threads.registerTasks<LoadRegionHeadertasks>(
    "load-region-header",
    ([location, data], onDone) => {
      const resutls = DVEW.tasks.loadRegionHeader(location, data);
      return onDone ? onDone(resutls) : resutls;
    }
  );
  Threads.registerTasks<LoadColumnDataTasks>(
    "load-column",
    ([location, column], onDone) => {
      const resutls = DVEW.tasks.loadColumn(location, column);
      return onDone ? onDone(resutls) : resutls;
    }
  );

  Threads.registerTasks("clear-all", () => {
    WorldRegister.instance.clearAll();
  });
}
