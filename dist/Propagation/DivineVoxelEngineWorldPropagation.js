//objects
import { EngineSettings } from "../Global/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
import { MatrixHub } from "../Matrix/MatrixHub.js";
import { QueuesManager } from "./Queues/QueuesManager.js";
import { VoxelManager } from "./Voxels/VoxelManager.js";
import { VoxelHelper } from "./Voxels/VoxelHelper.js";
import { IlluminationManager } from "./Illumanation/IlluminationManager.js";
//inter comms
import { WorldComm } from "./InterComms/World/WorldComm.js";
import { RenderComm } from "./InterComms/Render/RenderComm.js";
//functions
import { InitWorker } from "./Init/InitWorker.js";
export const DVEP = {
    environment: "browser",
    __settingsHaveBeenSynced: false,
    __connectedToWorld: false,
    __queueStatesSet: false,
    UTIL: Util,
    worldBounds: Util.getWorldBounds(),
    _3dFlatArray: Util.getFlat3DArray(),
    settings: EngineSettings,
    worldMatrix: WorldMatrix,
    matrixHub: MatrixHub,
    worldComm: WorldComm,
    renderComm: RenderComm,
    illumination: IlluminationManager,
    voxelManager: VoxelManager,
    voxelHelper: VoxelHelper,
    queues: QueuesManager,
    syncSettings(data) {
        this.settings.syncSettings(data);
        this.settings.syncWithWorldBounds(this.worldBounds);
        this.__settingsHaveBeenSynced = true;
    },
    isReady() {
        return this.__settingsHaveBeenSynced && this.worldComm.port !== undefined;
    },
    reStart() { },
    async $INIT(initData) {
        this.settings.setContext("DVEP");
        await InitWorker(this, initData);
        this.worldComm.sendMessage("ready", []);
    },
    rebuildQueMap: {},
    addToRebuildQue(x, y, z, substance) {
        const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
        const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
        if (!this.rebuildQueMap[chunkKey]) {
            this.rebuildQueMap[chunkKey] = true;
            //@ts-ignore
            this.worldComm.port.postMessage([0, x, y, z, substance]);
        }
    },
    runRGBFloodFill(x, y, z) {
        this.illumination.runRGBFloodFillAt(x, y, z);
        this.queues.finishRGBLightUpdate();
        this.rebuildQueMap = {};
    },
    runRGBFloodRemove(x, y, z) {
        this.illumination.runRGBFloodRemoveAt(true, x, y, z);
        this.queues.finishRGBLightRemove();
        this.rebuildQueMap = {};
    },
    runSunLightForWorldColumn(x, z, maxY) {
        this.illumination.populateWorldColumnWithSunLight(x, z, maxY);
        this.queues.finishWorldColumnSunLightProp();
    },
    runSunFloodFill(x, y, z) {
        this.illumination.runSunLightUpdateAt(x, y, z);
        this.queues.finishSunLightUpdate();
    },
    runSunFloodFillAtMaxY(x, z, maxY) {
        this.illumination.runSunLightUpdateAtMaxY(x, z, maxY);
        this.queues.finishSunLightUpdateAtMaxY();
    },
    runSunFloodRemove(x, y, z) {
        this.rebuildQueMap = {};
    },
};
console.log("hello from propagation");
DVEP.environment = Util.getEnviorment();
