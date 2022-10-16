//types
import { WorldMatrix } from "Matrix/WorldMatrix.js";
//objects
import { ThreadComm } from "../Libs/ThreadComm/ThreadComm.js";
import { WorldData } from "./WorldData.js";
import { WorldRegister } from "./WorldRegister.js";
export const DataSync = {
    chunk: ThreadComm.onDataSync("chunk"),
    voxelPalette: ThreadComm.onDataSync("voxel-palette"),
    voxelData: ThreadComm.onDataSync("voxel-palette"),
};
DataSync.chunk.addOnSync((data) => {
    WorldMatrix.__setChunk(data[1], data[2], data[3], data[4], new SharedArrayBuffer(16));
    WorldRegister.chunk.add(data[0], data[1], data[2], data[3], data[4]);
});
DataSync.voxelPalette.addOnSync((data) => {
    WorldMatrix.__setGlobalVoxelPalette(data[0], data[1]);
    WorldData.setVoxelPalette(data[0], data[1]);
});
DataSync.voxelData.addOnSync((data) => {
    WorldMatrix.__setGlobalVoxelPalette(data[0], data[1]);
    WorldData.setVoxelPalette(data[0], data[1]);
});
