//types
import type { DimensionData } from "Meta/Data/DimensionData.types.js";
import type { CommBase } from "Libs/ThreadComm/Comm/Comm.js";
import type { CommManager } from "Libs/ThreadComm/Manager/CommManager.js";
import type {
 VoxelMapSyncData,
 VoxelDataSync,
 VoxelPaletteSyncData,
 WorldDataSync,
} from "Meta/Data/DataSync.types.js";
import type { RemoteTagManagerInitData } from "Libs/DivineBinaryTags/Types/Util.types.js";
//objects
import { VoxelDataGenerator } from "./Generators/VoxelDataGenerator.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { VoxelPaletteReader } from "../../Data/Voxel/VoxelPalette.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
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
import {
 LocationData,
 LocationNode,
} from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";

type CommSyncOptions = {
 worldData: boolean;
 worldDataTags: boolean;
 voxelPalette: boolean;
 voxelTags: boolean;
 materials: boolean;
 colliders: boolean;
};
const loopThroughComms = (
 func: (comm: CommBase | CommManager, options: CommSyncOptions) => void
) => {
 for (const commKey of Object.keys(DataSync.comms)) {
  const comm = DataSync.comms[commKey];
  const options = DataSync.commOptions[commKey];
  if (!comm.isReady()) continue;
  func(comm, options);
 }
};

