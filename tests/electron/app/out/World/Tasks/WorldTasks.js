import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
//data
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { WorldDataGenerator } from "../Data/Generators/WorldDataGenerator.js";
import { DataSync } from "../Data/DataSync.js";
import { RegionDataTool } from "../../Tools/Data/WorldData/RegionDataTool.js";
import { ColumnDataTool } from "../../Tools/Data/WorldData/ColumnDataTool.js";
import { ChunkDataTool } from "../../Tools/Data/WorldData/ChunkDataTool.js";
import { RegionHeaderRegister } from "../../Data/World/Region/RegionHeaderRegister.js";
const regionTool = new RegionDataTool();
const columnTool = new ColumnDataTool();
const chunkTool = new ChunkDataTool();
export const WorldTasks = {
    addChunk: ThreadComm.registerTasks("add-chunk", (data) => {
        const chunk = WorldRegister.chunk.get(data[0], data[1], data[2], data[3]);
        if (!chunk) {
            const chunkData = WorldDataGenerator.chunk.create();
            WorldRegister.chunk.add(data[0], data[1], data[2], data[3], chunkData);
        }
        else {
            DataSync.chunk.sync(data[0], data[1], data[2], data[3]);
        }
    }),
    load: {
        loadRegino: ThreadComm.registerTasks("load-region", (data) => {
            regionTool.setBuffer(data[0]);
            const location = regionTool.getLocationData();
            WorldRegister.region.add(location[0], location[1], location[2], location[3], data[0]);
            DataSync.region.sync(location[0], location[1], location[2], location[3]);
        }),
        loadReginoHeader: ThreadComm.registerTasks("load-region-header", (data) => {
            RegionHeaderRegister.add(data[0], data[1]);
            const location = data[0];
            DataSync.regionHeader.sync(location[0], location[1], location[2], location[3]);
        }),
        loadColumn: ThreadComm.registerTasks("load-column", (data) => {
            columnTool.setBuffer(data[0]);
            const location = columnTool.getLocationData();
            WorldRegister.column.add(location[0], location[1], location[3], location[2], data[0]);
            DataSync.column.sync(location[0], location[1], location[3], location[2]);
        }),
        loadChunk: ThreadComm.registerTasks("load-chunk", (data) => {
            chunkTool.setBuffer(data[0]);
            const location = chunkTool.getLocationData();
            WorldRegister.chunk.add(location[0], location[1], location[2], location[3], data[0]);
            DataSync.chunk.sync(location[0], location[1], location[2], location[3]);
        }),
    },
};
