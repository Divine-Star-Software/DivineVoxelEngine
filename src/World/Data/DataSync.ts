//types
import type { DimensionData } from "Meta/Data/DimensionData.types.js";
import type { CommBase } from "Libs/ThreadComm/Comm/Comm.js";
import type { CommManager } from "Libs/ThreadComm/Manager/CommManager.js";
import type {
 ChunkSyncData,
 ChunkUnSyncData,
 ColumnSyncData,
 ColumnUnSyncData,
 RegionSyncData,
 RegionUnSyncData,
 VoxelDataSync,
 VoxelPaletteSyncData,
} from "Meta/Data/DataSync.types.js";
import type { RemoteTagManagerInitData } from "Libs/DivineBinaryTags/Meta/Util.types.js";
//objects
import { VoxelDataCreator } from "./VoxelDataCreator.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { VoxelPaletteReader } from "../../Data/Voxel/VoxelPalette.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { DataSyncTypes } from "../../Common/Threads/Contracts/DataSync.js";
import { ChunkDataTags, InitalizeChunkTags } from "./Tags/ChunkTags.js";
import { ColumnDataTags, InitalizeColumnTags } from "./Tags/ColumnTags.js";
import { InitalizeRegionTags } from "./Tags/RegionTags.js";
const loopThroughComms = (func: (comm: CommBase | CommManager) => void) => {
 for (const commKey of Object.keys(DataSync.comms)) {
  const comm = DataSync.comms[commKey];
  if (!comm.isReady()) continue;
  func(comm);
 }
};

