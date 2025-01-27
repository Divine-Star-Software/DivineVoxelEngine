import type { LocationData } from "../Math/index.js";

import { Thread, Threads } from "@amodx/threads/";
//data
import { WorldRegister } from "./WorldRegister.js";

import { WorldLockTasks, LoadColumnDataTasks } from "../Tasks/Tasks.types.js";

import { WorldSpaces } from "./WorldSpaces.js";
import { WorldLock } from "./Lock/WorldLock.js";
import { WorldDataSyncIds } from "./Types/WorldDataSyncIds.js";
import { WorldStorageInterface } from "./Storage/WorldStorage.interface.js";

export default function ({
  threads,
  worldStorage,
}: {
  threads: Thread[];
  worldStorage?: WorldStorageInterface;
}) {
  const loadInMap: Map<string, boolean> = new Map();

  WorldLock.worldStorage = worldStorage || null;
  WorldRegister._hooks.chunk.onNew = (location, chunk) => {
    for (const thread of threads) {
      thread.runTask(WorldDataSyncIds.SyncChunk, [location, chunk]);
    }
  };
  WorldRegister._hooks.chunk.onRemove = (location) => {
    for (const thread of threads) {
      thread.runTask(WorldDataSyncIds.UnSyncChunk, location);
    }
  };

  /*
[columns]
*/
  WorldRegister._hooks.column.onNew = (location, column) => {
    for (const thread of threads) {
      thread.runTask(WorldDataSyncIds.SyncColumn, [location, column]);
    }
  };
  WorldRegister._hooks.column.onRemove = (location) => {
    for (const thread of threads) {
      thread.runTask(WorldDataSyncIds.UnSyncColumn, location);
    }
  };

  /*
[dimensions]
*/
  WorldRegister._hooks.dimension.onNew = (data) => {
    for (const thread of threads) {
      thread.runTask(WorldDataSyncIds.SyncDimension, data);
    }
  };

  Threads.registerTask("add-chunk", async (location: LocationData) => {
    WorldRegister.setDimension(location[0]);
    const chunk = WorldRegister.chunk.get(
      location[1],
      location[2],
      location[3]
    );

    if (chunk) {
      for (const thread of threads) {
        thread.runTask(WorldDataSyncIds.SyncChunk, [location, chunk]);
      }
      return;
    }
    if (worldStorage) {
      const colunPos = WorldSpaces.column.getPositionXYZ(
        location[1],
        location[2],
        location[3]
      );

      const columnLocation = <LocationData>[
        location[0],
        colunPos.x,
        colunPos.y,
        colunPos.z,
      ];
      if (loadInMap.has(columnLocation.toString())) return;
      loadInMap.set(columnLocation.toString(), true);
      const success = await worldStorage.loadColumn(columnLocation);
      loadInMap.delete(columnLocation.toString());
      if (!success) {
        WorldRegister.setDimension(columnLocation[0]);
        WorldRegister.column.fill(
          columnLocation[1],
          columnLocation[2],
          columnLocation[3]
        );
      }

      return;
    }

    if (!chunk) {
      WorldRegister.setDimension(location[0]);
      WorldRegister.column.fill(location[1], location[2], location[3]);
    }
  });
  Threads.registerTask<WorldLockTasks>("world-alloc", async (data) => {
    await WorldLock.addLock(data);
  });
  Threads.registerTask<WorldLockTasks>("world-dealloc", async (data) => {
    await WorldLock.removeLock(data);
  });
  Threads.registerTask<LocationData>("unload-column", (location) => {
    if (WorldLock.isLocked(location)) return [false];
    WorldRegister.setDimension(location[0]);
    WorldRegister.column.remove(location[1], location[2], location[3]);
    for (const thread of threads) {
      thread.runTask(WorldDataSyncIds.UnSyncColumn, location);
    }
    return [false];
  });

  Threads.registerTask<LoadColumnDataTasks>(
    "load-column",
    ([location, column]) => {
      WorldRegister.setDimension(location[0]);
      WorldRegister.column.add(location[1], location[2], location[3], column);
      for (const thread of threads) {
        thread.runTask(WorldDataSyncIds.SyncColumn, [location, column]);
      }
      return [true];
    }
  );
  /*   Threads.registerTask<RunBuildQueue>("build-queue", async ([dim, chunks]) => {
    for (const position of chunks) {
      mesher.setLocation([dim, ...position]).buildChunk();
    }
  }); */
  Threads.registerTask("clear-all", () => {
    WorldRegister.clearAll();
  });
}
