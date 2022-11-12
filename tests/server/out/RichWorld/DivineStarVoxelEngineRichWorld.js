//objects
import { EngineSettings } from "../Data/Settings/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { RichWorldTasks } from "./Tasks/Tasks.js";
//threads
import { WorldComm } from "./Threads/World/WorldComm.js";
import { ParentComm } from "./Threads/Parent/ParentComm.js";
//functions
import { InitWorker } from "./Init/InitWorker.js";
import { RichData } from "./RichData/RichData.js";
import { VoxelManager } from "../Data/Voxel/VoxelManager.js";
import { WorldBounds } from "../Data/World/WorldBounds.js";
export const DVERW = {
    environment: "browser",
    __settingsHaveBeenSynced: false,
    worldBounds: WorldBounds,
    UTIL: Util,
    settings: EngineSettings,
    worldComm: WorldComm,
    parentComm: ParentComm,
    richData: RichData,
    voxelManager: VoxelManager,
    takss: RichWorldTasks,
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
