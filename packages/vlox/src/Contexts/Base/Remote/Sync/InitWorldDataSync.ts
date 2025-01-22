import { Threads } from "@amodx/threads/";
import { DVEFDataSyncIds } from "../../../../Data/Constants/DVEFDataSyncIds.js";
import { DimensionData } from "../../../../Data/Types/DimensionData.types.js";
import { WorldDataSync } from "./DataSync.types";
import {
  RegionData,
  ColumnData,
  ChunkData,
} from "../../../../Data/World/Classes/index.js";
import { WorldRegister } from "../../../../Data/World/WorldRegister.js";
import { DimensionsRegister } from "../../../../Data/World/DimensionsRegister.js";
import { RegionHeaderRegister } from "../../../../Data/World/RegionHeaderRegister.js";
import type { LocationData } from "../../../../Math";
export default function () {
  const register = new WorldRegister();

  Threads.onDataSync<DimensionData, void>(DVEFDataSyncIds.Dimesnion, (data) => {
    DimensionsRegister.instance.registerDimension(data.id, data.options);
  });
  Threads.onDataSync<[LocationData, ChunkData], LocationData>(
    DVEFDataSyncIds.Chunk,
    (data) => {
      register.setDimension(data[0][0]);
      register.chunk.add(data[0][1], data[0][2], data[0][3], data[1]);
    },
    (data) => {
      register.setDimension(data[0]);
      register.chunk.remove(data[1], data[2], data[3]);
    }
  );
  Threads.onDataSync<[LocationData, ColumnData], LocationData>(
    DVEFDataSyncIds.Column,
    (data) => {
      register.setDimension(data[0][0]);
      register.column.add(data[0][1], data[0][2], data[0][3], data[1]);
    },
    (data) => {
      register.setDimension(data[0]);
      register.column.remove(data[1], data[2], data[3]);
    }
  );
  Threads.onDataSync<[LocationData, RegionData], LocationData>(
    DVEFDataSyncIds.Region,
    (data) => {
      register.setDimension(data[0][0]);
      register.region.add(data[0][1], data[0][2], data[0][3], data[1]);
    },
    (data) => {
      register.setDimension(data[0]);
      register.region.remove(data[1], data[2], data[3]);
    }
  );
  Threads.onDataSync<WorldDataSync, LocationData>(
    DVEFDataSyncIds.RegionHeader,
    (data) => {
      RegionHeaderRegister.add(data[0], data[1]);
    },
    (data) => {
      RegionHeaderRegister.remove(data);
    }
  );
}
