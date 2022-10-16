//matrix
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
//objects
import { EngineSettings } from "../Global/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { WorldBounds } from "../Data/World/WorldBounds.js";
//intercomms
import { WorldComm } from "./InterComms/World/WorldComm.js";
import { ParentComm } from "./InterComms/Parent/ParentComm.js";
//functions
import { InitWorker } from "./Init/InitWorker.js";
import { DataSyncNode } from "../Data/DataSyncNode.js";
import { DataManager } from "../Data/DataManager.js";
export const DVEFX = {
    environment: "browser",
    __settingsHaveBeenSynced: false,
    _3dFlatArray: Util.getFlat3DArray(),
    worldBounds: WorldBounds,
    UTIL: Util,
    settings: EngineSettings,
    dataSyncNode: DataSyncNode,
    data: DataManager,
    worldMatrix: WorldMatrix,
    worldComm: WorldComm,
    parentComm: ParentComm,
    syncSettings(data) {
        this.settings.syncSettings(data);
        this.settings.syncWithWorldBounds(this.worldBounds);
        this.__settingsHaveBeenSynced = true;
    },
    reStart() { },
    isReady() {
        return DVEFX.worldComm.isPortSet() && DVEFX.__settingsHaveBeenSynced;
    },
    async $INIT(data) {
        await InitWorker(this, data);
    },
};
