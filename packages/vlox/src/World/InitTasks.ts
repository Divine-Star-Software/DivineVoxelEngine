import type { LocationData } from "../Math/index.js";
import { Thread, Threads } from "@amodx/threads/";
//data
import { WorldRegister } from "./WorldRegister.js";
import { WorldLockTasks } from "../Tasks/Tasks.types.js";
import { WorldSpaces } from "./WorldSpaces.js";
import { WorldLock } from "./Lock/WorldLock.js";
import { WorldDataSyncIds } from "./Types/WorldDataSyncIds.js";
import { WorldStorageInterface } from "./Types/WorldStorage.interface.js";
import { EngineSettings } from "../Settings/EngineSettings.js";
import { SnapShots } from "./SnapShot/SnapShots.js";
import { SectionSnapShotTransferData } from "./SnapShot/SectionSnapShot.js";

export default function ({
  threads,
  worldStorage,
}: {
  threads: Thread[];
  worldStorage?: WorldStorageInterface;
}) {
  WorldRegister.sectors.setSecotrBufferPool(true);
  const loadInMap = new Map<string, boolean>();

  Threads.registerTask<SectionSnapShotTransferData>(
    "cache-snap-shot",
    (data) => {
      const snapShot = SnapShots._pendingCache.shift()!;
      snapShot.restore(data);
      SnapShots._readyCache.push(snapShot);
    }
  );

  //normal array buffers only
  if (!EngineSettings.settings.memoryAndCPU.useSharedMemory) {
    Threads.registerTask<[LocationData, ArrayBufferLike]>(
      WorldDataSyncIds.CheckInSector,
      async (data) => {
        const sector = WorldRegister.sectors.get(...data[0]);

        if (!sector) {
          console.warn(
            "Tried checking in sector that is not loaded in world",
            data
          );
          return;
        }
        sector.setBuffer(data[1]);
        sector.setCheckedOut(false);
      }
    );
  }
  //shared memeory only
  if (EngineSettings.settings.memoryAndCPU.useSharedMemory) {
    /*
[sectors]
*/

    WorldRegister._hooks.sectors.onNew = (location, sector) => {
      for (const thread of threads) {
        thread.runTask(WorldDataSyncIds.SyncSector, [location, sector.buffer]);
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
  }

  Threads.registerTask("add-sector", async (location: LocationData) => {
    const sector = WorldRegister.sectors.get(
      location[0],
      location[1],
      location[2],
      location[3]
    );

    if (sector) {
      if (EngineSettings.settings.memoryAndCPU.useSharedMemory) {
        for (const thread of threads) {
          thread.runTask(WorldDataSyncIds.SyncSector, [location, sector]);
        }
      }
      return;
    }

    if (!sector && !worldStorage) {
      WorldRegister.sectors.new(
        location[0],
        location[1],
        location[2],
        location[3]
      );
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
        WorldRegister.sectors.new(
          sectorLocation[0],
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

  Threads.registerTask<[LocationData, ArrayBufferLike]>(
    "load-sector",
    ([location, sector]) => {
      WorldRegister.sectors.add(
        location[0],
        location[1],
        location[2],
        location[3],
        sector
      );
      if (EngineSettings.settings.memoryAndCPU.useSharedMemory) {
        for (const thread of threads) {
          thread.runTask(WorldDataSyncIds.SyncSector, [location, sector]);
        }
      }
      return [true];
    }
  );

  Threads.registerTask("clear-all", () => {
    WorldRegister.clearAll();
  });
}
