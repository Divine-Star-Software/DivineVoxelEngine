import type {
 ChunkSyncData,
 ChunkUnSyncData,
 VoxelDataSync,
 VoxelPaletteSyncData,
} from "Meta/Data/DataSync.types.js";
//objects
import { ThreadComm } from "../Libs/ThreadComm/ThreadComm.js";
import { WorldData } from "./World/WorldData.js";
import { WorldRegister } from "./World/WorldRegister.js";
import { DataSyncTypes } from "../Data/Constants/Data/DataSync.js";
import { VoxelData } from "./Voxel/VoxelData.js";

export const DataSyncNode = {
 chunk: ThreadComm.onDataSync<ChunkSyncData, ChunkUnSyncData>(
  DataSyncTypes.chunk
 ),
 voxelPalette: ThreadComm.onDataSync<VoxelPaletteSyncData, any>(
  DataSyncTypes.voxelPalette
 ),
 voxelData: ThreadComm.onDataSync<VoxelDataSync, any>(DataSyncTypes.voxelData),
};
DataSyncNode.chunk.addOnSync((data) => {
 WorldRegister.chunk.add(data[0], data[1], data[2], data[3], data[4]);
});

DataSyncNode.voxelPalette.addOnSync((data) => {
 WorldData.setVoxelPalette(data[0], data[1]);
});

DataSyncNode.voxelData.addOnSync((data) => {
 VoxelData.syncData(data[0], data[1]);
});
