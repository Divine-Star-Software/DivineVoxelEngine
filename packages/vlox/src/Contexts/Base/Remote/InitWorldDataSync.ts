import { Threads, BinaryTaskType } from "@amodx/threads/";
import { WorldDataSyncIds } from "../../../World/Types/WorldDataSyncIds.js";
import { WorldRegister } from "../../../World/WorldRegister.js";
import type { LocationData } from "../../../Math/index.js";
import { DimensionSyncData } from "../../../World/Types/WorldData.types.js";
import { SectorData } from "../../../World/index.js";
import { getLocationData } from "../../../Util/LocationData.js";
export default function () {
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
  Threads.registerBinaryTask(WorldDataSyncIds.UnSyncSector, (data) => {
    WorldRegister.sectors.remove(...getLocationData(data));
  });
}
