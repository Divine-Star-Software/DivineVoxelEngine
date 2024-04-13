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

const regionTool = new RegionDataTool();
const columnTool = new ColumnDataTool();
const chunkTool = new ChunkDataTool();
const dataLoaderTool = new DataLoaderTool();
const builderTool = new BuilderTool();
const loadInMap: Map<string, boolean> = new Map();
export const WorldTasks = {
  addChunk: ThreadComm.registerTasks("add-chunk", (location: LocationData) => {
    const chunk = WorldRegister.chunk.get(location);

    if (chunk) {
      DVEFWorldCore.instance.dataSync.worldData.chunk.sync(location);
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
      WorldRegister.chunk.add(location, WorldDataGenerator.chunk.create());
    }
  }),
  worldAlloc: ThreadComm.registerTasks<WorldLockTasks>(
    "world-alloc",
    async (data, onDone) => {
      await WorldLock.addLock(data);
      if (onDone) onDone();
    },
    "deferred"
  ),
  worldDealloc: ThreadComm.registerTasks<WorldLockTasks>(
    "world-dealloc",
    async (data, onDone) => {
      await WorldLock.removeLock(data);
      if (onDone) onDone();
    },
    "deferred"
  ),
  unLoad: {
    unLoadColumn: ThreadComm.registerTasks<LocationData>(
      "unload-column",
      (data, onDone) => {
        if (WorldLock.isLocked(data)) return onDone ? onDone(false) : 0;
        DVEFWorldCore.instance.dataSync.worldData.column.unSync(data);
        WorldRegister.column.remove(data);
        const region = WorldRegister.region.get(data);
        if (region && Object.keys(region.columns).length == 0) {
          WorldRegister.region.remove(data);
          DVEFWorldCore.instance.dataSync.worldData.region.unSync(data);
        }
        return onDone ? onDone(true) : 0;
      },
      "deferred"
    ),
  },
  load: {
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
    clearAll: ThreadComm.registerTasks("clear-all", () => {
      WorldRegister.clearAll();
    }),
  },
};
