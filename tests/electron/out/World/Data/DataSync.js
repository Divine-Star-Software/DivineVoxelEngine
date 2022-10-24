//types
import { DataSyncTypes } from "../../Data/Constants/Data/DataSync.js";
import { DataHooks } from "../../Data/DataHooks.js";
//objects
import { VoxelDataCreator } from "./VoxelDataCreator.js";
import { DataCreator } from "./Creator.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { WorldData } from "../../Data/World/WorldData.js";
import { ChunkReader } from "../../Data/Chunk/ChunkReader.js";
import { DVEW } from "../DivineVoxelEngineWorld.js";
const loopThroughComms = (func) => {
    for (const commKey of Object.keys(DataSync.comms)) {
        const comm = DataSync.comms[commKey];
        if (!comm.isReady())
            continue;
        func(comm);
    }
};
export const DataSync = {
    voxelDataCreator: VoxelDataCreator,
    comms: {},
    commOptions: {},
    $INIT() {
        this.voxelDataCreator.$createVoxelData();
        this.voxelData.sync();
        this.voxelPalette.sync();
        WorldData.setVoxelPalette(this.voxelDataCreator.palette._palette, this.voxelDataCreator.palette._map);
    },
    isReady() {
        return this.voxelDataCreator.isReady();
    },
    registerComm(comm) {
        this.comms[comm.name] = comm;
        this.commOptions[comm.name] = {
            chunks: true,
            voxelPalette: true,
            voxelData: true,
        };
    },
    chunk: {
        unSync(dimesnion, chunkX, chunkY, chunkZ) {
            loopThroughComms((comm) => {
                comm.unSyncData(DataSyncTypes.chunk, [
                    dimesnion,
                    chunkX,
                    chunkY,
                    chunkZ,
                ]);
            });
        },
        unSyncInThread(commName, dimension, chunkX, chunkY, chunkZ) {
            const comm = DataSync.comms[commName];
            comm.unSyncData(DataSyncTypes.chunk, [
                dimension,
                chunkX,
                chunkY,
                chunkZ,
            ]);
        },
        sync(dimension, x, y, z) {
            const chunk = WorldRegister.chunk.get(dimension, x, y, z);
            if (!chunk)
                return;
            loopThroughComms((comm) => {
                comm.syncData(DataSyncTypes.chunk, [
                    dimension,
                    x,
                    y,
                    z,
                    chunk.buffer,
                ]);
            });
        },
        syncInThread(commName, dimesnion, x, y, z) {
            const chunk = WorldRegister.chunk.get(dimesnion, x, y, z);
            if (!chunk)
                return;
            const comm = DataSync.comms[commName];
            comm.syncData(DataSyncTypes.chunk, [
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
                comm.syncData(DataSyncTypes.voxelData, [
                    VoxelDataCreator.voxelBuffer,
                    VoxelDataCreator.voxelMapBuffer,
                ]);
            });
        },
        syncInThread(commName) {
            const comm = DataSync.comms[commName];
            comm.syncData(DataSyncTypes.voxelData, [
                VoxelDataCreator.voxelBuffer,
                VoxelDataCreator.voxelMapBuffer,
            ]);
        },
    },
    voxelPalette: {
        sync() {
            loopThroughComms((comm) => {
                comm.syncData(DataSyncTypes.voxelPalette, [
                    DataSync.voxelDataCreator.palette._palette,
                    DataSync.voxelDataCreator.palette._map,
                ]);
            });
        },
        syncInThread(commName) {
            const comm = DataSync.comms[commName];
            comm.syncData(DataSyncTypes.voxelPalette, [
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
