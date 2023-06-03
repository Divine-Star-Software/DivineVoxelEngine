//types
import type { LocationData } from "voxelspaces";
import type { DimensionData } from "Meta/Data/DimensionData.types.js";
import type { CommBase, CommManager } from "threadcomm";

import type {
 PaletteSyncData,
 RegisterObjectMapSync,
 RegisterStringMapSync,
 WorldDataSync,
} from "Meta/Data/DataSync.types.js";
import type { RemoteTagManagerInitData } from "divine-binary-tags";
//objects
import { VoxelDataGenerator } from "./Generators/VoxelDataGenerator.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { DataSyncIds } from "../../Common/Threads/Contracts/DataSyncIds.js";
import { ChunkDataTags, InitalizeChunkTags } from "./Tags/ChunkTags.js";
import { ColumnDataTags, InitalizeColumnTags } from "./Tags/ColumnTags.js";
import {
 InitalizeRegionTags,
 RegionDataTags,
 RegionHeaderTagManager,
} from "./Tags/RegionTags.js";
import { VoxelTags } from "../../Data/Voxel/VoxelTags.js";
import { RegionHeaderRegister } from "../../Data/World/Region/RegionHeaderRegister.js";
import { DimensionsRegister } from "../../Data/World/Dimensions/DimensionsRegister.js";
import { VoxelPalette, VoxelPaletteMap } from "Meta/Data/WorldData.types.js";
import { Util } from "../../Global/Util.helper.js";
import { VoxelTagBuilder } from "./TagBuilders/VoxelTagBuilder.js";
import { SubstanceDataGenerator } from "./Generators/SubstanceDataGenerator.js";
import { SubstanceTags } from "../../Data/Substance/SubstanceTags.js";
import { SubstanceTagBuilder } from "./TagBuilders/SubstanceTagBuilder.js";

type CommSyncOptions = {
 worldData: boolean;
 worldDataTags: boolean;
 voxelPalette: boolean;
 voxelTags: boolean;
 materials: boolean;
 colliders: boolean;
};

