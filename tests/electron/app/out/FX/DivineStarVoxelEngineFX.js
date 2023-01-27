//objects
import { EngineSettings } from "../Data/Settings/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
//intercomms
import { WorldComm } from "./Threads/World/WorldComm.js";
import { ParentComm } from "./Threads/Parent/ParentComm.js";
//functions
import { InitWorker } from "./Init/InitWorker.js";
import { DataSyncNode } from "../Data/DataSyncNode.js";
import { DataManager } from "../Data/DataManager.js";
export const DVEFX = {
    environment: "browser",
    __settingsHaveBeenSynced: false,
    UTIL: Util,
    settings: EngineSettings,
    dataSyncNode: DataSyncNode,
    data: DataManager,
    worldComm: WorldComm,
    parentComm: ParentComm,
    syncSettings(data) {
        this.settings.syncSettings(data);
    },
    reStart() { },
    isReady() {
        return DVEFX.worldComm.isPortSet() && DVEFX.__settingsHaveBeenSynced;
    },
    async $INIT() {
        await InitWorker(this);
    }
};
