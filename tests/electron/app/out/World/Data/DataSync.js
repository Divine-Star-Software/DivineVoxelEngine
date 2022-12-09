//objects
import { VoxelDataCreator } from "./VoxelDataCreator.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { VoxelPaletteReader } from "../../Data/Voxel/VoxelPalette.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { DataSyncTypes } from "../../Common/Threads/Contracts/DataSync.js";
import { ChunkDataTags, InitalizeChunkTags } from "./Tags/ChunkTags.js";
import { ColumnDataTags, InitalizeColumnTags } from "./Tags/ColumnTags.js";
import { InitalizeRegionTags } from "./Tags/RegionTags.js";
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
                    InitalizeRegionTags();
                    this.voxelPalette.sync();
                    this.voxelTags.sync();
                    this.chunkTags.sync();
                    this.columnTags.sync();
                    this.regionTags.sync();
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
        unSync(dimesnion, x, y, z) {
            loopThroughComms((comm) => {
                comm.unSyncData(DataSyncTypes.chunk, [dimesnion, x, y, z]);
            });
        },
        unSyncInThread(commName, dimension, x, y, z) {
            const comm = DataSync.comms[commName];
            comm.unSyncData(DataSyncTypes.chunk, [dimension, x, y, z]);
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
        unSync(dimesnion, x, y, z) {
            loopThroughComms((comm) => {
                comm.unSyncData(DataSyncTypes.column, [
                    dimesnion,
                    x,
                    y,
                    z,
                ]);
            });
        },
        unSyncInThread(commName, dimension, x, y, z) {
            const comm = DataSync.comms[commName];
            comm.unSyncData(DataSyncTypes.column, [
                dimension,
                x,
                y,
                z,
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
    region: {
        unSync(dimesnion, x, y, z) {
            loopThroughComms((comm) => {
                comm.unSyncData(DataSyncTypes.region, [
                    dimesnion,
                    x,
                    y,
                    z,
                ]);
            });
        },
        unSyncInThread(commName, dimension, x, y, z) {
            const comm = DataSync.comms[commName];
            comm.unSyncData(DataSyncTypes.region, [
                dimension,
                x,
                y,
                z,
            ]);
        },
        sync(dimension, x, y, z) {
            const region = WorldRegister.region.get(dimension, x, y, z);
            if (!region)
                return;
            loopThroughComms((comm) => {
                comm.syncData(DataSyncTypes.region, [
                    dimension,
                    x,
                    y,
                    z,
                    region.buffer,
                ]);
            });
        },
        syncInThread(commName, dimesnion, x, y, z) {
            const region = WorldRegister.region.get(dimesnion, x, y, z);
            if (!region)
                return;
            const comm = DataSync.comms[commName];
            comm.syncData(DataSyncTypes.column, [
                dimesnion,
                x,
                y,
                z,
                region.buffer,
            ]);
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
    columnTags: {
        sync() {
            loopThroughComms((comm) => {
                comm.syncData(DataSyncTypes.columnTags, ColumnDataTags.initData);
            });
        },
        syncInThread(commName) {
            const comm = DataSync.comms[commName];
            comm.syncData(DataSyncTypes.columnTags, ColumnDataTags.initData);
        },
    },
    regionTags: {
        sync() {
            loopThroughComms((comm) => {
                comm.syncData(DataSyncTypes.regionTags, ColumnDataTags.initData);
            });
        },
        syncInThread(commName) {
            const comm = DataSync.comms[commName];
            comm.syncData(DataSyncTypes.regionTags, ColumnDataTags.initData);
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
