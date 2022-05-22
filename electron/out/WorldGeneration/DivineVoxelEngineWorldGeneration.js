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
export const DVEWG = {
    environment: "browser",
    __settingsHaveBeenSynced: false,
    __connectedToWorld: false,
    UTIL: Util,
    worldBounds: Util.getWorldBounds(),
    _3dFlatArray: Util.getFlat3DArray(),
    engineSettings: EngineSettings,
    worldMatrix: WorldMatrix,
    matrixHub: MatrixHub,
    worldComm: WorldComm,
    renderComm: RenderComm,
    illumination: IlluminationManager,
    voxelManager: VoxelManager,
    voxelHelper: VoxelHelper,
    queues: QueuesManager,
    syncSettings(data) {
        this.engineSettings.syncSettings(data);
        if (data.chunks) {
            this.worldBounds.setChunkBounds(data.chunks.chunkXPow2, data.chunks.chunkYPow2, data.chunks.chunkZPow2);
            this.worldBounds.syncBoundsWithFlat3DArray(this._3dFlatArray);
        }
        if (data.regions) {
            this.worldBounds.setRegionBounds(data.regions.regionXPow2, data.regions.regionYPow2, data.regions.regionZPow2);
        }
        this.__settingsHaveBeenSynced = true;
    },
    isReady() {
        return this.__settingsHaveBeenSynced;
    },
    reStart() { },
    async $INIT(initData) {
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
        this.illumination.runRGBFloodRemoveAt(false, x, y, z);
        this.worldComm.sendMessage(2, []);
    },
};
DVEWG.environment = Util.getEnviorment();
