import { Threads, BinaryTaskType, Thread } from "@amodx/threads/";
import { WorldDataSyncIds } from "../../../World/Types/WorldDataSyncIds.js";
import { WorldRegister } from "../../../World/WorldRegister.js";
import type { LocationData } from "../../../Math/index.js";
import { DimensionSyncData } from "../../../World/Types/WorldData.types.js";
import { getLocationData } from "../../../Util/LocationData.js";
export default function (worldThread: Thread) {
  Threads.registerTask<DimensionSyncData>(
    WorldDataSyncIds.SyncDimension,
    (data) => {
      WorldRegister.dimensions.add(data.index, data.id);
    }
  );
  Threads.registerTask<[LocationData]>(
    WorldDataSyncIds.UnSyncDimension,
    (data) => {
      //  register.dimensions.re(data.id);
    }
  );
  Threads.registerTask<[LocationData, ArrayBufferLike]>(
    WorldDataSyncIds.SyncSector,
    (data) => {
      WorldRegister.sectors.add(
        data[0][0],
        data[0][1],
        data[0][2],
        data[0][3],
        data[1]
      );
    }
  );
  Threads.registerTask<LocationData>(WorldDataSyncIds.UnSyncSector, (data) => {
    WorldRegister.sectors.remove(...data);
  });

  Threads.registerTask<[LocationData, ArrayBufferLike]>(
    WorldDataSyncIds.CheckInSector,
    (data) => {
      WorldRegister.sectors.add(
        data[0][0],
        data[0][1],
        data[0][2],
        data[0][3],
        data[1]
      );
    }
  );
  Threads.registerTask<LocationData>(
    WorldDataSyncIds.CheckOutSector,
    (location) => {
      const buffer = WorldRegister.sectors.remove(...location);
      if (!buffer) {
        console.warn("Not buffer returned when checking out sector", location);
        return;
      }
      worldThread.runTask(
        WorldDataSyncIds.CheckInSector,
        [location, buffer],
        [buffer]
      );
    }
  );
}
