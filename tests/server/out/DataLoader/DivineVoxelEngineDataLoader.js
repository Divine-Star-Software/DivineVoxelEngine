//objects
import { EngineSettings } from "../Data/Settings/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { DataManager } from "./DataManager/DataManager.js";
//intercomms
import { WorldComm } from "./Threads/World/WorldComm.js";
import { ParentComm } from "./Threads/Parent/ParentComm.js";
//functions
import { InitWorker } from "./Init/InitWorker.js";
import { DataSyncNode } from "../Data/DataSyncNode.js";
import { DataSync } from "../World/Data/DataSync.js";
export const DVEDL = {
    environment: "browser",
    __settingsHaveBeenSynced: false,
    UTIL: Util,
    settings: EngineSettings,
    dataSyncNode: DataSyncNode,
    data: DataSync,
    worldComm: WorldComm,
    parentComm: ParentComm,
    dataManager: DataManager,
    syncSettings(data) {
        this.settings.syncSettings(data);
    },
    reStart() { },
    isReady() {
        return (DVEDL.worldComm.isPortSet() &&
            DVEDL.__settingsHaveBeenSynced);
    },
    async $INIT() {
        await InitWorker(this);
    },
};
