import type {
 ChunkSyncData,
 ChunkUnSyncData,
 RegionSyncData,
 RegionUnSyncData,
 VoxelDataSync,
 VoxelPaletteSyncData,
} from "Meta/Data/DataSync.types.js";
import type { DimensionData } from "Meta/Data/DimensionData.types.js";
import type { RemoteTagManagerInitData } from "Libs/DivineBinaryTags/Meta/Util.types.js";
//objects
import { ThreadComm } from "../Libs/ThreadComm/ThreadComm.js";
import { WorldRegister } from "./World/WorldRegister.js";
import { DataSyncTypes } from "../Common/Threads/Contracts/DataSync.js";
import { VoxelPaletteReader } from "./Voxel/VoxelPalette.js";
import { DimensionsRegister } from "./World/Dimensions/DimensionsRegister.js";
import { ChunkTags } from "./World/Chunk/ChunkTags.js";
import { RegionTags } from "./World/Region/RegionTags.js";
import { ColumnTags } from "./World/Column/ColumnTags.js";
import { VoxelTags } from "./Voxel/VoxelData.js";

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
 voxelPalette: ThreadComm.onDataSync<VoxelPaletteSyncData, any>(
  DataSyncTypes.voxelPalette
 ),
 voxelData: ThreadComm.onDataSync<VoxelDataSync, any>(DataSyncTypes.voxelData),
 dimension: ThreadComm.onDataSync<DimensionData, void>(DataSyncTypes.dimesnion),
 chunk: ThreadComm.onDataSync<ChunkSyncData, ChunkUnSyncData>(
  DataSyncTypes.chunk
 ),
 column: ThreadComm.onDataSync<ChunkSyncData, ChunkUnSyncData>(
  DataSyncTypes.column
 ),
 region: ThreadComm.onDataSync<RegionSyncData, RegionUnSyncData>(
  DataSyncTypes.region
 ),
 
 chunkTags: ThreadComm.onDataSync<RemoteTagManagerInitData, void>(
  DataSyncTypes.chunkTags
 ),
 columnTags: ThreadComm.onDataSync<RemoteTagManagerInitData, void>(
  DataSyncTypes.columnTags
 ),
 regionTags: ThreadComm.onDataSync<RemoteTagManagerInitData, void>(
  DataSyncTypes.regionTags
 ),
};

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

DataSyncNode.chunk.addOnSync((data) => {
 WorldRegister.chunk.add(data[0], data[1], data[2], data[3], data[4]);
});

DataSyncNode.column.addOnSync((data) => {
 WorldRegister.column.add(data[0], data[1], data[2], data[3], data[4]);
});

DataSyncNode.region.addOnSync((data) => {
 WorldRegister.region.add(data[0], data[1], data[2], data[3], data[4]);
});

DataSyncNode.chunkTags.addOnSync((data) => {
 ChunkTags.$INIT(data);
});

DataSyncNode.columnTags.addOnSync((data) => {
 ColumnTags.$INIT(data);
});

DataSyncNode.regionTags.addOnSync((data) => {
 RegionTags.$INIT(data);
});
