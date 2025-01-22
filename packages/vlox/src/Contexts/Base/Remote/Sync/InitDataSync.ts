import { Threads } from "@amodx/threads/";
import { DataSyncData } from "./DataSync.types";
import { VoxelPalette } from "../../../../Data/Palettes/VoxelPalette";
import { SubstancePalette } from "../../../../Data/Palettes/SubstancePalette";
import { MappedDataRegister } from "../../../../Data/Register/MappedDataRegister";
import { VoxelStruct } from "../../../../Data/Structs/VoxelStruct";
import { SubstanceStruct } from "../../../../Data/Structs/SubstanceStruct";
import { EngineSettings } from "../../../../Settings/EngineSettings";

import type { LocationData } from "../../../../Math";
//objects
import { MaterialPalette } from "../../../../Data/Palettes/MaterialPalette";
import { WorldRegister } from "../../../../Data/World/WorldRegister.js";
import { DimensionsRegister } from "../../../../Data/World/DimensionsRegister.js";
import { RegionHeaderRegister } from "../../../../Data/World/RegionHeaderRegister.js";
import {
  Column,
  Chunk,
  Region,
  RegionData,
  ColumnData,
  ChunkData,
} from "../../../../Data/World/Classes/index.js";

import { DVEFDataSyncIds } from "../../../../Data/Constants/DVEFDataSyncIds.js";
import { DimensionData } from "../../../../Data/Types/DimensionData.types.js";
import { WorldDataSync } from "./DataSync.types";
export default function InitDataSync(props: {
  onSync(data: DataSyncData): void;
}) {
  const register = new WorldRegister();

  Threads.onDataSync<DimensionData, void>(DVEFDataSyncIds.Dimesnion, (data) => {
    DimensionsRegister.instance.registerDimension(data.id, data.options);
  }),
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
  Threads.registerTasks<DataSyncData>("sync-data", (data) => {
    EngineSettings.syncSettings(data.settings);

    MaterialPalette.setPalette(data.materials.palette);

    //voxels
    VoxelPalette.loadIn(
      data.voxel.palette,
      data.voxel.nameToIdMap,
      data.voxel.idToNameMap
    );

    const voxelStringMaps = MappedDataRegister.stringMaps.getSegment("voxel");
    for (const key in data.voxel.stringMaps) {
      voxelStringMaps.add(key, data.voxel.stringMaps[key]);
    }
    const voxelObjectMaps = MappedDataRegister.objectMaps.getSegment("voxel");
    for (const key in data.voxel.objectMaps) {
      voxelObjectMaps.add(key, data.voxel.objectMaps[key]);
    }
    VoxelStruct.init(data.voxel.struct);
    VoxelStruct.sync(data.voxel.index);
    //substances
    SubstancePalette.setPalette(data.substance.palette);
    const substanceStringMaps =
      MappedDataRegister.stringMaps.getSegment("substance");
    for (const key in data.substance.stringMaps) {
      substanceStringMaps.add(key, data.substance.stringMaps[key]);
    }
    const substanceObjectMaps =
      MappedDataRegister.objectMaps.getSegment("substance");
    for (const key in data.substance.objectMaps) {
      substanceObjectMaps.add(key, data.substance.objectMaps[key]);
    }

    SubstanceStruct.init(data.substance.struct);

    Chunk.StateStruct.init(data.worldData.chunkStruct);
    Column.StateStruct.init(data.worldData.columnStruct);
    Region.StateStruct.init(data.worldData.regionStruct);

    props.onSync(data);
  });
}