export const DataSync = {
 voxelDataCreator: VoxelDataGenerator,
 comms: <Record<string, CommBase | CommManager>>{},
 commOptions: <Record<string, CommSyncOptions>>{},
 $INIT() {
  return new Promise((resolve) => {
   const inte = setInterval(() => {
    if (VoxelDataGenerator.isReady()) {
     this.voxelDataCreator.$generateVoxelData();
     InitalizeChunkTags();
     InitalizeColumnTags();
     InitalizeRegionTags();
     this.voxelPalette.sync();
     this.voxelTags.sync();
     this.chunkTags.sync();
     this.columnTags.sync();
     this.regionTags.sync();
     this.materials.sync();
     this.colliders.sync();
     VoxelPaletteReader.setVoxelPalette(
      this.voxelDataCreator.palette._palette,
      this.voxelDataCreator.palette._map
     );
     clearInterval(inte);
     resolve(true);
    }
   }, 1);
  });
 },
 isReady() {
  return this.voxelDataCreator.isReady();
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
 dimesnion: {
  unSync(id: string | number) {
   loopThroughComms((comm, options) => {
    if (!options.worldData) return;
    comm.unSyncData<typeof id>(DataSyncTypes.dimesnion, id);
   });
  },
  unSyncInThread(commName: string, id: string | number) {
   const comm = DataSync.comms[commName];
   if (!comm) return;
   const options = DataSync.commOptions[commName];
   if (!options.worldData) return;
   comm.unSyncData<typeof id>(DataSyncTypes.dimesnion, id);
  },
  sync(data: DimensionData) {
   loopThroughComms((comm, options) => {
    if (!options.worldData) return;
    comm.syncData<DimensionData>(DataSyncTypes.dimesnion, data);
   });
  },
  syncInThread(commName: string, data: DimensionData) {
   const comm = DataSync.comms[commName];
   if (!comm) return;
   const options = DataSync.commOptions[commName];
   if (!options.worldData) return;
   comm.syncData<DimensionData>(DataSyncTypes.dimesnion, data);
  },
 },
 chunk: {
  unSync(location: LocationData) {
   loopThroughComms((comm, options) => {
    if (!options.worldData) return;
    comm.unSyncData<LocationData>(DataSyncTypes.chunk, location);
   });
  },
  unSyncInThread(commName: string, location: LocationData) {
   const comm = DataSync.comms[commName];
   if (!comm) return;
   const options = DataSync.commOptions[commName];
   if (!options.worldData) return;
   comm.unSyncData<LocationData>(DataSyncTypes.chunk, location);
  },
  sync(location: LocationData) {
   const chunk = WorldRegister.chunk.get(location);
   if (!chunk) return;
   loopThroughComms((comm, options) => {
    if (!options.worldData) return;
    comm.syncData<WorldDataSync>(DataSyncTypes.chunk, [location, chunk.buffer]);
   });
  },
  syncInThread(commName: string, location: LocationData) {
   const chunk = WorldRegister.chunk.get(location);
   if (!chunk) return;
   const comm = DataSync.comms[commName];
   if (!comm) return;
   const options = DataSync.commOptions[commName];
   if (!options.worldData) return;
   comm.syncData<WorldDataSync>(DataSyncTypes.chunk, [location, chunk.buffer]);
  },
 },
 column: {
  unSync(location: LocationData) {
   loopThroughComms((comm, options) => {
    if (!options.worldData) return;
    comm.unSyncData<LocationData>(DataSyncTypes.column, location);
   });
  },
  unSyncInThread(commName: string, location: LocationData) {
   const comm = DataSync.comms[commName];
   if (!comm) return;
   const options = DataSync.commOptions[commName];
   if (!options.worldData) return;
   comm.unSyncData<LocationData>(DataSyncTypes.column, location);
  },
  sync(location: LocationData) {
   const column = WorldRegister.column.get(location);
   if (!column) return;
   loopThroughComms((comm, options) => {
    if (!options.worldData) return;
    comm.syncData<WorldDataSync>(DataSyncTypes.column, [
     location,
     column.buffer,
    ]);
   });
  },
  syncInThread(commName: string, location: LocationData) {
   const column = WorldRegister.column.get(location);
   if (!column) return;
   const comm = DataSync.comms[commName];
   if (!comm) return;
   const options = DataSync.commOptions[commName];
   if (!options.worldData) return;
   comm.syncData<WorldDataSync>(DataSyncTypes.column, [
    location,
    column.buffer,
   ]);
  },
 },

 regionHeader: {
  unSync(location: LocationData) {
   loopThroughComms((comm, options) => {
    if (!options.worldData) return;
    comm.unSyncData<LocationData>(DataSyncTypes.regionHeader, location);
   });
  },
  unSyncInThread(commName: string, location: LocationData) {
   const comm = DataSync.comms[commName];
   if (!comm) return;
   const options = DataSync.commOptions[commName];
   if (!options.worldData) return;
   comm.unSyncData<LocationData>(DataSyncTypes.regionHeader, location);
  },
  sync(location: LocationData) {
   const region = RegionHeaderRegister.get(location);
   if (!region) return;
   loopThroughComms((comm, options) => {
    if (!options.worldData) return;
    comm.syncData<WorldDataSync>(DataSyncTypes.regionHeader, [
     location,
     region.buffer,
    ]);
   });
  },
  syncInThread(commName: string, location: LocationData) {
   const region = RegionHeaderRegister.get(location);
   if (!region) return;
   const comm = DataSync.comms[commName];
   if (!comm) return;
   const options = DataSync.commOptions[commName];
   if (!options.worldData) return;
   comm.syncData<WorldDataSync>(DataSyncTypes.regionHeader, [
    location,
    region.buffer,
   ]);
  },
 },

 region: {
  unSync(location: LocationData) {
   loopThroughComms((comm, options) => {
    if (!options.worldData) return;
    comm.unSyncData<LocationData>(DataSyncTypes.region, location);
   });
  },
  unSyncInThread(commName: string, location: LocationData) {
   const comm = DataSync.comms[commName];
   if (!comm) return;
   const options = DataSync.commOptions[commName];
   if (!options.worldData) return;
   comm.unSyncData<LocationData>(DataSyncTypes.region, location);
  },
  sync(location: LocationData) {
   const region = WorldRegister.region.get(location);
   if (!region) return;
   loopThroughComms((comm, options) => {
    if (!options.worldData) return;
    comm.syncData<WorldDataSync>(DataSyncTypes.region, [
     location,
     region.buffer,
    ]);
   });
  },
  syncInThread(commName: string, location: LocationData) {
   const region = WorldRegister.region.get(location);
   if (!region) return;
   const comm = DataSync.comms[commName];
   if (!comm) return;
   const options = DataSync.commOptions[commName];
   if (!options.worldData) return;
   comm.syncData<WorldDataSync>(DataSyncTypes.region, [
    location,
    region.buffer,
   ]);
  },
 },

 voxelTags: {
  sync() {
   loopThroughComms((comm, options) => {
    if (!options.voxelTags) return;
    comm.syncData<VoxelDataSync>(DataSyncTypes.voxelData, [
     VoxelDataGenerator.initData,
     VoxelDataGenerator.voxelMapBuffer,
    ]);
   });
  },
  syncInThread(commName: string) {
   const comm = DataSync.comms[commName];
   if (!comm) return;
   const options = DataSync.commOptions[commName];
   if (!options.voxelTags) return;
   comm.syncData<VoxelDataSync>(DataSyncTypes.voxelData, [
    VoxelDataGenerator.initData,
    VoxelDataGenerator.voxelMapBuffer,
   ]);
  },
 },

 materials: {
  sync() {
   loopThroughComms((comm, options) => {
    if (!options.materials) return;
    comm.syncData<VoxelMapSyncData>(DataSyncTypes.materials, [
     VoxelTags.materialMap,
    ]);
   });
  },
  syncInThread(commName: string) {
   const comm = DataSync.comms[commName];
   if (!comm) return;
   const options = DataSync.commOptions[commName];
   if (!options.materials) return;
   comm.syncData<VoxelMapSyncData>(DataSyncTypes.materials, [
    VoxelTags.materialMap,
   ]);
  },
 },

 colliders: {
  sync() {
   loopThroughComms((comm, options) => {
    if (!options.colliders) return;
    comm.syncData<VoxelMapSyncData>(DataSyncTypes.colliders, [
     VoxelTags.colliderMap,
    ]);
   });
  },
  syncInThread(commName: string) {
   const comm = DataSync.comms[commName];
   if (!comm) return;
   const options = DataSync.commOptions[commName];
   if (!options.colliders) return;
   comm.syncData<VoxelMapSyncData>(DataSyncTypes.colliders, [
    VoxelTags.colliderMap,
   ]);
  },
 },

 chunkTags: {
  sync() {
   loopThroughComms((comm, options) => {
    if (!options.worldDataTags) return;
    comm.syncData<RemoteTagManagerInitData>(
     DataSyncTypes.chunkTags,
     ChunkDataTags.initData
    );
   });
  },
  syncInThread(commName: string) {
   const comm = DataSync.comms[commName];
   if (!comm) return;
   const options = DataSync.commOptions[commName];
   if (!options.worldDataTags) return;
   comm.syncData<RemoteTagManagerInitData>(
    DataSyncTypes.chunkTags,
    ChunkDataTags.initData
   );
  },
 },

 columnTags: {
  sync() {
   loopThroughComms((comm, options) => {
    if (!options.worldDataTags) return;
    comm.syncData<RemoteTagManagerInitData>(
     DataSyncTypes.columnTags,
     ColumnDataTags.initData
    );
   });
  },
  syncInThread(commName: string) {
   const comm = DataSync.comms[commName];
   if (!comm) return;
   const options = DataSync.commOptions[commName];
   if (!options.worldDataTags) return;
   comm.syncData<RemoteTagManagerInitData>(
    DataSyncTypes.columnTags,
    ColumnDataTags.initData
   );
  },
 },

 regionTags: {
  sync() {
   loopThroughComms((comm, options) => {
    if (!options.worldDataTags) return;
    comm.syncData<RemoteTagManagerInitData[]>(DataSyncTypes.regionTags, [
     RegionDataTags.initData,
     RegionHeaderTagManager.initData,
    ]);
   });
  },
  syncInThread(commName: string) {
   const comm = DataSync.comms[commName];
   if (!comm) return;
   const options = DataSync.commOptions[commName];
   if (!options.worldDataTags) return;
   comm.syncData<RemoteTagManagerInitData[]>(DataSyncTypes.regionTags, [
    RegionDataTags.initData,
    RegionHeaderTagManager.initData,
   ]);
  },
 },

 voxelPalette: {
  sync() {
   loopThroughComms((comm, options) => {
    if (!options.voxelPalette) return;
    comm.syncData<VoxelPaletteSyncData>(DataSyncTypes.voxelPalette, [
     DataSync.voxelDataCreator.palette._palette,
     DataSync.voxelDataCreator.palette._map,
    ]);
   });
  },
  syncInThread(commName: string) {
   const comm = DataSync.comms[commName];
   if (!comm) return;
   const options = DataSync.commOptions[commName];
   if (!options.voxelPalette) return;
   comm.syncData<VoxelPaletteSyncData>(DataSyncTypes.voxelPalette, [
    DataSync.voxelDataCreator.palette._palette,
    DataSync.voxelDataCreator.palette._map,
   ]);
  },
 },
};

ThreadComm.onDataSync("shape-map", (data: any) => {
 VoxelDataGenerator.setShapeMap(data);
});
