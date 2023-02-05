//objects
import { VoxelDataGenerator } from "./Generators/VoxelDataGenerator.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { DataSyncTypes } from "../../Common/Threads/Contracts/DataSync.js";
import { ChunkDataTags, InitalizeChunkTags } from "./Tags/ChunkTags.js";
import { ColumnDataTags, InitalizeColumnTags } from "./Tags/ColumnTags.js";
import { InitalizeRegionTags, RegionDataTags, RegionHeaderTagManager, } from "./Tags/RegionTags.js";
import { VoxelTags } from "../../Data/Voxel/VoxelTags.js";
import { RegionHeaderRegister } from "../../Data/World/Region/RegionHeaderRegister.js";
import { DimensionsRegister } from "../../Data/World/Dimensions/DimensionsRegister.js";
import { VoxelTagBuilder } from "./TagBuilders/VoxelTagBuilder.js";
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
    voxelDataCreator: VoxelDataGenerator,
    comms: {},
    commOptions: {},
    _ready: false,
    $INIT() {
        this.voxelDataCreator.$generateVoxelData();
        VoxelTagBuilder.$SYNC();
        InitalizeChunkTags();
        InitalizeColumnTags();
        InitalizeRegionTags();
        this.voxelPalette.sync();
        this.voxelTags.sync();
        this.chunkTags.sync();
        this.columnTags.sync();
        this.regionTags.sync();
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
    dimesnion: new DataSyncNode({
        dataSyncType: DataSyncTypes.dimesnion,
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
        dataSyncType: DataSyncTypes.chunk,
        commCheck: (options) => options.worldData,
        getSyncData: (input) => {
            const chunk = WorldRegister.chunk.get(input);
            if (!chunk)
                return false;
            return [input, chunk.buffer];
        },
        getUnSyncData: () => true,
    }),
    column: new DataSyncNode({
        dataSyncType: DataSyncTypes.column,
        commCheck: (options) => options.worldData,
        getSyncData: (input) => {
            const column = WorldRegister.column.get(input);
            if (!column)
                return false;
            return [input, column.buffer];
        },
        getUnSyncData: () => true,
    }),
    region: new DataSyncNode({
        dataSyncType: DataSyncTypes.region,
        commCheck: (options) => options.worldData,
        getSyncData: (input) => {
            const region = WorldRegister.region.get(input);
            if (!region)
                return false;
            return [input, region.buffer];
        },
        getUnSyncData: () => true,
    }),
    regionHeader: new DataSyncNode({
        dataSyncType: DataSyncTypes.regionHeader,
        commCheck: (options) => options.worldData,
        getSyncData: (input) => {
            const regionHeader = RegionHeaderRegister.get(input);
            if (!regionHeader)
                return false;
            return [input, regionHeader.buffer];
        },
        getUnSyncData: () => true,
    }),
    voxelTags: new DataSyncNode({
        dataSyncType: DataSyncTypes.voxelTags,
        commCheck: (options) => options.voxelTags,
        getSyncData: () => [
            VoxelTags.initData,
            VoxelTags.voxelIndex.buffer,
        ],
        getUnSyncData: () => false,
    }),
    chunkTags: new DataSyncNode({
        dataSyncType: DataSyncTypes.chunkTags,
        commCheck: (options) => options.worldDataTags,
        getSyncData: () => ChunkDataTags.initData,
        getUnSyncData: () => false,
    }),
    columnTags: new DataSyncNode({
        dataSyncType: DataSyncTypes.columnTags,
        commCheck: (options) => options.worldDataTags,
        getSyncData: () => ColumnDataTags.initData,
        getUnSyncData: () => false,
    }),
    regionTags: new DataSyncNode({
        dataSyncType: DataSyncTypes.regionTags,
        commCheck: (options) => options.worldDataTags,
        getSyncData: () => [RegionDataTags.initData, RegionHeaderTagManager.initData],
        getUnSyncData: () => false,
    }),
    voxelPalette: new DataSyncNode({
        dataSyncType: DataSyncTypes.voxelPalette,
        commCheck: (options) => options.worldDataTags,
        getSyncData: () => [
            VoxelDataGenerator.palette._palette,
            VoxelDataGenerator.palette._map,
        ],
        getUnSyncData: () => false,
    }),
    stringMap: new DataSyncNode({
        dataSyncType: DataSyncTypes.registerStringMap,
        commCheck: () => true,
        getSyncData: (data) => data,
        getUnSyncData: () => false,
    }),
};
