import { DataSync } from "@divinevoxel/core/Interfaces/World/Data/DataSync.js";
import { DataSyncNode } from "@divinevoxel/core/Interfaces/World/Data/DataSyncNode.js";
import type { LocationData } from "@divinevoxel/core/Math/index.js";
import type { WorldDataSync } from "../../Data/Types/DataSync.types.js";
import type { DimensionData } from "../../Data/Types/DimensionData.types.js";
import type { BinaryStructData } from "@amodx/binary/";
import { Chunk, Column, Region } from "../../Data/World/Classes/index.js";
//objects
import { WorldRegister } from "../../Data/World/WorldRegister.js";

import { ChunkStatStruct, InitalizeChunkTags } from "./Data/Structs/ChunkStruct.js";
import { ColumnStateStruct, InitalizeColumnTags } from "./Data/Structs/ColumnStruct.js";
import {
  InitalizeRegionTags,
  RegionStateStruct,
  RegionHeaderTagManager,
} from "./Data/Structs/RegionStruct.js";
import { RegionHeaderRegister } from "../../Data/RegionHeaderRegister.js";
import { DimensionsRegister } from "../../Data/World/DimensionsRegister.js";
import { DVEFDataSyncIds } from "../../Data/Constants/DVEFDataSyncIds.js";

export class DVEFDataSync extends DataSync {
  static  instance: DVEFDataSync; 
  constructor() {
    super();
    DVEFDataSync.instance = this;
    this.pipelines.init.regiser("FoundationDataSyncNode", (dataSync) => {
      InitalizeChunkTags();
      InitalizeColumnTags();
      InitalizeRegionTags();
 
      (dataSync as DVEFDataSync).worldDataTags.chunk.sync();
      (dataSync as DVEFDataSync).worldDataTags.column.sync();
      (dataSync as DVEFDataSync).worldDataTags.region.sync();


      return dataSync;
    });
  }
  worldDataTags = {
    chunk: new DataSyncNode<void, BinaryStructData, void, false>(
      {
        dataSyncType: DVEFDataSyncIds.ChunkTags,
        commCheck: (options) => options.worldDataTags,
        getSyncData: () => ChunkStatStruct.structData,
        getUnSyncData: () => false,
      },
      this
    ),

    column: new DataSyncNode<void, BinaryStructData, void, false>(
      {
        dataSyncType: DVEFDataSyncIds.ColumnTags,
        commCheck: (options) => options.worldDataTags,
        getSyncData: () => ColumnStateStruct.structData,
        getUnSyncData: () => false,
      },
      this
    ),

    region: new DataSyncNode<
      void,
      [BinaryStructData, BinaryStructData],
      void,
      false
    >(
      {
        dataSyncType: DVEFDataSyncIds.RegionTags,
        commCheck: (options) => options.worldDataTags,
        getSyncData: () => [
          RegionStateStruct.structData,
          RegionHeaderTagManager.structData,
        ],
        getUnSyncData: () => false,
      },
      this
    ),
  };
  worldData = {
    dimesnion: new DataSyncNode<
      string | number,
      DimensionData,
      string | number,
      boolean
    >(
      {
        dataSyncType: DVEFDataSyncIds.Dimesnion,
        commCheck: (options) => options.worldData,
        getSyncData: (input) => {
          const dimensionData = DimensionsRegister.instance.getDimension(input);
          if (!dimensionData) return false;
          return dimensionData;
        },
        getUnSyncData: () => true,
      },
      this
    ),

    chunk: new DataSyncNode<
      LocationData,
      [LocationData, Chunk],
      LocationData,
      LocationData
    >(
      {
        dataSyncType: DVEFDataSyncIds.Chunk,
        commCheck: (options) => options.worldData,
        getSyncData: (input) => {
          const chunk = WorldRegister.instance.chunk.get(input);
          if (!chunk) return false;
          return [input, chunk];
        },
        getUnSyncData: (input) => input,
      },
      this
    ),

    column: new DataSyncNode<
      LocationData,
      [LocationData, Column],
      LocationData,
      LocationData
    >(
      {
        dataSyncType: DVEFDataSyncIds.Column,
        commCheck: (options) => options.worldData,
        getSyncData: (input) => {
          const column = WorldRegister.instance.column.get(input);
          if (!column) return false;
          return [input, column];
        },
        getUnSyncData: (input) => input,
      },
      this
    ),

    region: new DataSyncNode<
      LocationData,
      [LocationData, Region],
      LocationData,
      LocationData
    >(
      {
        dataSyncType: DVEFDataSyncIds.Region,
        commCheck: (options) => options.worldData,
        getSyncData: (input) => {
          const region = WorldRegister.instance.region.get(input);
          if (!region) return false;
          return [input, region];
        },
        getUnSyncData: (input) => input,
      },
      this
    ),

    regionHeader: new DataSyncNode<
      LocationData,
      WorldDataSync,
      LocationData,
      boolean
    >(
      {
        dataSyncType: DVEFDataSyncIds.RegionHeader,
        commCheck: (options) => options.worldData,
        getSyncData: (input) => {
          const regionHeader = RegionHeaderRegister.get(input);
          if (!regionHeader) return false;
          return [input, regionHeader.buffer];
        },
        getUnSyncData: () => true,
      },
      this
    ),
  };
}
