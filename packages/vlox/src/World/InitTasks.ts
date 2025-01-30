import type { LocationData } from "../Math/index.js";

import { Thread, Threads } from "@amodx/threads/";
//data
import { WorldRegister } from "./WorldRegister.js";

import { WorldLockTasks, LoadSectorDataTasks } from "../Tasks/Tasks.types.js";

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
  WorldRegister.sectors.setSecotrPool(true);
  const loadInMap: Map<string, boolean> = new Map();
  /*
[sectors]
*/
  WorldRegister._hooks.sectors.onNew = (location, sector) => {
    for (const thread of threads) {
      thread.runTask(WorldDataSyncIds.SyncSector, [location, sector]);
    }
  };
  WorldRegister._hooks.sectors.onRemove = (location) => {
    for (const thread of threads) {
      thread.runTask(WorldDataSyncIds.UnSyncSector, location);
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

  Threads.registerTask("add-sector", async (location: LocationData) => {
    WorldRegister.setDimension(location[0]);
    const sector = WorldRegister.sectors.get(
      location[1],
      location[2],
      location[3]
    );

    if (sector) {
      for (const thread of threads) {
        thread.runTask(WorldDataSyncIds.SyncSector, [location, sector]);
      }
      return;
    }

    if (!sector && !worldStorage) {
      WorldRegister.setDimension(location[0]);
      WorldRegister.sectors.new(location[1], location[2], location[3]);
    }

    if (worldStorage) {
      const sectorPos = WorldSpaces.sector.getPosition(
        location[1],
        location[2],
        location[3]
      );

      const sectorLocation = <LocationData>[
        location[0],
        sectorPos.x,
        sectorPos.y,
        sectorPos.z,
      ];
      const sectorId = sectorLocation.toString();
      if (loadInMap.has(sectorId)) return;
      loadInMap.set(sectorId, true);
      const success = await worldStorage.loadSector(sectorLocation);
      loadInMap.delete(sectorId);
      if (!success) {
        WorldRegister.setDimension(sectorLocation[0]);
        WorldRegister.sectors.new(
          sectorLocation[1],
          sectorLocation[2],
          sectorLocation[3]
        );
      }

      return;
    }
  });
  Threads.registerTask<WorldLockTasks>("world-alloc", async (data) => {
    await WorldLock.addLock(data);
  });
  Threads.registerTask<WorldLockTasks>("world-dealloc", async (data) => {
    await WorldLock.removeLock(data);
  });
  Threads.registerTask<LocationData>("unload-sector", (location) => {
    if (WorldLock.isLocked(location)) return [false];
    WorldRegister.setDimension(location[0]);
    WorldRegister.sectors.remove(location[1], location[2], location[3]);
    for (const thread of threads) {
      thread.runTask(WorldDataSyncIds.UnSyncSector, location);
    }
    return [false];
  });

  Threads.registerTask<LoadSectorDataTasks>(
    "load-sector",
    ([location, sector]) => {
      WorldRegister.setDimension(location[0]);
      WorldRegister.sectors.add(location[1], location[2], location[3], sector);
      for (const thread of threads) {
        thread.runTask(WorldDataSyncIds.SyncSector, [location, sector]);
      }
      return [true];
    }
  );
  /*   Threads.registerTask<RunBuildQueue>("build-queue", async ([dim, sections]) => {
    for (const position of sections) {
      mesher.setLocation([dim, ...position]).buildSection();
    }
  }); */
  Threads.registerTask("clear-all", () => {
    WorldRegister.clearAll();
  });
}
