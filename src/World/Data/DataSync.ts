//types
import { DataSyncTypes } from "../../Data/Constants/Data/DataSync.js";
import { DataHooks } from "../../Data/DataHooks.js";
import type { CommBase } from "Libs/ThreadComm/Comm/Comm.js";
import type { CommManager } from "Libs/ThreadComm/Manager/CommManager.js";
import type {
 ChunkSyncData,
 ChunkUnSyncData,
 VoxelDataSync,
 VoxelPaletteSyncData,
} from "Meta/Data/DataSync.types.js";
//objects
import { VoxelDataCreator } from "./VoxelDataCreator.js";
import { DataCreator } from "./Creator.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { WorldData } from "../../Data/World/WorldData.js";
import { ChunkReader } from "../../Data/Chunk/ChunkReader.js";
import { DVEW } from "../DivineVoxelEngineWorld.js";
const loopThroughComms = (func: (comm: CommBase | CommManager) => void) => {
 for (const commKey of Object.keys(DataSync.comms)) {
  const comm = DataSync.comms[commKey];
  if (!comm.isReady()) continue;
  func(comm);
 }
};

type DID = string | number;
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
  this.voxelDataCreator.$createVoxelData();
  this.voxelData.sync();
  this.voxelPalette.sync();

  WorldData.setVoxelPalette(
   this.voxelDataCreator.palette._palette,
   this.voxelDataCreator.palette._map
  );
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
  unSync(dimesnion: DID, chunkX: number, chunkY: number, chunkZ: number) {
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
   dimension: DID,
   chunkX: number,
   chunkY: number,
   chunkZ: number
  ) {
   const comm = DataSync.comms[commName];
   comm.unSyncData<ChunkUnSyncData>(DataSyncTypes.chunk, [
    dimension,
    chunkX,
    chunkY,
    chunkZ,
   ]);
  },
  sync(dimension: DID, x: number, y: number, z: number) {
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
   dimesnion: DID,
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

 voxelData: {
  sync() {
   loopThroughComms((comm) => {
    comm.syncData<VoxelDataSync>(DataSyncTypes.voxelData, [
     VoxelDataCreator.voxelBuffer,
     VoxelDataCreator.voxelMapBuffer,
    ]);
   });
  },
  syncInThread(commName: string) {
   const comm = DataSync.comms[commName];
   comm.syncData<VoxelDataSync>(DataSyncTypes.voxelData, [
    VoxelDataCreator.voxelBuffer,
    VoxelDataCreator.voxelMapBuffer,
   ]);
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

DataHooks.chunk.onGetAsync.addToRun(async (data) => {
 const chunkData = DataCreator.chunk.getBuffer();
 ChunkReader.setChunkPosition(new DataView(chunkData), {
  x: data[1],
  y: data[2],
  z: data[3],
 });
 return chunkData;
});

DataHooks.chunk.onGetSync.addToRun((data) => {
 const chunkData = DataCreator.chunk.getBuffer();
 ChunkReader.setChunkPosition(new DataView(chunkData), {
  x: data[1],
  y: data[2],
  z: data[3],
 });
 return chunkData;
});

DataHooks.chunk.onNew.addToRun(async (data) => {
 DataSync.chunk.sync(data[0], data[1], data[2], data[3]);
 return;
});

DataHooks.paint.addToRGBUpdate.addToRun((data) => {
 DVEW.queues.rgb.update.add([data[1], data[2], data[3]]);
});
