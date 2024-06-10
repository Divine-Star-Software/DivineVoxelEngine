import type { LocationData } from "@divinevoxel/core/Math/index.js";

import { ThreadComm } from "@divinestar/threads/";
//data
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { WorldDataGenerator } from "../Data/Generators/WorldDataGenerator.js";
import { DVEFWorldCore } from "../DVEFWorldCore.js";
import {
  LoadRegionHeadertasks,
  LoadChunkDataTasks,
  WorldLockTasks,
  LoadRegionDataTasks,
  LoadColumnDataTasks,
} from "../../../Types/Tasks.types.js";
import { RegionDataTool } from "../../../Default/Tools/Data/WorldData/RegionDataTool.js";
import { ColumnDataTool } from "../../../Default/Tools/Data/WorldData/ColumnDataTool.js";
import { ChunkDataTool } from "../../../Default/Tools/Data/WorldData/ChunkDataTool.js";
import { RegionHeaderRegister } from "../../../Data/RegionHeaderRegister.js";
import { DataLoaderTool } from "../../../Default/DataLoader/World/Tools/DataLoaderTool.js";
import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces.js";
import { BuilderTool } from "../../../Default/Tools/Build/BuilderTool.js";
import { WorldLock } from "../Lock/WorldLock.js";
import { DVEFDataSync } from "../DVEFDataSync.js";
import { Region } from "../../../Data/World/Classes/Region.js";
import { Column, ColumnData } from "../../../Data/World/Classes/Column.js";
import { Chunk } from "../../../Data/World/Classes/Chunk.js";

export class WorldTasks {
  constructor(public DVEW: DVEFWorldCore) {}
  loadColumn(location: LocationData, column: ColumnData) {
    WorldRegister.instance.column.add(location, column);
    DVEFDataSync.instance.worldData.column.sync(location);
  }
  unLoadColumn(data: LocationData) {
    if (WorldLock.isLocked(data)) return false;

    this.DVEW.dataSync.worldData.column.unSync(data);
    WorldRegister.instance.column.remove(data);
    const region = WorldRegister.instance.region.get(data);
    if (region && region.columns.size == 0) {
      WorldRegister.instance.region.remove(data);
      this.DVEW.dataSync.worldData.region.unSync(data);
      return true;
    }
    return false;
  }

  loadRegionHeader(location: LocationData, data: SharedArrayBuffer) {
    RegionHeaderRegister.add(location, data);

    DVEFDataSync.instance.worldData.regionHeader.sync(location);
  }
}

export default function (DVEW: DVEFWorldCore) {
  const regionTool = new RegionDataTool();
  const columnTool = new ColumnDataTool();
  const chunkTool = new ChunkDataTool();
  const dataLoaderTool = new DataLoaderTool();
  const builderTool = new BuilderTool();
  const loadInMap: Map<string, boolean> = new Map();

  ThreadComm.registerTasks("add-chunk", async (location: LocationData) => {
    const chunk = WorldRegister.instance.chunk.get(location);

    if (chunk) {
      DVEW.dataSync.worldData.chunk.sync(location);
      return;
    }
    if (dataLoaderTool.isEnabled()) {
      WorldSpaces.column.getPositionLocation(location);
      const columnLocation = <LocationData>[
        ...WorldSpaces.column.getLocation(),
      ];
      if (loadInMap.has(columnLocation.toString())) return;
      loadInMap.set(columnLocation.toString(), true);
      const success = await dataLoaderTool.loadIfExists(columnLocation);
      loadInMap.delete(columnLocation.toString());
      if (!success) {
        builderTool.setLocation(columnLocation).fillColumn();
      }

      return;
    }

    if (!chunk) {
      WorldRegister.instance.column.fill(location);
    }
  });
  ThreadComm.registerTasks<WorldLockTasks>(
    "world-alloc",
    async (data, onDone) => {
      await WorldLock.addLock(data);
      if (onDone) onDone();
    },
    "deferred"
  );
  ThreadComm.registerTasks<WorldLockTasks>(
    "world-dealloc",
    async (data, onDone) => {
      await WorldLock.removeLock(data);
      if (onDone) onDone();
    },
    "deferred"
  );
  ThreadComm.registerTasks<LocationData>(
    "unload-column",
    (data, onDone) => {
      const resutls = DVEW.tasks.unLoadColumn(data);
      return onDone ? onDone(resutls) : resutls;
    },
    "deferred"
  );

  ThreadComm.registerTasks<LoadRegionHeadertasks>(
    "load-region-header",
    ([location, data], onDone) => {
      const resutls = DVEW.tasks.loadRegionHeader(location, data);
      return onDone ? onDone(resutls) : resutls;
    }
  );
  ThreadComm.registerTasks<LoadColumnDataTasks>(
    "load-column",
    ([location, column], onDone) => {
      const resutls = DVEW.tasks.loadColumn(location, column);
      return onDone ? onDone(resutls) : resutls;
    }
  );

  ThreadComm.registerTasks("clear-all", () => {
    WorldRegister.instance.clearAll();
  });
}
