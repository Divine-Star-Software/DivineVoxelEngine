import type { LocationData } from "@divinevoxel/core/Math/index.js";

import { ThreadComm } from "@divinestar/threads/";
//data
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { WorldDataGenerator } from "../Data/Generators/WorldDataGenerator.js";
import { DVEFWorldCore } from "../DVEFWorldCore.js";
import {
  LoadRegionHeadertasks,
  LoadWorldDataTasks,
  WorldLockTasks,
} from "../../../Types/Tasks.types.js";
import { RegionDataTool } from "../../../Default/Tools/Data/WorldData/RegionDataTool.js";
import { ColumnDataTool } from "../../../Default/Tools/Data/WorldData/ColumnDataTool.js";
import { ChunkDataTool } from "../../../Default/Tools/Data/WorldData/ChunkDataTool.js";
import { RegionHeaderRegister } from "../../../Data/RegionHeaderRegister.js";
import { DataLoaderTool } from "../../../Default/Tools/Loader/DataLoaderTool.js";
import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces.js";
import { BuilderTool } from "../../../Default/Tools/Build/BuilderTool.js";
import { WorldLock } from "../Lock/WorldLock.js";

export default function (DVEW: DVEFWorldCore) {
  const regionTool = new RegionDataTool();
  const columnTool = new ColumnDataTool();
  const chunkTool = new ChunkDataTool();
  const dataLoaderTool = new DataLoaderTool();
  const builderTool = new BuilderTool();
  const loadInMap: Map<string, boolean> = new Map();
  ThreadComm.registerTasks("add-chunk", (location: LocationData) => {
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
      dataLoaderTool.setLocation(columnLocation).loadIfExists((success) => {
        loadInMap.delete(columnLocation.toString());
        if (!success) {
          builderTool.setLocation(columnLocation).fillColumn();
        }
      });
      return;
    }

    if (!chunk) {
      WorldRegister.instance.chunk.add(
        location,
        WorldDataGenerator.chunk.create()
      );
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
      if (WorldLock.isLocked(data)) return onDone ? onDone(false) : 0;
      DVEW.dataSync.worldData.column.unSync(data);
      WorldRegister.instance.column.remove(data);
      const region = WorldRegister.instance.region.get(data);
      if (region && Object.keys(region.columns).length == 0) {
        WorldRegister.instance.region.remove(data);
        DVEW.dataSync.worldData.region.unSync(data);
      }
      return onDone ? onDone(true) : 0;
    },
    "deferred"
  );

  /*     loadRegino: ThreadComm.registerTasks<LoadWorldDataTasks>(
      "load-region",
      ([location, sab]) => {
        regionTool.setBuffer(sab);
        const sl = regionTool.getLocationData();
        sl[0] = location[0];
        WorldRegister.region.add(sl, sab);
        DataSync.worldData.region.sync(sl);
      }
    ),
    loadReginoHeader: ThreadComm.registerTasks<LoadRegionHeadertasks>(
      "load-region-header",
      (data) => {
        RegionHeaderRegister.add(data[0], data[1]);
        const location = data[0];
        DataSync.worldData.regionHeader.sync(location);
      }
    ),
    loadColumn: ThreadComm.registerTasks<LoadWorldDataTasks>(
      "load-column",
      ([location, sab]) => {
        columnTool.setBuffer(sab);
        const sl = columnTool.getLocationData();
        sl[0] = location[0];
        WorldRegister.column.add(sl, sab);
        DataSync.worldData.column.sync(sl);
      }
    ),
    loadChunk: ThreadComm.registerTasks<LoadWorldDataTasks>(
      "load-chunk",
      ([location, sab]) => {
        chunkTool.setBuffer(sab);
        const sl = chunkTool.getLocationData();
        sl[0] = location[0];
        WorldRegister.chunk.add(sl, sab);
        DataSync.worldData.chunk.sync(sl);
      }
    ),
 */
  ThreadComm.registerTasks("clear-all", () => {
    WorldRegister.instance.clearAll();
  });
}
