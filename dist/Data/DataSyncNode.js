//types
import { VoxelMatrix } from "../Matrix/VoxelMatrix.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
//objects
import { ThreadComm } from "../Libs/ThreadComm/ThreadComm.js";
import { WorldData } from "./World/WorldData.js";
import { WorldRegister } from "./World/WorldRegister.js";
import { DataSyncTypes } from "../Constants/Data/DataSync.js";
import { VoxelData } from "./Voxel/VoxelData.js";
export const DataSyncNode = {
    chunk: ThreadComm.onDataSync(DataSyncTypes.chunk),
    voxelPalette: ThreadComm.onDataSync(DataSyncTypes.voxelPalette),
    voxelData: ThreadComm.onDataSync(DataSyncTypes.voxelData),
};
DataSyncNode.chunk.addOnSync((data) => {
    WorldMatrix.__setChunk(data[1], data[2], data[3], data[4], new SharedArrayBuffer(16));
    WorldRegister.chunk.add(data[0], data[1], data[2], data[3], data[4]);
});
DataSyncNode.voxelPalette.addOnSync((data) => {
    WorldMatrix.__setGlobalVoxelPalette(data[0], data[1]);
    WorldData.setVoxelPalette(data[0], data[1]);
});
DataSyncNode.voxelData.addOnSync((data) => {
    try {
        VoxelMatrix.syncData(data[0], data[1]);
        VoxelData.syncData(data[0], data[1]);
    }
    catch (error) {
        console.log(data);
    }
});
