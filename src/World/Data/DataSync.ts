//types
import type { LocationData } from "voxelspaces";
import type { DimensionData } from "Meta/Data/DimensionData.types.js";
import type { CommBase, CommManager } from "threadcomm";

import type {
 RegisterStringMapSync,
 WorldDataSync,
} from "Meta/Data/DataSync.types.js";
import type { RemoteTagManagerInitData } from "divine-binary-tags";
//objects
import { VoxelDataGenerator } from "./Generators/VoxelDataGenerator.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { DataSyncTypes } from "../../Common/Threads/Contracts/DataSync.js";
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
  const comm = DataSync.comms[commName];
  if (!comm) return;
  const output = this.data.getUnSyncData(input);
  if (!output) return false;
  if (!this.data.commCheck(DataSync.commOptions[commName])) return false;
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
  const comm = DataSync.comms[commName];
  if (!comm) return;
  const output = this.data.getSyncData(input);
  if (!output) return false;
  if (!this.data.commCheck(DataSync.commOptions[commName])) return false;
  comm.syncData(this.data.dataSyncType, output);
 }
}
//type WorldDataSync = [LocationData,SharedArrayBuffer]
export const DataSync = {
 voxelDataCreator: VoxelDataGenerator,
 comms: <Record<string, CommBase | CommManager>>{},
 commOptions: <Record<string, CommSyncOptions>>{},
 _ready: false,
 $INIT() {


  this.voxelDataCreator.$generateVoxelData();
  VoxelTagBuilder.$SYNC();
  InitalizeChunkTags();
  InitalizeColumnTags();
  InitalizeRegionTags();
  this.voxelPalette.sync();
  this.voxelTags.sync();
  this.chunkTags.sync();
  this.columnTags.sync();
  this.regionTags.sync();
  this._ready = true;
 },
 isReady() {
  return this._ready;
 },
 registerComm(
  comm: CommBase | CommManager,
  data: Partial<CommSyncOptions> = {}
 ) {
  this.comms[comm.name] = comm;
  this.commOptions[comm.name] = {
   worldData: data.worldData !== undefined ? data.worldData : true,
   voxelPalette: data.voxelPalette !== undefined ? data.voxelPalette : true,
   voxelTags: data.voxelTags !== undefined ? data.voxelTags : true,
   materials: data.materials !== undefined ? data.materials : false,
   colliders: data.colliders !== undefined ? data.colliders : false,
   worldDataTags: data.worldDataTags !== undefined ? data.worldDataTags : true,
  };
 },
 loopThroughComms(
  func: (comm: CommBase | CommManager, options: CommSyncOptions) => void
 ) {

  for (const commKey of Object.keys(DataSync.comms)) {
   const comm = DataSync.comms[commKey];

   const options = DataSync.commOptions[commKey];

   if (!comm.isReady()) continue;
   func(comm, options);
  }
 },
 dimesnion: new DataSyncNode<
  string | number,
  DimensionData,
  string | number,
  boolean
 >({
  dataSyncType: DataSyncTypes.dimesnion,
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
  dataSyncType: DataSyncTypes.chunk,
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
  dataSyncType: DataSyncTypes.column,
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
  dataSyncType: DataSyncTypes.region,
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
  dataSyncType: DataSyncTypes.regionHeader,
  commCheck: (options) => options.worldData,
  getSyncData: (input) => {
   const regionHeader = RegionHeaderRegister.get(input);
   if (!regionHeader) return false;
   return [input, regionHeader.buffer];
  },
  getUnSyncData: () => true,
 }),

 voxelTags: new DataSyncNode<
  void,
  [RemoteTagManagerInitData, SharedArrayBuffer],
  void,
  false
 >({
  dataSyncType: DataSyncTypes.voxelTags,
  commCheck: (options) => options.voxelTags,
  getSyncData: () => [
   VoxelTags.initData,
   <SharedArrayBuffer>VoxelTags.voxelIndex.buffer,
  ],
  getUnSyncData: () => false,
 }),

 chunkTags: new DataSyncNode<void, RemoteTagManagerInitData, void, false>({
  dataSyncType: DataSyncTypes.chunkTags,
  commCheck: (options) => options.worldDataTags,
  getSyncData: () => ChunkDataTags.initData,
  getUnSyncData: () => false,
 }),

 columnTags: new DataSyncNode<void, RemoteTagManagerInitData, void, false>({
  dataSyncType: DataSyncTypes.columnTags,
  commCheck: (options) => options.worldDataTags,
  getSyncData: () => ColumnDataTags.initData,
  getUnSyncData: () => false,
 }),

 regionTags: new DataSyncNode<
  void,
  [RemoteTagManagerInitData, RemoteTagManagerInitData],
  void,
  false
 >({
  dataSyncType: DataSyncTypes.regionTags,
  commCheck: (options) => options.worldDataTags,
  getSyncData: () => [RegionDataTags.initData, RegionHeaderTagManager.initData],
  getUnSyncData: () => false,
 }),

 voxelPalette: new DataSyncNode<
  void,
  [VoxelPalette, VoxelPaletteMap],
  void,
  false
 >({
  dataSyncType: DataSyncTypes.voxelPalette,
  commCheck: (options) => options.worldDataTags,
  getSyncData: () => [
   VoxelDataGenerator.palette._palette,
   VoxelDataGenerator.palette._map,
  ],
  getUnSyncData: () => false,
 }),

 stringMap: new DataSyncNode<
  RegisterStringMapSync,
  RegisterStringMapSync,
  void,
  false
 >({
  dataSyncType: DataSyncTypes.registerStringMap,
  commCheck: () => true,
  getSyncData: (data) => data,
  getUnSyncData: () => false,
 }),
};
