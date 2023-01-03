//objects
import { VoxelDataGenerator } from "./Generators/VoxelDataGenerator.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { VoxelPaletteReader } from "../../Data/Voxel/VoxelPalette.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { DataSyncTypes } from "../../Common/Threads/Contracts/DataSync.js";
import { ChunkDataTags, InitalizeChunkTags } from "./Tags/ChunkTags.js";
import { ColumnDataTags, InitalizeColumnTags } from "./Tags/ColumnTags.js";
import { InitalizeRegionTags, RegionDataTags, RegionHeaderTagManager, } from "./Tags/RegionTags.js";
import { VoxelTags } from "../../Data/Voxel/VoxelTags.js";
import { RegionHeaderRegister } from "../../Data/World/Region/RegionHeaderRegister.js";
const loopThroughComms = (func) => {
    for (const commKey of Object.keys(DataSync.comms)) {
        const comm = DataSync.comms[commKey];
        const options = DataSync.commOptions[commKey];
        if (!comm.isReady())
            continue;
        func(comm, options);
    }
};
export const DataSync = {
    voxelDataCreator: VoxelDataGenerator,
    comms: {},
    commOptions: {},
    $INIT() {
        return new Promise((resolve) => {
            const inte = setInterval(() => {
                if (VoxelDataGenerator.isReady()) {
                    this.voxelDataCreator.$generateVoxelData();
                    InitalizeChunkTags();
                    InitalizeColumnTags();
                    InitalizeRegionTags();
                    this.voxelPalette.sync();
                    this.voxelTags.sync();
                    this.chunkTags.sync();
                    this.columnTags.sync();
                    this.regionTags.sync();
                    this.materials.sync();
                    this.colliders.sync();
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
    registerComm(comm, data = {}) {
        this.comms[comm.name] = comm;
        this.commOptions[comm.name] = {
            worldData: data.worldData !== undefined ? data.worldData : true,
            voxelPalette: data.voxelPalette !== undefined ? data.voxelPalette : true,
            voxelTags: data.voxelTags !== undefined ? data.voxelTags : true,
            materials: data.materials !== undefined ? data.materials : false,
            colliders: data.colliders !== undefined ? data.colliders : false,
            worldDataTags: data.worldDataTags !== undefined ? data.worldDataTags : true,
        };
    },
    dimesnion: {
        unSync(id) {
            loopThroughComms((comm, options) => {
                if (!options.worldData)
                    return;
                comm.unSyncData(DataSyncTypes.dimesnion, id);
            });
        },
        unSyncInThread(commName, id) {
            const comm = DataSync.comms[commName];
            if (!comm)
                return;
            const options = DataSync.commOptions[commName];
            if (!options.worldData)
                return;
            comm.unSyncData(DataSyncTypes.dimesnion, id);
        },
        sync(data) {
            loopThroughComms((comm, options) => {
                if (!options.worldData)
                    return;
                comm.syncData(DataSyncTypes.dimesnion, data);
            });
        },
        syncInThread(commName, data) {
            const comm = DataSync.comms[commName];
            if (!comm)
                return;
            const options = DataSync.commOptions[commName];
            if (!options.worldData)
                return;
            comm.syncData(DataSyncTypes.dimesnion, data);
        },
    },
    chunk: {
        unSync(dimesnion, x, y, z) {
            loopThroughComms((comm, options) => {
                if (!options.worldData)
                    return;
                comm.unSyncData(DataSyncTypes.chunk, [dimesnion, x, y, z]);
            });
        },
        unSyncInThread(commName, dimension, x, y, z) {
            const comm = DataSync.comms[commName];
            if (!comm)
                return;
            const options = DataSync.commOptions[commName];
            if (!options.worldData)
                return;
            comm.unSyncData(DataSyncTypes.chunk, [dimension, x, y, z]);
        },
        sync(dimension, x, y, z) {
            const chunk = WorldRegister.chunk.get(dimension, x, y, z);
            if (!chunk)
                return;
            loopThroughComms((comm, options) => {
                if (!options.worldData)
                    return;
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
            if (!comm)
                return;
            const options = DataSync.commOptions[commName];
            if (!options.worldData)
                return;
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
            loopThroughComms((comm, options) => {
                if (!options.worldData)
                    return;
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
            if (!comm)
                return;
            const options = DataSync.commOptions[commName];
            if (!options.worldData)
                return;
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
            loopThroughComms((comm, options) => {
                if (!options.worldData)
                    return;
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
            if (!comm)
                return;
            const options = DataSync.commOptions[commName];
            if (!options.worldData)
                return;
            comm.syncData(DataSyncTypes.column, [
                dimesnion,
                x,
                y,
                z,
                column.buffer,
            ]);
        },
    },
    regionHeader: {
        unSync(dimesnion, x, y, z) {
            loopThroughComms((comm, options) => {
                if (!options.worldData)
                    return;
                comm.unSyncData(DataSyncTypes.regionHeader, [
                    dimesnion,
                    x,
                    y,
                    z,
                ]);
            });
        },
        unSyncInThread(commName, dimension, x, y, z) {
            const comm = DataSync.comms[commName];
            if (!comm)
                return;
            const options = DataSync.commOptions[commName];
            if (!options.worldData)
                return;
            comm.unSyncData(DataSyncTypes.regionHeader, [
                dimension,
                x,
                y,
                z,
            ]);
        },
        sync(dimension, x, y, z) {
            const region = RegionHeaderRegister.get([dimension, x, y, z]);
            if (!region)
                return;
            loopThroughComms((comm, options) => {
                if (!options.worldData)
                    return;
                comm.syncData(DataSyncTypes.regionHeader, [
                    dimension,
                    x,
                    y,
                    z,
                    region.buffer,
                ]);
            });
        },
        syncInThread(commName, dimension, x, y, z) {
            const region = RegionHeaderRegister.get([dimension, x, y, z]);
            if (!region)
                return;
            const comm = DataSync.comms[commName];
            if (!comm)
                return;
            const options = DataSync.commOptions[commName];
            if (!options.worldData)
                return;
            comm.syncData(DataSyncTypes.regionHeader, [
                dimension,
                x,
                y,
                z,
                region.buffer,
            ]);
        },
    },
    region: {
        unSync(dimesnion, x, y, z) {
            loopThroughComms((comm, options) => {
                if (!options.worldData)
                    return;
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
            if (!comm)
                return;
            const options = DataSync.commOptions[commName];
            if (!options.worldData)
                return;
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
            loopThroughComms((comm, options) => {
                if (!options.worldData)
                    return;
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
            if (!comm)
                return;
            const options = DataSync.commOptions[commName];
            if (!options.worldData)
                return;
            comm.syncData(DataSyncTypes.region, [
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
            loopThroughComms((comm, options) => {
                if (!options.voxelTags)
                    return;
                comm.syncData(DataSyncTypes.voxelData, [
                    VoxelDataGenerator.initData,
                    VoxelDataGenerator.voxelMapBuffer,
                ]);
            });
        },
        syncInThread(commName) {
            const comm = DataSync.comms[commName];
            if (!comm)
                return;
            const options = DataSync.commOptions[commName];
            if (!options.voxelTags)
                return;
            comm.syncData(DataSyncTypes.voxelData, [
                VoxelDataGenerator.initData,
                VoxelDataGenerator.voxelMapBuffer,
            ]);
        },
    },
    materials: {
        sync() {
            loopThroughComms((comm, options) => {
                if (!options.materials)
                    return;
                comm.syncData(DataSyncTypes.materials, [
                    VoxelTags.materialMap,
                ]);
            });
        },
        syncInThread(commName) {
            const comm = DataSync.comms[commName];
            if (!comm)
                return;
            const options = DataSync.commOptions[commName];
            if (!options.materials)
                return;
            comm.syncData(DataSyncTypes.materials, [
                VoxelTags.materialMap,
            ]);
        },
    },
    colliders: {
        sync() {
            loopThroughComms((comm, options) => {
                if (!options.colliders)
                    return;
                comm.syncData(DataSyncTypes.colliders, [
                    VoxelTags.colliderMap,
                ]);
            });
        },
        syncInThread(commName) {
            const comm = DataSync.comms[commName];
            if (!comm)
                return;
            const options = DataSync.commOptions[commName];
            if (!options.colliders)
                return;
            comm.syncData(DataSyncTypes.colliders, [
                VoxelTags.colliderMap,
            ]);
        },
    },
    chunkTags: {
        sync() {
            loopThroughComms((comm, options) => {
                if (!options.worldDataTags)
                    return;
                comm.syncData(DataSyncTypes.chunkTags, ChunkDataTags.initData);
            });
        },
        syncInThread(commName) {
            const comm = DataSync.comms[commName];
            if (!comm)
                return;
            const options = DataSync.commOptions[commName];
            if (!options.worldDataTags)
                return;
            comm.syncData(DataSyncTypes.chunkTags, ChunkDataTags.initData);
        },
    },
    columnTags: {
        sync() {
            loopThroughComms((comm, options) => {
                if (!options.worldDataTags)
                    return;
                comm.syncData(DataSyncTypes.columnTags, ColumnDataTags.initData);
            });
        },
        syncInThread(commName) {
            const comm = DataSync.comms[commName];
            if (!comm)
                return;
            const options = DataSync.commOptions[commName];
            if (!options.worldDataTags)
                return;
            comm.syncData(DataSyncTypes.columnTags, ColumnDataTags.initData);
        },
    },
    regionTags: {
        sync() {
            loopThroughComms((comm, options) => {
                if (!options.worldDataTags)
                    return;
                comm.syncData(DataSyncTypes.regionTags, [
                    RegionDataTags.initData,
                    RegionHeaderTagManager.initData,
                ]);
            });
        },
        syncInThread(commName) {
            const comm = DataSync.comms[commName];
            if (!comm)
                return;
            const options = DataSync.commOptions[commName];
            if (!options.worldDataTags)
                return;
            comm.syncData(DataSyncTypes.regionTags, [
                RegionDataTags.initData,
                RegionHeaderTagManager.initData,
            ]);
        },
    },
    voxelPalette: {
        sync() {
            loopThroughComms((comm, options) => {
                if (!options.voxelPalette)
                    return;
                comm.syncData(DataSyncTypes.voxelPalette, [
                    DataSync.voxelDataCreator.palette._palette,
                    DataSync.voxelDataCreator.palette._map,
                ]);
            });
        },
        syncInThread(commName) {
            const comm = DataSync.comms[commName];
            if (!comm)
                return;
            const options = DataSync.commOptions[commName];
            if (!options.voxelPalette)
                return;
            comm.syncData(DataSyncTypes.voxelPalette, [
                DataSync.voxelDataCreator.palette._palette,
                DataSync.voxelDataCreator.palette._map,
            ]);
        },
    },
};
ThreadComm.onDataSync("shape-map", (data) => {
    VoxelDataGenerator.setShapeMap(data);
});
