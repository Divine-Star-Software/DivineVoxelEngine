import type {
 ChunkSyncData,
 ChunkUnSyncData,
 VoxelMapSyncData,
 RegionSyncData,
 RegionUnSyncData,
 VoxelDataSync,
 VoxelPaletteSyncData,
} from "Meta/Data/DataSync.types.js";
import type { DimensionData } from "Meta/Data/DimensionData.types.js";
import type { RemoteTagManagerInitData } from "Libs/DivineBinaryTags/Types/Util.types.js";
//objects
import { ThreadComm } from "../Libs/ThreadComm/ThreadComm.js";
import { WorldRegister } from "./World/WorldRegister.js";
import { DataSyncTypes } from "../Common/Threads/Contracts/DataSync.js";
import { VoxelPaletteReader } from "./Voxel/VoxelPalette.js";
import { DimensionsRegister } from "./World/Dimensions/DimensionsRegister.js";
import { ChunkTags } from "./World/Chunk/ChunkTags.js";
import { RegionHeaderTags, RegionTags } from "./World/Region/RegionTags.js";
import { ColumnTags } from "./World/Column/ColumnTags.js";
import { VoxelTags } from "./Voxel/VoxelTags.js";
import { Register } from "./Register/Register.js";
import { RegionHeaderRegister } from "./World/Region/RegionHeaderRegister.js";

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
 materialMap: ThreadComm.onDataSync<VoxelMapSyncData, any>(
  DataSyncTypes.materials
 ),
 colliderMap: ThreadComm.onDataSync<VoxelMapSyncData, any>(
  DataSyncTypes.colliders
 ),
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
 regionHeader: ThreadComm.onDataSync<RegionSyncData, RegionUnSyncData>(
  DataSyncTypes.regionHeader
 ),
 chunkTags: ThreadComm.onDataSync<RemoteTagManagerInitData, void>(
  DataSyncTypes.chunkTags
 ),
 columnTags: ThreadComm.onDataSync<RemoteTagManagerInitData, void>(
  DataSyncTypes.columnTags
 ),
 regionTags: ThreadComm.onDataSync<RemoteTagManagerInitData[], void>(
  DataSyncTypes.regionTags
 ),
};

DataSyncNode.voxelPalette.addOnSync((data) => {
 VoxelPaletteReader.setVoxelPalette(data[0], data[1]);
});

DataSyncNode.colliderMap.addOnSync((data) => {
 VoxelTags.colliderMap = data[0];
});

DataSyncNode.materialMap.addOnSync((data) => {
 VoxelTags.materialMap = data[0];
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

DataSyncNode.regionHeader.addOnSync((data) => {
 RegionHeaderRegister.add([data[0], data[1], data[2], data[3]], data[4]);
});

DataSyncNode.chunkTags.addOnSync((data) => {
 ChunkTags.$INIT(data);
});

DataSyncNode.columnTags.addOnSync((data) => {
 ColumnTags.$INIT(data);
});

DataSyncNode.regionTags.addOnSync((data) => {
 RegionTags.$INIT(data[0]);
 RegionHeaderTags.$INIT(data[1]);
});
