//objects
import { EngineSettings } from "../Data/Settings/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
//import { RichWorldTasks } from "./Tasks/Tasks.js";
//threads
import { WorldComm } from "./Threads/World/WorldComm.js";
import { ParentComm } from "./Threads/Parent/ParentComm.js";
//functions
import { InitWorker } from "./Init/InitWorker.js";
import { RichDataRegister } from "./Register/RichDataRegister.js";
import { VoxelManager } from "../World/Data/Managers/VoxelManager.js";
import { WorldBounds } from "../Data/World/WorldBounds.js";
import { ThreadComm } from "../Libs/ThreadComm/ThreadComm.js";
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
    //takss: RichWorldTasks,
    syncSettings(data) {
        this.settings.syncSettings(data);
        this.settings.syncWithWorldBounds(this.worldBounds);
        this.__settingsHaveBeenSynced = true;
    },
    reStart() { },
    isReady() {
        return DVERW.worldComm.isReady() && DVERW.__settingsHaveBeenSynced;
    },
    async $INIT() {
        await InitWorker(this);
    },
};