class DataSyncNode<SyncInput, SyncOutput, UnSyncInput, UnSyncOutput> {
 constructor(
  public data: {
   dataSyncType: number | string;
   commCheck: (options: CommSyncOptions, threadId?: string) => boolean;
   getSyncData: (data: SyncInput, threadId?: string) => SyncOutput | false;
   getUnSyncData: (
    data: UnSyncInput,
    threadId?: string
   ) => UnSyncOutput | false;
  }
 ) {}
 unSync(input: UnSyncInput) {
  const output = this.data.getUnSyncData(input);
  if (!output) return false;
  DataSync.loopThroughComms((comm, options) => {
   if (!this.data.commCheck(options)) return false;
   comm.unSyncData(this.data.dataSyncType, output);
  });
 }
 unSyncInThread(commName: string, input: UnSyncInput) {
  const comm = DataSync.commMap.get(commName);
  if (!comm) return;
  const output = this.data.getUnSyncData(input);
  if (!output) return false;
  if (!this.data.commCheck(DataSync.commOptions.get(comm)!)) return false;
  comm.unSyncData(this.data.dataSyncType, output);
 }
 sync(input: SyncInput) {
  const output = this.data.getSyncData(input);
  if (!output) return false;
  DataSync.loopThroughComms((comm, options) => {
   if (!this.data.commCheck(options)) return false;
   comm.syncData(this.data.dataSyncType, output);
  });
 }
 syncInThread(commName: string, input: SyncInput) {
  const comm = DataSync.commMap.get(commName);
  if (!comm) return;
  const output = this.data.getSyncData(input);
  if (!output) return false;
  if (!this.data.commCheck(DataSync.commOptions.get(comm)!)) return false;
  comm.syncData(this.data.dataSyncType, output);
 }
}
export const DataSync = {
 commMap: new Map<string, CommBase | CommManager>(),
 comms: <(CommBase | CommManager)[]>[],
 commOptions: new WeakMap<any, CommSyncOptions>(),
 _ready: false,
 $INIT() {
  this.loopThroughComms((comm) => {
   this.commMap.set(comm.name, comm);
  });
  VoxelDataGenerator.$generate();
  VoxelTagBuilder.sync();
  SubstanceDataGenerator.$generate();
  SubstanceTagBuilder.sync();
  InitalizeChunkTags();
  InitalizeColumnTags();
  InitalizeRegionTags();
  this.palettes.voxel.sync();
  this.palettes.substance.sync();
  this.tags.voxel.sync();
  this.tags.substance.sync();

  this.tags.chunk.sync();
  this.tags.column.sync();
  this.tags.region.sync();
  this._ready = true;
 },
 isReady() {
  return this._ready;
 },
 registerComm(
  comm: CommBase | CommManager,
  data: Partial<CommSyncOptions> = {}
 ) {
  this.comms.push(comm);
  this.commOptions.set(comm, {
   worldData: data.worldData !== undefined ? data.worldData : true,
   voxelPalette: data.voxelPalette !== undefined ? data.voxelPalette : true,
   voxelTags: data.voxelTags !== undefined ? data.voxelTags : true,
   materials: data.materials !== undefined ? data.materials : false,
   colliders: data.colliders !== undefined ? data.colliders : false,
   worldDataTags: data.worldDataTags !== undefined ? data.worldDataTags : true,
  });
 },
 loopThroughComms(
  func: (comm: CommBase | CommManager, options: CommSyncOptions) => void
 ) {
  for (const comm of DataSync.comms) {
   const options = this.commOptions.get(comm)!;
   if (!comm.isReady()) continue;
   func(comm, options);
  }
 },

 worldData: {
  dimesnion: new DataSyncNode<
   string | number,
   DimensionData,
   string | number,
   boolean
  >({
   dataSyncType: DataSyncIds.dimesnion,
   commCheck: (options) => options.worldData,
   getSyncData: (input) => {
    const dimensionData = DimensionsRegister.getDimension(input);
    if (!dimensionData) return false;
    return dimensionData;
   },
   getUnSyncData: () => true,
  }),

  chunk: new DataSyncNode<
   LocationData,
   WorldDataSync,
   LocationData,
   LocationData
  >({
   dataSyncType: DataSyncIds.chunk,
   commCheck: (options) => options.worldData,
   getSyncData: (input) => {
    const chunk = WorldRegister.chunk.get(input);
    if (!chunk) return false;
    return [input, chunk.buffer];
   },
   getUnSyncData: (input) => input,
  }),

  column: new DataSyncNode<
   LocationData,
   WorldDataSync,
   LocationData,
   LocationData
  >({
   dataSyncType: DataSyncIds.column,
   commCheck: (options) => options.worldData,
   getSyncData: (input) => {
    const column = WorldRegister.column.get(input);
    if (!column) return false;
    return [input, column.buffer];
   },
   getUnSyncData: (input) => input,
  }),

  region: new DataSyncNode<
   LocationData,
   WorldDataSync,
   LocationData,
   LocationData
  >({
   dataSyncType: DataSyncIds.region,
   commCheck: (options) => options.worldData,
   getSyncData: (input) => {
    const region = WorldRegister.region.get(input);
    if (!region) return false;
    return [input, region.buffer];
   },
   getUnSyncData: (input) => input,
  }),

  regionHeader: new DataSyncNode<
   LocationData,
   WorldDataSync,
   LocationData,
   boolean
  >({
   dataSyncType: DataSyncIds.regionHeader,
   commCheck: (options) => options.worldData,
   getSyncData: (input) => {
    const regionHeader = RegionHeaderRegister.get(input);
    if (!regionHeader) return false;
    return [input, regionHeader.buffer];
   },
   getUnSyncData: () => true,
  }),
 },

 tags: {
  voxel: new DataSyncNode<
   void,
   [RemoteTagManagerInitData, SharedArrayBuffer],
   void,
   false
  >({
   dataSyncType: DataSyncIds.voxelTags,
   commCheck: (options) => options.voxelTags,
   getSyncData: () => [
    VoxelTags.initData,
    <SharedArrayBuffer>VoxelTags.voxelIndex.buffer,
   ],
   getUnSyncData: () => false,
  }),
  substance: new DataSyncNode<void, RemoteTagManagerInitData, void, false>({
   dataSyncType: DataSyncIds.substanceTags,
   commCheck: (options) => options.voxelTags,
   getSyncData: () => SubstanceTags.initData,

   getUnSyncData: () => false,
  }),

  chunk: new DataSyncNode<void, RemoteTagManagerInitData, void, false>({
   dataSyncType: DataSyncIds.chunkTags,
   commCheck: (options) => options.worldDataTags,
   getSyncData: () => ChunkDataTags.initData,
   getUnSyncData: () => false,
  }),

  column: new DataSyncNode<void, RemoteTagManagerInitData, void, false>({
   dataSyncType: DataSyncIds.columnTags,
   commCheck: (options) => options.worldDataTags,
   getSyncData: () => ColumnDataTags.initData,
   getUnSyncData: () => false,
  }),

  region: new DataSyncNode<
   void,
   [RemoteTagManagerInitData, RemoteTagManagerInitData],
   void,
   false
  >({
   dataSyncType: DataSyncIds.regionTags,
   commCheck: (options) => options.worldDataTags,
   getSyncData: () => [
    RegionDataTags.initData,
    RegionHeaderTagManager.initData,
   ],
   getUnSyncData: () => false,
  }),
 },

 palettes: {
  voxel: new DataSyncNode<void, PaletteSyncData, void, false>({
   dataSyncType: DataSyncIds.voxelPalette,
   commCheck: (options) => options.worldDataTags,
   getSyncData: () => [
    VoxelDataGenerator.palette._palette,
    VoxelDataGenerator.palette._map,
   ],
   getUnSyncData: () => false,
  }),
  substance: new DataSyncNode<void, PaletteSyncData, void, false>({
   dataSyncType: DataSyncIds.substancePalette,
   commCheck: (options) => options.worldDataTags,
   getSyncData: () => [
    SubstanceDataGenerator.palette._palette,
    SubstanceDataGenerator.palette._map,
   ],
   getUnSyncData: () => false,
  }),
 },

 maps: {
  strings: new DataSyncNode<
   RegisterStringMapSync,
   RegisterStringMapSync,
   void,
   false
  >({
   dataSyncType: DataSyncIds.registerStringMap,
   commCheck: () => true,
   getSyncData: (data) => data,
   getUnSyncData: () => false,
  }),
  objects: new DataSyncNode<
   RegisterObjectMapSync,
   RegisterObjectMapSync,
   void,
   false
  >({
   dataSyncType: DataSyncIds.registerObjectMap,
   commCheck: () => true,
   getSyncData: (data) => data,
   getUnSyncData: () => false,
  }),
 },
};
