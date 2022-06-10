//objects
import { EngineSettings } from "../Global/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { DVEB } from "./Builder/DivineVoxelEngineBuilder.js";
import { DVEP } from "./Propagation/DivineVoxelEngineWorldPropagation.js";
//inter comms
import { RenderComm } from "./InterComms/Render/RenderComm.js";
import { WorldComm } from "./InterComms/World/WorldComm.js";
//matrix
import { MatrixHub } from "../Matrix/MatrixHub.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
import { InitWorker } from "./Init/InitWorker.js";
import { VoxelManager } from "./Voxels/VoxelManager.js";
import { QueuesManager } from "./Queues/QueuesManager.js";
export const DVEC = {
    environment: "browser",
    __settingsHaveBeenSynced: false,
    __connectedToWorld: false,
    __queueStatesSet: false,
    _3dFlatArray: Util.getFlat3DArray(),
    worldBounds: Util.getWorldBounds(),
    UTIL: Util,
    settings: EngineSettings,
    DVEB: DVEB,
    DVEP: DVEP,
    queues: QueuesManager,
    worldMatrix: WorldMatrix,
    matrixHub: MatrixHub,
    renderComm: RenderComm,
    worldComm: WorldComm,
    voxelManager: VoxelManager,
    syncSettings(data) {
        this.settings.syncSettings(data);
        this.settings.syncWithWorldBounds(this.worldBounds);
        this.__settingsHaveBeenSynced = true;
    },
    reStart() { },
    isReady() {
        return (DVEC.__connectedToWorld &&
            DVEC.matrixHub.worldPort !== undefined &&
            DVEC.worldComm.port !== null &&
            DVEC.__settingsHaveBeenSynced,
            DVEB.textureManager.isReady());
    },
    async $INIT(initData) {
        this.settings.setContext("DVEC");
        await InitWorker(this, initData);
        this.worldComm.sendMessage("ready", []);
    },
};
DVEC.environment = Util.getEnviorment();
