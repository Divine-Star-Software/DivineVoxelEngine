//objects
import { ThreadComm } from "../Libs/ThreadComm/ThreadComm.js";
import { WorldRegister } from "./World/WorldRegister.js";
import { DataSyncTypes } from "../Common/Threads/Contracts/DataSync.js";
import { VoxelData } from "./Voxel/VoxelData.js";
import { VoxelPaletteReader } from "./Voxel/VoxelPalette.js";
import { DimensionsRegister } from "./Dimensions/DimensionsRegister.js";
export const DataSyncNode = {
    _states: {
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
    chunk: ThreadComm.onDataSync(DataSyncTypes.chunk),
    voxelPalette: ThreadComm.onDataSync(DataSyncTypes.voxelPalette),
    voxelData: ThreadComm.onDataSync(DataSyncTypes.voxelData),
    dimension: ThreadComm.onDataSync(DataSyncTypes.dimesnion),
};
DataSyncNode.chunk.addOnSync((data) => {
    WorldRegister.chunk.add(data[0], data[1], data[2], data[3], data[4]);
});
DataSyncNode.voxelPalette.addOnSync((data) => {
    VoxelPaletteReader.setVoxelPalette(data[0], data[1]);
});
DataSyncNode.voxelData.addOnSync((data) => {
    VoxelData.$INIT(data[0]);
    VoxelData.sync(new Uint16Array(data[1]));
    DataSyncNode._states.voxelData = true;
});
DataSyncNode.dimension.addOnSync((data) => {
    DimensionsRegister.registerDimension(data.id, data.options);
});
