//types
import { DataSyncTypes } from "../../Constants/Data/DataSync.js";
//objects
import { WorldGeneration } from "../WorldGenration/WorldGeneration.js";
import { WorldData } from "../WorldData/WorldData.js";
import { VoxelDataCreator } from "./VoxelDataCreator.js";
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
        this.voxelDataCreator.$INIT();
        this.voxelData.sync();
        this.voxelPalette.sync();
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
        unSyncInThread(commName, dimesnion, chunkX, chunkY, chunkZ) {
            const comm = DataSync.comms[commName];
            comm.unSyncData(DataSyncTypes.chunk, [
                dimesnion,
                chunkX,
                chunkY,
                chunkZ,
            ]);
        },
        sync(dimesnion, chunkX, chunkY, chunkZ) {
            const chunk = WorldData.getChunk(chunkX, chunkY, chunkZ);
            if (!chunk)
                return;
            loopThroughComms((comm) => {
                comm.syncData(DataSyncTypes.chunk, [
                    dimesnion,
                    chunkX,
                    chunkY,
                    chunkZ,
                    chunk.buffer,
                ]);
            });
        },
        syncInThread(commName, dimesnion, chunkX, chunkY, chunkZ) {
            const chunk = WorldData.getChunk(chunkX, chunkY, chunkZ);
            if (!chunk)
                return;
            const comm = DataSync.comms[commName];
            comm.syncData(DataSyncTypes.chunk, [
                dimesnion,
                chunkX,
                chunkY,
                chunkZ,
                chunk.buffer,
            ]);
        },
    },
    voxelData: {
        sync() {
            loopThroughComms((comm) => {
                const voxelData = VoxelDataCreator.voxelBuffer;
                const voxelMap = VoxelDataCreator.voxelMapBuffer;
                comm.syncData(DataSyncTypes.voxelData, [
                    voxelData,
                    voxelMap,
                ]);
            });
        },
        syncInThread(commName) {
            const comm = DataSync.comms[commName];
            const voxelData = VoxelDataCreator.voxelBuffer;
            const voxelMap = VoxelDataCreator.voxelMapBuffer;
            comm.syncData(DataSyncTypes.voxelData, [voxelData, voxelMap]);
        },
    },
    voxelPalette: {
        sync() {
            const voxelPalette = WorldGeneration.voxelPalette.voxelPalette;
            const voxelPaletteMap = WorldGeneration.voxelPalette.voxelPaletteMap;
            loopThroughComms((comm) => {
                comm.syncData(DataSyncTypes.voxelPalette, [
                    voxelPalette,
                    voxelPaletteMap,
                ]);
            });
        },
        syncInThread(commName) {
            const comm = DataSync.comms[commName];
            const voxelPalette = WorldGeneration.voxelPalette.voxelPalette;
            const voxelPaletteMap = WorldGeneration.voxelPalette.voxelPaletteMap;
            comm.syncData(DataSyncTypes.voxelPalette, [
                voxelPalette,
                voxelPaletteMap,
            ]);
        },
    },
};
