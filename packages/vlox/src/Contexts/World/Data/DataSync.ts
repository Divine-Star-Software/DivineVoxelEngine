//types
import type { Thread, ThreadPool } from "@amodx/threads/";
//objects

import { CommSyncOptions } from "./DataSyncNode.js";
import { DataSyncNode } from "./DataSyncNode.js";
import { Pipeline } from "@amodx/core/Pipelines/";

import type { LocationData } from "../../../Math/index.js";

import type { DimensionData } from "../../../Data/Types/DimensionData.types.js";
import { Chunk, Column, Region } from "../../../Data/World/Classes/index.js";
//objects
import { WorldRegister } from "../../../Data/World/WorldRegister.js";

import { RegionHeaderRegister } from "../../../Data/World/RegionHeaderRegister.js";
import { DimensionsRegister } from "../../../Data/World/DimensionsRegister.js";
import { DVEFDataSyncIds } from "../../../Data/Constants/DVEFDataSyncIds.js";
import { DivineVoxelEngineWorld } from "../index.js";
import { WorldDataSync } from "../../../Data/Types/DataSync.types.js";

export class DataSync {
  commMap = new Map<string, Thread | ThreadPool>();
  comms: (Thread | ThreadPool)[] = [];
  commOptions = new WeakMap<any, CommSyncOptions>();
  _ready = false;

  pipelines = {
    init: new Pipeline<DataSync>(),
  };

  async init(world: DivineVoxelEngineWorld) {
    for (const comm of world.threads.comms) {
      if (!comm.isReady()) continue;

      this.registerComm(comm);
    }
    this.loopThroughComms((comm) => {
      this.commMap.set(comm.name, comm);
    });

    await this.pipelines.init.pipeAsync(this);
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
}
