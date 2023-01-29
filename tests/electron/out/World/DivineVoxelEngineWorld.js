//threads
import { ParentComm, NexusComm, RichWorldComm, DataComm, FXComm, CCM, } from "./Threads/Threads.js";
//queues
import { ConstructorQueues } from "../Common/Queues/ConstructorQueues.js";
//tasks
import { ConstructorTasks } from "../Common/Tasks/ConstructorTasks.js";
//objects
import { EngineSettings } from "../Data/Settings/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
//data
import { DataSync } from "./Data/DataSync.js";
import { DataManager } from "../Data/DataManager.js";
import { VoxelManager } from "./Data/Managers/VoxelManager.js";
import { ItemManager } from "../Data/Items/ItemManager.js";
import { WorldDataGenerator } from "./Data/Generators/WorldDataGenerator.js";
//tags
import { VoxelTagBuilder } from "./Data/TagBuilders/VoxelTagBuilder.js";
//tools
import { BuilderTool } from "../Tools/Build/BuilderTool.js";
import { GetAdvancedBrushTool } from "../Tools/Brush/AdvancedBrushTool.js";
import { ChunkDataTool } from "../Tools/Data/WorldData/ChunkDataTool.js";
import { ColumnDataTool } from "../Tools/Data/WorldData/ColumnDataTool.js";
import { DataTool } from "../Tools/Data/DataTool.js";
import { TasksTool } from "../Tools/Tasks/TasksTool.js";
import { HeightMapTool } from "../Tools/Data/WorldData/HeightMapTool.js";
import { RegionDataTool } from "../Tools/Data/WorldData/RegionDataTool.js";
import { DataLoaderTool } from "../Tools/Data/DataLoaderTool.js";
//functions
import { InitWorldWorker } from "./Init/InitWorldWorker.js";
import { ThreadComm } from "../Libs/ThreadComm/ThreadComm.js";
import { ChunkDataTags } from "./Data/Tags/ChunkTags.js";
import { WorldTasks } from "./Tasks/WorldTasks.js";
/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker context.
 */
export const DVEW = {
    environment: "browser",
    __settingsHaveBeenSynced: false,
    __renderIsDone: false,
    __serverIsDone: false,
    TC: ThreadComm,
    UTIL: Util,
    settings: EngineSettings,
    worldTasks: WorldTasks,
    generators: {
        worldData: WorldDataGenerator,
    },
    data: DataManager,
    dataSync: DataSync,
    fxComm: FXComm,
    dataComm: DataComm,
    nexusComm: NexusComm,
    parentComm: ParentComm,
    ccm: CCM,
    richWorldComm: RichWorldComm,
    voxelManager: VoxelManager,
    itemManager: ItemManager,
    cQueues: ConstructorQueues,
    cTasks: ConstructorTasks,
    tags: {
        voxels: VoxelTagBuilder,
        chunks: ChunkDataTags,
    },
    isReady() {
        return (DVEW.ccm.isReady() &&
            DVEW.__settingsHaveBeenSynced &&
            (DVEW.__renderIsDone || DVEW.__serverIsDone));
    },
    syncSettings(data) {
        this.settings.syncSettings(data);
        this.__settingsHaveBeenSynced = true;
    },
    async $INIT() {
        await InitWorldWorker(this);
    },
    getAllTools() {
        return {
            brush: this.getBrush(),
            builder: this.getBuilder(),
            data: this.getDataTool(),
            chunkData: this.getChunkDataTool(),
            columnData: this.getColumnDataTool(),
            regonData: this.getRegionTool(),
            heightMap: this.getHeightMapTool(),
            tasks: this.getTasksTool(),
        };
    },
    getBrush() {
        return GetAdvancedBrushTool();
    },
    getBuilder() {
        return new BuilderTool();
    },
    getDataTool() {
        return new DataTool();
    },
    getRegionTool() {
        return new RegionDataTool();
    },
    getChunkDataTool() {
        return new ChunkDataTool();
    },
    getColumnDataTool() {
        return new ColumnDataTool();
    },
    getHeightMapTool() {
        return new HeightMapTool();
    },
    getTasksTool() {
        return TasksTool();
    },
    getDataLoaderTool() {
        return new DataLoaderTool();
    },
};
DVEW.environment = Util.getEnviorment();
DVEW.TC.threadName = "world";
