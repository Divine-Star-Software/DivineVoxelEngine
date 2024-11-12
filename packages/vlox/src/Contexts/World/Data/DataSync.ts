//types
import type { Thread, ThreadPool } from "@amodx/threads/";

import type {
  PaletteSyncData,
  RegisterObjectMapSync,
  RegisterStringMapSync,
} from "Types/DataSync.types.js";
import type { BinaryStructData } from "@amodx/binary/";
//objects

import { VoxelStruct } from "../../../Data/Voxel/VoxelStruct.js";

import { VoxelTagBuilder } from "./StructBuilders/VoxelStructBuilder.js";
import { SubstanceDataGenerator } from "./Generators/SubstanceDataGenerator.js";
import { SubstanceStruct } from "../../../Data/Substance/SubstanceStruct.js";
import { SubstanceTagBuilder } from "./StructBuilders/SubstanceStructBuilder.js";

import { CommSyncOptions } from "./DataSyncNode.js";
import { DataSyncNode } from "./DataSyncNode.js";
import { VoxelDataGenerator } from "./Generators/VoxelDataGenerator.js";
import { Pipeline, AsyncPipeline } from "@amodx/core/Pipelines/";
import { DataSyncIds } from "../../../Interfaces/Common/DataSyncIds.js";

import type { LocationData } from "../../../Math/index.js";
import type { WorldDataSync } from "../../../Data/Types/DataSync.types.js";
import type { DimensionData } from "../../../Data/Types/DimensionData.types.js";
import { Chunk, Column, Region } from "../../../Data/World/Classes/index.js";
//objects
import { WorldRegister } from "../../../Data/World/WorldRegister.js";

import { ChunkStatStruct, InitalizeChunkTags } from "./Structs/ChunkStruct.js";
import {
  ColumnStateStruct,
  InitalizeColumnTags,
} from "./Structs/ColumnStruct.js";
import {
  InitalizeRegionTags,
  RegionStateStruct,
  RegionHeaderTagManager,
} from "./Structs/RegionStruct.js";
import { RegionHeaderRegister } from "../../../Data/RegionHeaderRegister.js";
import { DimensionsRegister } from "../../../Data/World/DimensionsRegister.js";
import { DVEFDataSyncIds } from "../../../Data/Constants/DVEFDataSyncIds.js";
import { DivineVoxelEngineWorld } from "../index.js";

export class DataSync {
  static instance: DataSync;
  static constructorPipeLine = new Pipeline<DataSync>();
  commMap = new Map<string, Thread | ThreadPool>();
  comms: (Thread | ThreadPool)[] = [];
  commOptions = new WeakMap<any, CommSyncOptions>();
  _ready = false;

  pipelines = {
    init: new AsyncPipeline<DataSync>(),
  };

  constructor() {
    if (DataSync.instance) return DataSync.instance;
    DataSync.instance = DataSync.constructorPipeLine.pipe(this);
    return DataSync.instance;
  }

  async init(world: DivineVoxelEngineWorld) {
    for (const comm of world.threads.comms) {
      if (!comm.isReady()) continue;

      this.registerComm(comm);
    }
    this.loopThroughComms((comm) => {
      this.commMap.set(comm.name, comm);
    });

    SubstanceDataGenerator.$generate();
    SubstanceTagBuilder.sync();

    VoxelDataGenerator.generate();
    VoxelTagBuilder.sync();
    InitalizeChunkTags();
    InitalizeColumnTags();
    InitalizeRegionTags();

    this.worldDataTags.chunk.sync();
    this.worldDataTags.column.sync();
    this.worldDataTags.region.sync();

    this.palettes.voxel.sync();
    this.palettes.substance.sync();
    this.tags.voxel.sync();
    this.tags.substance.sync();
    await this.pipelines.init.pipe(this);
    this._ready = true;
  }

  isReady() {
    return this._ready;
  }

  registerComm(comm: Thread | ThreadPool, data: Partial<CommSyncOptions> = {}) {
    this.comms.push(comm);
    this.commOptions.set(comm, {
      worldData: data.worldData !== undefined ? data.worldData : true,
      voxelPalette: data.voxelPalette !== undefined ? data.voxelPalette : true,
      voxelTags: data.voxelTags !== undefined ? data.voxelTags : true,
      materials: data.materials !== undefined ? data.materials : true,
      colliders: data.colliders !== undefined ? data.colliders : true,
      worldDataTags:
        data.worldDataTags !== undefined ? data.worldDataTags : true,
    });
  }

  loopThroughComms(
    func: (comm: Thread | ThreadPool, options: CommSyncOptions) => void
  ) {
    for (const comm of this.comms) {
      const options = this.commOptions.get(comm)!;

      if (!comm.isReady()) continue;
      func(comm, options);
    }
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
          WorldRegister.instance.setDimension(input[0]);
          const chunk = WorldRegister.instance.chunk.get(
            input[1],
            input[2],
            input[3]
          );
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
          WorldRegister.instance.setDimension(input[0]);
          const column = WorldRegister.instance.column.get(
            input[1],
            input[2],
            input[3]
          );
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
          WorldRegister.instance.setDimension(input[0]);
          const region = WorldRegister.instance.region.get(
            input[1],
            input[2],
            input[3]
          );
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
  tags = {
    voxel: new DataSyncNode<
      void,
      [BinaryStructData, SharedArrayBuffer],
      void,
      false
    >(
      {
        dataSyncType: DataSyncIds.VoxelTags,
        commCheck: (options) => options.voxelTags,
        getSyncData: () => [
          VoxelStruct.initData,
          <SharedArrayBuffer>VoxelStruct.voxelIndex.buffer,
        ],
        getUnSyncData: () => false,
      },
      this
    ),
    substance: new DataSyncNode<void, BinaryStructData, void, false>(
      {
        dataSyncType: DataSyncIds.SubstanceTags,
        commCheck: (options) => options.voxelTags,
        getSyncData: () => SubstanceStruct.initData,

        getUnSyncData: () => false,
      },
      this
    ),
  };

  palettes = {
    voxel: new DataSyncNode<void, PaletteSyncData, void, false>(
      {
        dataSyncType: DataSyncIds.VoxelPalette,
        commCheck: (options) => options.worldDataTags,
        getSyncData: () => [
          VoxelDataGenerator.palette._palette,
          VoxelDataGenerator.palette._map,
          VoxelDataGenerator.nameToIdMap,
          VoxelDataGenerator.idToNameMap,
        ],
        getUnSyncData: () => false,
      },
      this
    ),
    substance: new DataSyncNode<void, PaletteSyncData, void, false>(
      {
        dataSyncType: DataSyncIds.SubstancePalette,
        commCheck: (options) => options.worldDataTags,
        getSyncData: () => [
          SubstanceDataGenerator.palette._palette,
          SubstanceDataGenerator.palette._map,
          {},
          {},
        ],
        getUnSyncData: () => false,
      },
      this
    ),
  };

  maps = {
    strings: new DataSyncNode<
      RegisterStringMapSync,
      RegisterStringMapSync,
      void,
      false
    >(
      {
        dataSyncType: DataSyncIds.RegisterStringMap,
        commCheck: () => true,
        getSyncData: (data) => data,
        getUnSyncData: () => false,
      },
      this
    ),
    objects: new DataSyncNode<
      RegisterObjectMapSync,
      RegisterObjectMapSync,
      void,
      false
    >(
      {
        dataSyncType: DataSyncIds.RegisterObjectMap,
        commCheck: () => true,
        getSyncData: (data) => data,
        getUnSyncData: () => false,
      },
      this
    ),
  };
}
