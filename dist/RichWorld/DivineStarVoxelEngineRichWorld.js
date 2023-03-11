//objects
import { EngineSettings } from "../Data/Settings/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
//import { RichWorldTasks } from "./Tasks/Tasks.js";
//threads
import { WorldComm, ParentComm } from "./Threads/RichWorldThreads.js";
//functions
import { InitWorker } from "./Init/InitWorker.js";
import { RichDataRegister } from "./Register/RichDataRegister.js";
import { VoxelManager } from "../World/Data/Managers/VoxelManager.js";
import { WorldBounds } from "../Data/World/WorldBounds.js";
import { ThreadComm } from "threadcomm";
export const DVERW = {
    environment: "browser",
    __settingsHaveBeenSynced: false,
    TC: ThreadComm,
    worldBounds: WorldBounds,
    UTIL: Util,
    settings: EngineSettings,
    worldComm: WorldComm,
    parentComm: ParentComm,
    richData: RichDataRegister,
    voxelManager: VoxelManager,
    async $INIT() {
        await InitWorker(this);
    },
};
