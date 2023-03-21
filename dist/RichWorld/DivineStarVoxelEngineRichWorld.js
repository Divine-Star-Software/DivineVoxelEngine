//objects
import { EngineSettings } from "../Data/Settings/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
//import { RichWorldTasks } from "./Tasks/Tasks.js";
//data
import { DataSyncNode } from "../Data/DataSyncNode.js";
import { DataManager } from "../Data/DataManager.js";
import { WorldBounds } from "../Data/World/WorldBounds.js";
//threads
import { WorldComm, ParentComm, NexusComm, ConstructorComm, FXComm, DataComm, } from "./Threads/RichWorldThreads.js";
//functions
import { InitWorker } from "./Init/InitWorker.js";
import { RichDataRegister } from "./Register/RichDataRegister.js";
import { VoxelManager } from "../World/Data/Managers/VoxelManager.js";
import { ThreadComm } from "threadcomm";
import { RichWorldTasks } from "./Tasks/RichWorldTasks.js";
import { RichDataTool } from "./Tools/RichDataTool.js";
import { DataTool } from "../Tools/Data/DataTool.js";
export const DVERW = {
    environment: "browser",
    __settingsHaveBeenSynced: false,
    tasks: RichWorldTasks,
    TC: ThreadComm,
    worldBounds: WorldBounds,
    UTIL: Util,
    settings: EngineSettings,
    worldComm: WorldComm,
    parentComm: ParentComm,
    nexusComm: NexusComm,
    constructorComm: ConstructorComm,
    fxComm: FXComm,
    dataComm: DataComm,
    richData: RichDataRegister,
    dataSyncNode: DataSyncNode,
    data: DataManager,
    voxelManager: VoxelManager,
    async $INIT() {
        await InitWorker(this);
    },
    getRichDataTool() {
        return new RichDataTool();
    },
    getDataTool() {
        return new DataTool();
    },
};
