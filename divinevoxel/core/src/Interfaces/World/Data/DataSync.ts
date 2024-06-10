//types
import type { CommBase, CommManager } from "@divinestar/threads/";

import type {
  PaletteSyncData,
  RegisterObjectMapSync,
  RegisterStringMapSync,
} from "Types/DataSync.types.js";
import type { RemoteBinaryStructData } from "@divinestar/binary/";
//objects

import { VoxelStruct } from "../../../Data/Voxel/VoxelStruct.js";

import { VoxelTagBuilder } from "./StructBuilders/VoxelStructBuilder.js";
import { SubstanceDataGenerator } from "./Generators/SubstanceDataGenerator.js";
import { SubstanceStruct } from "../../../Data/Substance/SubstanceStruct.js";
import { SubstanceTagBuilder } from "./StructBuilders/SubstanceStructBuilder.js";

import { CommSyncOptions } from "./DataSyncNode.js";
import { DataSyncNode } from "./DataSyncNode.js";
import { VoxelDataGenerator } from "./Generators/VoxelDataGenerator.js";
import { Pipeline, AsyncPipeline } from "@divinestar/utils/Pipelines/";
import { DataSyncIds } from "../../Common/DataSyncIds.js";
import { DVEWorldCore } from "../DVEWorldCore.js";

export abstract class DataSync {
  static instance: DataSync;
  static constructorPipeLine = new Pipeline<DataSync>();
  commMap = new Map<string, CommBase | CommManager>();
  comms: (CommBase | CommManager)[] = [];
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

  async init(world: DVEWorldCore) {
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

  registerComm(
    comm: CommBase | CommManager,
    data: Partial<CommSyncOptions> = {}
  ) {
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
    func: (comm: CommBase | CommManager, options: CommSyncOptions) => void
  ) {
    for (const comm of this.comms) {
      const options = this.commOptions.get(comm)!;

      if (!comm.isReady()) continue;
      func(comm, options);
    }
  }
  tags = {
    voxel: new DataSyncNode<
      void,
      [RemoteBinaryStructData, SharedArrayBuffer],
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
    substance: new DataSyncNode<void, RemoteBinaryStructData, void, false>(
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
