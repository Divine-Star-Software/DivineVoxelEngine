//matrix
import { MatrixHub } from "../Matrix/MatrixHub.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
//objects
import { EngineSettings } from "../Global/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
//intercomms
import { WorldComm } from "./InterComms/World/WorldComm.js";
import { RenderComm } from "./InterComms/Render/RenderComm.js";
//functions
import { InitWorker } from "./Init/InitWorker.js";
export const DVEFX = {
    environment: "browser",
    __settingsHaveBeenSynced: false,
    __connectedToWorld: false,
    __queueStatesSet: false,
    _3dFlatArray: Util.getFlat3DArray(),
    worldBounds: Util.getWorldBounds(),
    UTIL: Util,
    settings: EngineSettings,
    worldMatrix: WorldMatrix,
    matrixHub: MatrixHub,
    worldComm: WorldComm,
    renderComm: RenderComm,
    syncSettings(data) {
        this.settings.syncSettings(data);
        this.settings.syncWithWorldBounds(this.worldBounds);
        this.__settingsHaveBeenSynced = true;
    },
    reStart() { },
    isReady() {
        return (DVEFX.__connectedToWorld &&
            DVEFX.matrixHub.worldPort !== undefined &&
            DVEFX.worldComm.port !== null &&
            DVEFX.__settingsHaveBeenSynced);
    },
    async $INIT(data) {
        await InitWorker(this, data);
    },
};
