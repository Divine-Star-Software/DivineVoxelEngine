import type {
 VoxelMapSyncData,
 VoxelDataSync,
 VoxelPaletteSyncData,
 WorldDataSync,
 RegisterStringMapSync,
} from "Meta/Data/DataSync.types.js";
import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";
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
  DataSyncTypes.voxelPalette,
  (data) => {
   VoxelPaletteReader.setVoxelPalette(data[0], data[1]);
  }
 ),
 voxelData: ThreadComm.onDataSync<VoxelDataSync, any>(
  DataSyncTypes.voxelTags,
  (data) => {
   VoxelTags.$INIT(data[0]);
   VoxelTags.sync(new Uint16Array(data[1]));
   DataSyncNode._states.voxelData = true;
  }
 ),
 dimension: ThreadComm.onDataSync<DimensionData, void>(DataSyncTypes.dimesnion),
 chunk: ThreadComm.onDataSync<WorldDataSync, LocationData>(DataSyncTypes.chunk),
 column: ThreadComm.onDataSync<WorldDataSync, LocationData>(
  DataSyncTypes.column
 ),
 region: ThreadComm.onDataSync<WorldDataSync, LocationData>(
  DataSyncTypes.region
 ),
 regionHeader: ThreadComm.onDataSync<WorldDataSync, LocationData>(
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
 stringMap: ThreadComm.onDataSync<RegisterStringMapSync, void>(
  DataSyncTypes.registerStringMap,
  (data) => {
   Register.stringMaps.syncStringMap(data);
  }
 ),
};

DataSyncNode.dimension.addOnSync((data) => {
 DimensionsRegister.registerDimension(data.id, data.options);
});

DataSyncNode.chunk.addOnSync((data) => {
 WorldRegister.chunk.add(data[0], data[1]);
});

DataSyncNode.chunk.addOnUnSync((data) => {
 WorldRegister.chunk.remove(data);
});

DataSyncNode.column.addOnSync((data) => {
 WorldRegister.column.add(data[0], data[1]);
});

DataSyncNode.column.addOnUnSync((data) => {
 WorldRegister.column.remove(data);
});

DataSyncNode.region.addOnSync((data) => {
 WorldRegister.region.add(data[0], data[1]);
});

DataSyncNode.region.addOnUnSync((data) => {
 WorldRegister.region.remove(data);
});

DataSyncNode.regionHeader.addOnSync((data) => {
 RegionHeaderRegister.add(data[0], data[1]);
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
