//matrix
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
//objects
import { EngineSettings } from "../Global/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
//intercomms
import { WorldComm } from "./InterComms/World/WorldComm.js";
import { ParentComm } from "./InterComms/Parent/ParentComm.js";
//functions
import { InitWorker } from "./Init/InitWorker.js";
import { RichData } from "./RichData/RichData.js";
import { VoxelManager } from "../Voxels/VoxelManager.js";
import { WorldBounds } from "../Data/World/WorldBounds.js";
export const DVERW = {
    environment: "browser",
    __settingsHaveBeenSynced: false,
    __queueStatesSet: false,
    _3dFlatArray: Util.getFlat3DArray(),
    worldBounds: WorldBounds,
    UTIL: Util,
    settings: EngineSettings,
    worldMatrix: WorldMatrix,
    worldComm: WorldComm,
    parentComm: ParentComm,
    richData: RichData,
    voxelManager: VoxelManager,
    syncSettings(data) {
        this.settings.syncSettings(data);
        this.settings.syncWithWorldBounds(this.worldBounds);
        this.__settingsHaveBeenSynced = true;
    },
    reStart() { },
    isReady() {
        return (DVERW.worldComm.isReady() &&
            DVERW.__settingsHaveBeenSynced);
    },
    async $INIT(data) {
        await InitWorker(this, data);
    },
};
