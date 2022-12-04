//objects
import { VoxelDataCreator } from "./VoxelDataCreator.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { VoxelPaletteReader } from "../../Data/Voxel/VoxelPalette.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { DataSyncTypes } from "../../Common/Threads/Contracts/DataSync.js";
import { ChunkDataTags, InitalizeChunkTags } from "./Tags/ChunkTags.js";
import { InitalizeColumnTags } from "./Tags/ColumnTags.js";
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
        return new Promise((resolve) => {
            const inte = setInterval(() => {
                if (VoxelDataCreator.isReady()) {
                    this.voxelDataCreator.$createVoxelData();
                    InitalizeChunkTags();
                    InitalizeColumnTags();
                    this.voxelTags.sync();
                    this.voxelPalette.sync();
                    this.chunkTags.sync();
                    VoxelPaletteReader.setVoxelPalette(this.voxelDataCreator.palette._palette, this.voxelDataCreator.palette._map);
                    clearInterval(inte);
                    resolve(true);
                }
            }, 1);
        });
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
    dimesnion: {
        unSync(id) {
            loopThroughComms((comm) => {
                comm.unSyncData(DataSyncTypes.dimesnion, id);
            });
        },
        unSyncInThread(commName, id) {
            const comm = DataSync.comms[commName];
            comm.unSyncData(DataSyncTypes.dimesnion, id);
        },
        sync(data) {
            loopThroughComms((comm) => {
                comm.syncData(DataSyncTypes.dimesnion, data);
            });
        },
        syncInThread(commName, data) {
            const comm = DataSync.comms[commName];
            comm.syncData(DataSyncTypes.dimesnion, data);
        },
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
    column: {
        unSync(dimesnion, chunkX, chunkY, chunkZ) {
            loopThroughComms((comm) => {
                comm.unSyncData(DataSyncTypes.column, [
                    dimesnion,
                    chunkX,
                    chunkY,
                    chunkZ,
                ]);
            });
        },
        unSyncInThread(commName, dimension, chunkX, chunkY, chunkZ) {
            const comm = DataSync.comms[commName];
            comm.unSyncData(DataSyncTypes.column, [
                dimension,
                chunkX,
                chunkY,
                chunkZ,
            ]);
        },
        sync(dimension, x, y, z) {
            const column = WorldRegister.column.get(dimension, x, y, z);
            if (!column)
                return;
            loopThroughComms((comm) => {
                comm.syncData(DataSyncTypes.column, [
                    dimension,
                    x,
                    y,
                    z,
                    column.buffer,
                ]);
            });
        },
        syncInThread(commName, dimesnion, x, y, z) {
            const column = WorldRegister.column.get(dimesnion, x, y, z);
            if (!column)
                return;
            const comm = DataSync.comms[commName];
            comm.syncData(DataSyncTypes.column, [
                dimesnion,
                x,
                y,
                z,
                column.buffer,
            ]);
        },
    },
    chunkTags: {
        sync() {
            loopThroughComms((comm) => {
                comm.syncData(DataSyncTypes.chunkTags, ChunkDataTags.initData);
            });
        },
        syncInThread(commName) {
            const comm = DataSync.comms[commName];
            comm.syncData(DataSyncTypes.chunkTags, ChunkDataTags.initData);
        },
    },
    voxelTags: {
        sync() {
            loopThroughComms((comm) => {
                comm.syncData(DataSyncTypes.voxelData, [
                    VoxelDataCreator.initData,
                    VoxelDataCreator.voxelMapBuffer,
                ]);
            });
        },
        syncInThread(commName) {
            const comm = DataSync.comms[commName];
            comm.syncData(DataSyncTypes.voxelData, [
                VoxelDataCreator.initData,
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
ThreadComm.onDataSync("shape-map", (data) => {
    VoxelDataCreator.setShapeMap(data);
});
