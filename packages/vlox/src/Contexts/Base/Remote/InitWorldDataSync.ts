import { Threads } from "@amodx/threads/";
import { WorldDataSyncIds } from "../../../World/Types/WorldDataSyncIds.js";
import { WorldRegister } from "../../../World/WorldRegister.js";
import type { LocationData } from "../../../Math/index.js";
import { DimensionData } from "../../../World/Types/WorldData.types.js";
import { ChunkData, ColumnData } from "../../../World/index.js";
export default function () {
  Threads.registerTask<DimensionData>(
    WorldDataSyncIds.SyncDimension,
    (data) => {
      WorldRegister.dimensions.add(data.id);
    }
  );
  Threads.registerTask<[LocationData, ChunkData]>(
    WorldDataSyncIds.UnSyncDimension,
    (data) => {
      //  register.dimensions.re(data.id);
    }
  );

  Threads.registerTask<[LocationData, ChunkData]>(
    WorldDataSyncIds.SyncChunk,
    (data) => {
      WorldRegister.setDimension(data[0][0]);
      WorldRegister.chunk.add(data[0][1], data[0][2], data[0][3], data[1]);
    }
  );
  Threads.registerTask<LocationData>(WorldDataSyncIds.UnSyncChunk, (data) => {
    WorldRegister.setDimension(data[0]);
    WorldRegister.chunk.remove(data[1], data[2], data[3]);
  });

  Threads.registerTask<[LocationData, ColumnData]>(
    WorldDataSyncIds.SyncColumn,
    (data) => {
      WorldRegister.setDimension(data[0][0]);
      WorldRegister.column.add(data[0][1], data[0][2], data[0][3], data[1]);
    }
  );
  Threads.registerTask<LocationData>(WorldDataSyncIds.UnSyncColumn, (data) => {
    WorldRegister.setDimension(data[0]);
    WorldRegister.column.remove(data[1], data[2], data[3]);
  });
}