type CommSyncOptions = {
 chunks: boolean;
 voxelPalette: boolean;
 voxelData: boolean;
};
export const DataSync = {
 voxelDataCreator: VoxelDataCreator,
 comms: <Record<string, CommBase | CommManager>>{},
 commOptions: <Record<string, CommSyncOptions>>{},
 $INIT() {
  return new Promise((resolve) => {
   const inte = setInterval(() => {
    if (VoxelDataCreator.isReady()) {
     this.voxelDataCreator.$createVoxelData();
     InitalizeChunkTags();
     InitalizeColumnTags();
     InitalizeRegionTags();
     this.voxelPalette.sync();
     this.voxelTags.sync();
     this.chunkTags.sync();
     this.columnTags.sync();
     this.regionTags.sync();
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
 registerComm(comm: CommBase | CommManager) {
  this.comms[comm.name] = comm;
  this.commOptions[comm.name] = {
   chunks: true,
   voxelPalette: true,
   voxelData: true,
  };
 },
 dimesnion: {
  unSync(id: string | number) {
   loopThroughComms((comm) => {
    comm.unSyncData<typeof id>(DataSyncTypes.dimesnion, id);
   });
  },
  unSyncInThread(commName: string, id: string | number) {
   const comm = DataSync.comms[commName];
   comm.unSyncData<typeof id>(DataSyncTypes.dimesnion, id);
  },
  sync(data: DimensionData) {
   loopThroughComms((comm) => {
    comm.syncData<DimensionData>(DataSyncTypes.dimesnion, data);
   });
  },
  syncInThread(commName: string, data: DimensionData) {
   const comm = DataSync.comms[commName];
   comm.syncData<DimensionData>(DataSyncTypes.dimesnion, data);
  },
 },
 chunk: {
  unSync(dimesnion: string, x: number, y: number, z: number) {
   loopThroughComms((comm) => {
    comm.unSyncData<ChunkUnSyncData>(DataSyncTypes.chunk, [dimesnion, x, y, z]);
   });
  },
  unSyncInThread(
   commName: string,
   dimension: string,
   x: number,
   y: number,
   z: number
  ) {
   const comm = DataSync.comms[commName];
   comm.unSyncData<ChunkUnSyncData>(DataSyncTypes.chunk, [dimension, x, y, z]);
  },
  sync(dimension: string, x: number, y: number, z: number) {
   const chunk = WorldRegister.chunk.get(dimension, x, y, z);
   if (!chunk) return;
   loopThroughComms((comm) => {
    comm.syncData<ChunkSyncData>(DataSyncTypes.chunk, [
     dimension,
     x,
     y,
     z,
     chunk.buffer,
    ]);
   });
  },
  syncInThread(
   commName: string,
   dimesnion: string,
   x: number,
   y: number,
   z: number
  ) {
   const chunk = WorldRegister.chunk.get(dimesnion, x, y, z);
   if (!chunk) return;
   const comm = DataSync.comms[commName];
   comm.syncData<ChunkSyncData>(DataSyncTypes.chunk, [
    dimesnion,
    x,
    y,
    z,
    chunk.buffer,
   ]);
  },
 },
 column: {
  unSync(dimesnion: string, x: number, y: number, z: number) {
   loopThroughComms((comm) => {
    comm.unSyncData<ColumnUnSyncData>(DataSyncTypes.column, [
     dimesnion,
     x,
     y,
     z,
    ]);
   });
  },
  unSyncInThread(
   commName: string,
   dimension: string,
   x: number,
   y: number,
   z: number
  ) {
   const comm = DataSync.comms[commName];
   comm.unSyncData<ColumnUnSyncData>(DataSyncTypes.column, [
    dimension,
    x,
    y,
    z,
   ]);
  },
  sync(dimension: string, x: number, y: number, z: number) {
   const column = WorldRegister.column.get(dimension, x, y, z);
   if (!column) return;
   loopThroughComms((comm) => {
    comm.syncData<ColumnSyncData>(DataSyncTypes.column, [
     dimension,
     x,
     y,
     z,
     column.buffer,
    ]);
   });
  },
  syncInThread(
   commName: string,
   dimesnion: string,
   x: number,
   y: number,
   z: number
  ) {
   const column = WorldRegister.column.get(dimesnion, x, y, z);
   if (!column) return;
   const comm = DataSync.comms[commName];
   comm.syncData<ColumnSyncData>(DataSyncTypes.column, [
    dimesnion,
    x,
    y,
    z,
    column.buffer,
   ]);
  },
 },

 region: {
  unSync(dimesnion: string, x: number, y: number, z: number) {
   loopThroughComms((comm) => {
    comm.unSyncData<RegionUnSyncData>(DataSyncTypes.region, [
     dimesnion,
     x,
     y,
     z,
    ]);
   });
  },
  unSyncInThread(
   commName: string,
   dimension: string,
   x: number,
   y: number,
   z: number
  ) {
   const comm = DataSync.comms[commName];
   comm.unSyncData<ColumnUnSyncData>(DataSyncTypes.region, [
    dimension,
    x,
    y,
    z,
   ]);
  },
  sync(dimension: string, x: number, y: number, z: number) {
   const region = WorldRegister.region.get(dimension, x, y, z);
   if (!region) return;
   loopThroughComms((comm) => {
    comm.syncData<RegionSyncData>(DataSyncTypes.region, [
     dimension,
     x,
     y,
     z,
     region.buffer,
    ]);
   });
  },
  syncInThread(
   commName: string,
   dimesnion: string,
   x: number,
   y: number,
   z: number
  ) {
   const region = WorldRegister.region.get(dimesnion, x, y, z);
   if (!region) return;
   const comm = DataSync.comms[commName];
   comm.syncData<RegionSyncData>(DataSyncTypes.column, [
    dimesnion,
    x,
    y,
    z,
    region.buffer,
   ]);
  },
 },

 voxelTags: {
  sync() {
   loopThroughComms((comm) => {
    comm.syncData<VoxelDataSync>(DataSyncTypes.voxelData, [
     VoxelDataCreator.initData,
     VoxelDataCreator.voxelMapBuffer,
    ]);
   });
  },
  syncInThread(commName: string) {
   const comm = DataSync.comms[commName];
   comm.syncData<VoxelDataSync>(DataSyncTypes.voxelData, [
    VoxelDataCreator.initData,
    VoxelDataCreator.voxelMapBuffer,
   ]);
  },
 },

 chunkTags: {
  sync() {
   loopThroughComms((comm) => {
    comm.syncData<RemoteTagManagerInitData>(
     DataSyncTypes.chunkTags,
     ChunkDataTags.initData
    );
   });
  },
  syncInThread(commName: string) {
   const comm = DataSync.comms[commName];
   comm.syncData<RemoteTagManagerInitData>(
    DataSyncTypes.chunkTags,
    ChunkDataTags.initData
   );
  },
 },

 columnTags: {
  sync() {
   loopThroughComms((comm) => {
    comm.syncData<RemoteTagManagerInitData>(
     DataSyncTypes.columnTags,
     ColumnDataTags.initData
    );
   });
  },
  syncInThread(commName: string) {
   const comm = DataSync.comms[commName];
   comm.syncData<RemoteTagManagerInitData>(
    DataSyncTypes.columnTags,
    ColumnDataTags.initData
   );
  },
 },

 regionTags: {
  sync() {
   loopThroughComms((comm) => {
    comm.syncData<RemoteTagManagerInitData>(
     DataSyncTypes.regionTags,
     ColumnDataTags.initData
    );
   });
  },
  syncInThread(commName: string) {
   const comm = DataSync.comms[commName];
   comm.syncData<RemoteTagManagerInitData>(
    DataSyncTypes.regionTags,
    ColumnDataTags.initData
   );
  },
 },

 voxelPalette: {
  sync() {
   loopThroughComms((comm) => {
    comm.syncData<VoxelPaletteSyncData>(DataSyncTypes.voxelPalette, [
     DataSync.voxelDataCreator.palette._palette,
     DataSync.voxelDataCreator.palette._map,
    ]);
   });
  },
  syncInThread(commName: string) {
   const comm = DataSync.comms[commName];
   comm.syncData<VoxelPaletteSyncData>(DataSyncTypes.voxelPalette, [
    DataSync.voxelDataCreator.palette._palette,
    DataSync.voxelDataCreator.palette._map,
   ]);
  },
 },
};

ThreadComm.onDataSync("shape-map", (data: any) => {
 VoxelDataCreator.setShapeMap(data);
});
