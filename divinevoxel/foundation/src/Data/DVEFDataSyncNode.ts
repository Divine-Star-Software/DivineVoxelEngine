import type { LocationData } from "@divinevoxel/core/Math";
//objects
import { ThreadComm } from "@divinestar/threads/";
import { WorldRegister } from "./World/WorldRegister.js";
import { DimensionsRegister } from "./World/DimensionsRegister.js";
import {
  RegionHeaderRegister,
  RegionHeaderTags,
} from "./RegionHeaderRegister.js";
import { RemoteBinaryStructData } from "@divinestar/binary/";
import { Column, Chunk, Region, RegionData, ColumnData, ChunkData } from "./World/Classes/index.js";
import { WorldDataSync } from "./Types/DataSync.types.js";
import { DVEFDataSyncIds } from "./Constants/DVEFDataSyncIds.js";
import { DimensionData } from "./Types/DimensionData.types.js";
import { RemoteDataSyncNode } from "@divinevoxel/core/Interfaces/Data/RemoteDataSyncNode.js";
export class DVEFDataSyncNode extends RemoteDataSyncNode {
  worldData = {
    dimension: ThreadComm.onDataSync<DimensionData, void>(
      DVEFDataSyncIds.Dimesnion,
      (data) => {
        DimensionsRegister.instance.registerDimension(data.id, data.options);
      }
    ),
    chunk: ThreadComm.onDataSync<[LocationData, ChunkData], LocationData>(
      DVEFDataSyncIds.Chunk,
      (data) => {
        WorldRegister.instance.chunk.add(data[0], data[1]);
      },
      (data) => {
        WorldRegister.instance.chunk.remove(data);
      }
    ),
    column: ThreadComm.onDataSync<[LocationData, ColumnData], LocationData>(
      DVEFDataSyncIds.Column,
      (data) => {
        WorldRegister.instance.column.add(data[0], data[1]);
      },
      (data) => {
        WorldRegister.instance.column.remove(data);
      }
    ),
    region: ThreadComm.onDataSync<[LocationData, RegionData], LocationData>(
      DVEFDataSyncIds.Region,
      (data) => {
        WorldRegister.instance.region.add(data[0], data[1]);
      },
      (data) => {
        WorldRegister.instance.region.remove(data);
      }
    ),
    regionHeader: ThreadComm.onDataSync<WorldDataSync, LocationData>(
      DVEFDataSyncIds.RegionHeader,
      (data) => {
        RegionHeaderRegister.add(data[0], data[1]);
      },
      (data) => {
        RegionHeaderRegister.remove(data);
      }
    ),
  };
  worldDataTags = {
    chunk: ThreadComm.onDataSync<RemoteBinaryStructData, void>(
      DVEFDataSyncIds.ChunkTags,
      (data) => {
        Chunk.StateStruct.init(data);
      }
    ),
    column: ThreadComm.onDataSync<RemoteBinaryStructData, void>(
      DVEFDataSyncIds.ColumnTags,
      (data) => {
        Column.StateStruct.init(data);
      }
    ),
    region: ThreadComm.onDataSync<RemoteBinaryStructData[], void>(
      DVEFDataSyncIds.RegionTags,
      (data) => {
        Region.StateStruct.init(data[0]);
        RegionHeaderTags.init(data[1]);
      }
    ),
  };
}
