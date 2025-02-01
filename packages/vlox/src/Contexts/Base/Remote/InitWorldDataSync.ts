import { Threads } from "@amodx/threads/";
import { WorldDataSyncIds } from "../../../World/Types/WorldDataSyncIds.js";
import { WorldRegister } from "../../../World/WorldRegister.js";
import type { LocationData } from "../../../Math/index.js";
import { DimensionData } from "../../../World/Types/WorldData.types.js";
import { SectorData } from "../../../World/index.js";
export default function () {
  Threads.registerTask<DimensionData>(
    WorldDataSyncIds.SyncDimension,
    (data) => {
      WorldRegister.dimensions.add(data.id);
    }
  );
  Threads.registerTask<[LocationData]>(
    WorldDataSyncIds.UnSyncDimension,
    (data) => {
      //  register.dimensions.re(data.id);
    }
  );
  Threads.registerTask<[LocationData, SectorData]>(
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
    WorldRegister.sectors.remove(data[0], data[1], data[2], data[3]);
  });
}
