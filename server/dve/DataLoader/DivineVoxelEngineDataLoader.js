//matrix
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
//objects
import { EngineSettings } from "../Global/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { DataManager } from "./DataManager/DataManager.js";
//intercomms
import { WorldComm } from "./InterComms/World/WorldComm.js";
import { ParentComm } from "./InterComms/Parent/ParentComm.js";
//functions
import { InitWorker } from "./Init/InitWorker.js";
import { WorldBounds } from "../Data/World/WorldBounds.js";
import { DataSyncNode } from "../Data/DataSyncNode.js";
import { DataSync } from "../World/Data/DataSync.js";
export const DVEDL = {
    environment: "browser",
    __settingsHaveBeenSynced: false,
    __connectedToWorld: false,
    __queueStatesSet: false,
    _3dFlatArray: Util.getFlat3DArray(),
    worldBounds: WorldBounds,
    UTIL: Util,
    settings: EngineSettings,
    dataSyncNode: DataSyncNode,
    data: DataSync,
    worldMatrix: WorldMatrix,
    worldComm: WorldComm,
    parentComm: ParentComm,
    dataManager: DataManager,
    syncSettings(data) {
        this.settings.syncSettings(data);
        this.settings.syncWithWorldBounds(this.worldBounds);
        this.__settingsHaveBeenSynced = true;
    },
    reStart() { },
    isReady() {
        return (DVEDL.__connectedToWorld &&
            DVEDL.worldComm.isPortSet() &&
            DVEDL.__settingsHaveBeenSynced);
    },
    async $INIT(data) {
        await InitWorker(this, data);
    },
};
