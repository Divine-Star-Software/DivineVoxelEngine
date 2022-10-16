//types
import { DataSyncTypes } from "../../Constants/Data/DataSync.js";
import type { CommBase } from "Libs/ThreadComm/Comm/Comm.js";
import type { CommManager } from "Libs/ThreadComm/Manager/CommManager.js";
import type {
 ChunkSyncData,
 ChunkUnSyncData,
 VoxelDataSync,
 VoxelPaletteSyncData,
} from "Meta/Data/DataSync.types.js";
//objects
import { WorldGeneration } from "../WorldGenration/WorldGeneration.js";
import { WorldData } from "../WorldData/WorldData.js";
import { VoxelDataCreator } from "./VoxelDataCreator.js";
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
  this.voxelDataCreator.$INIT();
  this.voxelData.sync();
  this.voxelPalette.sync();
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

 chunk: {
  unSync(dimesnion: number, chunkX: number, chunkY: number, chunkZ: number) {
   loopThroughComms((comm) => {
    comm.unSyncData<ChunkUnSyncData>(DataSyncTypes.chunk, [
     dimesnion,
     chunkX,
     chunkY,
     chunkZ,
    ]);
   });
  },
  unSyncInThread(
   commName: string,
   dimesnion: number,
   chunkX: number,
   chunkY: number,
   chunkZ: number
  ) {
   const comm = DataSync.comms[commName];
   comm.unSyncData<ChunkUnSyncData>(DataSyncTypes.chunk, [
    dimesnion,
    chunkX,
    chunkY,
    chunkZ,
   ]);
  },
  sync(dimesnion: number, chunkX: number, chunkY: number, chunkZ: number) {
   const chunk = WorldData.getChunk(chunkX, chunkY, chunkZ);
   if (!chunk) return;
   loopThroughComms((comm) => {
    comm.syncData<ChunkSyncData>(DataSyncTypes.chunk, [
     dimesnion,
     chunkX,
     chunkY,
     chunkZ,
     chunk.buffer,
    ]);
   });
  },
  syncInThread(
   commName: string,
   dimesnion: number,
   chunkX: number,
   chunkY: number,
   chunkZ: number
  ) {
   const chunk = WorldData.getChunk(chunkX, chunkY, chunkZ);
   if (!chunk) return;
   const comm = DataSync.comms[commName];
   comm.syncData<ChunkSyncData>(DataSyncTypes.chunk, [
    dimesnion,
    chunkX,
    chunkY,
    chunkZ,
    chunk.buffer,
   ]);
  },
 },

 voxelData: {
  sync() {
   loopThroughComms((comm) => {
    const voxelData = VoxelDataCreator.voxelBuffer;
    const voxelMap = VoxelDataCreator.voxelMapBuffer;
    comm.syncData<VoxelDataSync>(DataSyncTypes.voxelData, [
     voxelData,
     voxelMap,
    ]);
   });
  },
  syncInThread(commName: string) {
   const comm = DataSync.comms[commName];
   const voxelData = VoxelDataCreator.voxelBuffer;
   const voxelMap = VoxelDataCreator.voxelMapBuffer;
   comm.syncData<VoxelDataSync>(DataSyncTypes.voxelData, [voxelData, voxelMap]);
  },
 },

 voxelPalette: {
  sync() {
   const voxelPalette = WorldGeneration.voxelPalette.voxelPalette;
   const voxelPaletteMap = WorldGeneration.voxelPalette.voxelPaletteMap;
   loopThroughComms((comm) => {
    comm.syncData<VoxelPaletteSyncData>(DataSyncTypes.voxelPalette, [
     voxelPalette,
     voxelPaletteMap,
    ]);
   });
  },
  syncInThread(commName: string) {
   const comm = DataSync.comms[commName];
   const voxelPalette = WorldGeneration.voxelPalette.voxelPalette;
   const voxelPaletteMap = WorldGeneration.voxelPalette.voxelPaletteMap;
   comm.syncData<VoxelPaletteSyncData>(DataSyncTypes.voxelPalette, [
    voxelPalette,
    voxelPaletteMap,
   ]);
  },
 },
};
