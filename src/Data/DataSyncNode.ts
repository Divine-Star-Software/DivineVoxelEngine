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
import { VoxelData } from "./Voxel/VoxelData.js";
import { VoxelPaletteReader } from "./Voxel/VoxelPalette.js";
import { DimensionsRegister } from "./Dimensions/DimensionsRegister.js";

export const DataSyncNode = {
 chunk: ThreadComm.onDataSync<ChunkSyncData, ChunkUnSyncData>(
  DataSyncTypes.chunk
 ),
 voxelPalette: ThreadComm.onDataSync<VoxelPaletteSyncData, any>(
  DataSyncTypes.voxelPalette
 ),
 voxelData: ThreadComm.onDataSync<VoxelDataSync, any>(DataSyncTypes.voxelData),
 dimension: ThreadComm.onDataSync<DimensionData, void>(DataSyncTypes.dimesnion),
};
DataSyncNode.chunk.addOnSync((data) => {
 WorldRegister.chunk.add(data[0], data[1], data[2], data[3], data[4]);
});

DataSyncNode.voxelPalette.addOnSync((data) => {
 VoxelPaletteReader.setVoxelPalette(data[0], data[1]);
});

DataSyncNode.voxelData.addOnSync((data) => {
 VoxelData.syncData(data[0], data[1]);
});

DataSyncNode.dimension.addOnSync((data) => {

 DimensionsRegister.registerDimension(data.id, data.options);
});
