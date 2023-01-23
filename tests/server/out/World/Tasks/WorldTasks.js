import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
//data
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { WorldDataGenerator } from "../Data/Generators/WorldDataGenerator.js";
import { DataSync } from "../Data/DataSync.js";
import { RegionDataTool } from "../../Tools/Data/WorldData/RegionDataTool.js";
import { ColumnDataTool } from "../../Tools/Data/WorldData/ColumnDataTool.js";
import { ChunkDataTool } from "../../Tools/Data/WorldData/ChunkDataTool.js";
import { RegionHeaderRegister } from "../../Data/World/Region/RegionHeaderRegister.js";
import { DataLoaderTool } from "../../Tools/Data/DataLoaderTool.js";
import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
const regionTool = new RegionDataTool();
const columnTool = new ColumnDataTool();
const chunkTool = new ChunkDataTool();
const dataLoaderTool = new DataLoaderTool();
const loadInMap = new Map();
export const WorldTasks = {
    addChunk: ThreadComm.registerTasks("add-chunk", (location) => {
        const chunk = WorldRegister.chunk.get(location);
        if (chunk) {
            DataSync.chunk.sync(location);
            return;
        }
        if (dataLoaderTool.isEnabled()) {
            WorldSpaces.column.getPositionLocation(location);
            const columnLocation = WorldSpaces.column.getLocation();
            if (loadInMap.has(columnLocation.toString()))
                return;
            loadInMap.set(columnLocation.toString(), true);
            dataLoaderTool
                .setLocation(columnLocation)
                .loadIfExists((success) => {
                loadInMap.delete(columnLocation.toString());
                if (success) {
                    DataSync.chunk.sync(location);
                    return;
                }
                WorldRegister.chunk.add(location, WorldDataGenerator.chunk.create());
            });
            return;
        }
        if (!chunk) {
            WorldRegister.chunk.add(location, WorldDataGenerator.chunk.create());
        }
    }),
    unLoad: {
        unLoadColumn: ThreadComm.registerTasks("unload-column", (data) => {
            DataSync.column.unSync(data);
            WorldRegister.column.remove(data);
            const region = WorldRegister.region.get(data);
            if (region && region.columns.size == 0) {
                WorldRegister.region.remove(data);
                DataSync.region.unSync(data);
            }
        }),
    },
    load: {
        loadRegino: ThreadComm.registerTasks("load-region", (data) => {
            regionTool.setBuffer(data[0]);
            const location = regionTool.getLocationData();
            WorldRegister.region.add(location, data[0]);
            DataSync.region.sync(location);
        }),
        loadReginoHeader: ThreadComm.registerTasks("load-region-header", (data) => {
            RegionHeaderRegister.add(data[0], data[1]);
            const location = data[0];
            DataSync.regionHeader.sync(location);
        }),
        loadColumn: ThreadComm.registerTasks("load-column", (data) => {
            columnTool.setBuffer(data[0]);
            const location = columnTool.getLocationData();
            WorldRegister.column.add(location, data[0]);
            DataSync.column.sync(location);
        }),
        loadChunk: ThreadComm.registerTasks("load-chunk", (data) => {
            chunkTool.setBuffer(data[0]);
            const location = chunkTool.getLocationData();
            WorldRegister.chunk.add(location, data[0]);
            DataSync.chunk.sync(location);
        }),
    },
};
