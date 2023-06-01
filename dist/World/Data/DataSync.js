//objects
import { VoxelDataGenerator } from "./Generators/VoxelDataGenerator.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { DataSyncIds } from "../../Common/Threads/Contracts/DataSyncIds.js";
import { ChunkDataTags, InitalizeChunkTags } from "./Tags/ChunkTags.js";
import { ColumnDataTags, InitalizeColumnTags } from "./Tags/ColumnTags.js";
import { InitalizeRegionTags, RegionDataTags, RegionHeaderTagManager, } from "./Tags/RegionTags.js";
import { VoxelTags } from "../../Data/Voxel/VoxelTags.js";
import { RegionHeaderRegister } from "../../Data/World/Region/RegionHeaderRegister.js";
import { DimensionsRegister } from "../../Data/World/Dimensions/DimensionsRegister.js";
import { VoxelTagBuilder } from "./TagBuilders/VoxelTagBuilder.js";
import { SubstanceDataGenerator } from "./Generators/SubstanceDataGenerator.js";
import { SubstanceTags } from "../../Data/Substance/SubstanceTags.js";
import { SubstanceTagBuilder } from "./TagBuilders/SubstanceTagBuilder.js";
class DataSyncNode {
    data;
    constructor(data) {
        this.data = data;
    }
    unSync(input) {
        const output = this.data.getUnSyncData(input);
        if (!output)
            return false;
        DataSync.loopThroughComms((comm, options) => {
            if (!this.data.commCheck(options))
                return false;
            comm.unSyncData(this.data.dataSyncType, output);
        });
    }
    unSyncInThread(commName, input) {
        const comm = DataSync.comms[commName];
        if (!comm)
            return;
        const output = this.data.getUnSyncData(input);
        if (!output)
            return false;
        if (!this.data.commCheck(DataSync.commOptions[commName]))
            return false;
        comm.unSyncData(this.data.dataSyncType, output);
    }
    sync(input) {
        const output = this.data.getSyncData(input);
        if (!output)
            return false;
        DataSync.loopThroughComms((comm, options) => {
            if (!this.data.commCheck(options))
                return false;
            comm.syncData(this.data.dataSyncType, output);
        });
    }
    syncInThread(commName, input) {
        const comm = DataSync.comms[commName];
        if (!comm)
            return;
        const output = this.data.getSyncData(input);
        if (!output)
            return false;
        if (!this.data.commCheck(DataSync.commOptions[commName]))
            return false;
        comm.syncData(this.data.dataSyncType, output);
    }
}
//type WorldDataSync = [LocationData,SharedArrayBuffer]
export const DataSync = {
    comms: {},
    commOptions: {},
    _ready: false,
    $INIT() {
        VoxelDataGenerator.$generate();
        VoxelTagBuilder.sync();
        SubstanceDataGenerator.$generate();
        SubstanceTagBuilder.sync();
        InitalizeChunkTags();
        InitalizeColumnTags();
        InitalizeRegionTags();
        this.palettes.voxel.sync();
        this.palettes.substance.sync();
        this.tags.voxel.sync();
        this.tags.substance.sync();
        this.tags.chunk.sync();
        this.tags.column.sync();
        this.tags.region.sync();
        this._ready = true;
    },
    isReady() {
        return this._ready;
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
    loopThroughComms(func) {
        for (const commKey of Object.keys(DataSync.comms)) {
            const comm = DataSync.comms[commKey];
            const options = DataSync.commOptions[commKey];
            if (!comm.isReady())
                continue;
            func(comm, options);
        }
    },
    worldData: {
        dimesnion: new DataSyncNode({
            dataSyncType: DataSyncIds.dimesnion,
            commCheck: (options) => options.worldData,
            getSyncData: (input) => {
                const dimensionData = DimensionsRegister.getDimension(input);
                if (!dimensionData)
                    return false;
                return dimensionData;
            },
            getUnSyncData: () => true,
        }),
        chunk: new DataSyncNode({
            dataSyncType: DataSyncIds.chunk,
            commCheck: (options) => options.worldData,
            getSyncData: (input) => {
                const chunk = WorldRegister.chunk.get(input);
                if (!chunk)
                    return false;
                return [input, chunk.buffer];
            },
            getUnSyncData: (input) => input,
        }),
        column: new DataSyncNode({
            dataSyncType: DataSyncIds.column,
            commCheck: (options) => options.worldData,
            getSyncData: (input) => {
                const column = WorldRegister.column.get(input);
                if (!column)
                    return false;
                return [input, column.buffer];
            },
            getUnSyncData: (input) => input,
        }),
        region: new DataSyncNode({
            dataSyncType: DataSyncIds.region,
            commCheck: (options) => options.worldData,
            getSyncData: (input) => {
                const region = WorldRegister.region.get(input);
                if (!region)
                    return false;
                return [input, region.buffer];
            },
            getUnSyncData: (input) => input,
        }),
        regionHeader: new DataSyncNode({
            dataSyncType: DataSyncIds.regionHeader,
            commCheck: (options) => options.worldData,
            getSyncData: (input) => {
                const regionHeader = RegionHeaderRegister.get(input);
                if (!regionHeader)
                    return false;
                return [input, regionHeader.buffer];
            },
            getUnSyncData: () => true,
        }),
    },
    tags: {
        voxel: new DataSyncNode({
            dataSyncType: DataSyncIds.voxelTags,
            commCheck: (options) => options.voxelTags,
            getSyncData: () => [
                VoxelTags.initData,
                VoxelTags.voxelIndex.buffer,
            ],
            getUnSyncData: () => false,
        }),
        substance: new DataSyncNode({
            dataSyncType: DataSyncIds.substanceTags,
            commCheck: (options) => options.voxelTags,
            getSyncData: () => SubstanceTags.initData,
            getUnSyncData: () => false,
        }),
        chunk: new DataSyncNode({
            dataSyncType: DataSyncIds.chunkTags,
            commCheck: (options) => options.worldDataTags,
            getSyncData: () => ChunkDataTags.initData,
            getUnSyncData: () => false,
        }),
        column: new DataSyncNode({
            dataSyncType: DataSyncIds.columnTags,
            commCheck: (options) => options.worldDataTags,
            getSyncData: () => ColumnDataTags.initData,
            getUnSyncData: () => false,
        }),
        region: new DataSyncNode({
            dataSyncType: DataSyncIds.regionTags,
            commCheck: (options) => options.worldDataTags,
            getSyncData: () => [
                RegionDataTags.initData,
                RegionHeaderTagManager.initData,
            ],
            getUnSyncData: () => false,
        }),
    },
    palettes: {
        voxel: new DataSyncNode({
            dataSyncType: DataSyncIds.voxelPalette,
            commCheck: (options) => options.worldDataTags,
            getSyncData: () => [
                VoxelDataGenerator.palette._palette,
                VoxelDataGenerator.palette._map,
            ],
            getUnSyncData: () => false,
        }),
        substance: new DataSyncNode({
            dataSyncType: DataSyncIds.substancePalette,
            commCheck: (options) => options.worldDataTags,
            getSyncData: () => [
                SubstanceDataGenerator.palette._palette,
                SubstanceDataGenerator.palette._map,
            ],
            getUnSyncData: () => false,
        }),
    },
    maps: {
        strings: new DataSyncNode({
            dataSyncType: DataSyncIds.registerStringMap,
            commCheck: () => true,
            getSyncData: (data) => data,
            getUnSyncData: () => false,
        }),
        objects: new DataSyncNode({
            dataSyncType: DataSyncIds.registerObjectMap,
            commCheck: () => true,
            getSyncData: (data) => data,
            getUnSyncData: () => false,
        }),
    },
};
