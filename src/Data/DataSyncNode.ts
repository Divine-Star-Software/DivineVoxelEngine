import type {
 ChunkSyncData,
 ChunkUnSyncData,
 VoxelDataSync,
 VoxelPaletteSyncData,
} from "Meta/Data/DataSync.types.js";
import type { DimensionData } from "Meta/Data/DimensionData.types.js";
//objects
import { ThreadComm } from "../Libs/ThreadComm/ThreadComm.js";
import { WorldRegister } from "./World/WorldRegister.js";
import { DataSyncTypes } from "../Common/Threads/Contracts/DataSync.js";
import { VoxelTags } from "./Voxel/VoxelData.js";
import { VoxelPaletteReader } from "./Voxel/VoxelPalette.js";
import { DimensionsRegister } from "./Dimensions/DimensionsRegister.js";
import { RemoteTagManagerInitData } from "Libs/DivineBinaryTags/Meta/Util.types.js";
import { ChunkTags } from "./Chunk/ChunkTags.js";

export const DataSyncNode = {
 _states: <Record<string, boolean>>{
  voxelData: false,
 },
 isReady() {
  let done = true;
  for (const state of Object.keys(this._states)) {
   if (!this._states[state]) {
    done = false;
   }
  }
  return true;
 },
 chunk: ThreadComm.onDataSync<ChunkSyncData, ChunkUnSyncData>(
  DataSyncTypes.chunk
 ),
 column: ThreadComm.onDataSync<ChunkSyncData, ChunkUnSyncData>(
  DataSyncTypes.column
 ),
 voxelPalette: ThreadComm.onDataSync<VoxelPaletteSyncData, any>(
  DataSyncTypes.voxelPalette
 ),
 chunkTags: ThreadComm.onDataSync<RemoteTagManagerInitData, void>(
  DataSyncTypes.chunkTags
 ),
 columnTags: ThreadComm.onDataSync<RemoteTagManagerInitData, void>(
  DataSyncTypes.columnTags
 ),
 voxelData: ThreadComm.onDataSync<VoxelDataSync, any>(DataSyncTypes.voxelData),
 dimension: ThreadComm.onDataSync<DimensionData, void>(DataSyncTypes.dimesnion),
};
DataSyncNode.chunk.addOnSync((data) => {
 WorldRegister.chunk.add(data[0], data[1], data[2], data[3], data[4]);
});

DataSyncNode.column.addOnSync((data) => {
 WorldRegister.column.add(data[0], data[1], data[2], data[3], data[4]);
});

DataSyncNode.voxelPalette.addOnSync((data) => {
 VoxelPaletteReader.setVoxelPalette(data[0], data[1]);
});

DataSyncNode.voxelData.addOnSync((data) => {
 VoxelTags.$INIT(data[0]);
 VoxelTags.sync(new Uint16Array(data[1]));
 DataSyncNode._states.voxelData = true;
});

DataSyncNode.dimension.addOnSync((data) => {
 DimensionsRegister.registerDimension(data.id, data.options);
});

DataSyncNode.chunkTags.addOnSync((data) => {
 ChunkTags.$INIT(data);
});
