//objects
import { EngineSettings } from "../Global/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { WorldData } from "./WorldData/WorldData.js";
import { WorldGeneration } from "./WorldGenration/WorldGeneration.js";
import { VoxelManager } from "../Voxels/VoxelManager.js";
import { ItemManager } from "../Items/ItemManager.js";
import { EntityConstructor } from "./EntityConstructor/EntityConstructor.js";
//inter comms
import { FXComm } from "./InterComms/FX/FXComm.js";
import { RichWorldComm } from "./InterComms/RichWorld/RichWorldComm.js";
import { DataComm } from "./InterComms/Data/DataComm.js";
import { NexusComm } from "./InterComms/Nexus/NexusComm.js";
import { RenderComm } from "./InterComms/Render/RenderComm.js";
import { ConstructorCommManager } from "./InterComms/Constructor/ConstructorCommManager.js";
//matrix
import { MatrixCentralHub } from "./Matrix/MatrixCentralHub.js";
import { Matrix } from "./Matrix/Matrix.js";
import { VoxelMatrix } from "./Matrix/VoxelMatrix.js";
//functions
import { InitWorldWorker } from "./Init/InitWorldWorker.js";
import { QueuesManager } from "./Queues/QueuesManager.js";
/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker context.
 */
export const DVEW = {
    environment: "browser",
    _3dFlatArray: Util.getFlat3DArray(),
    worldBounds: Util.getWorldBounds(),
    __settingsHaveBeenSynced: false,
    __renderIsDone: false,
    UTIL: Util,
    settings: EngineSettings,
    matrix: Matrix,
    matrixCentralHub: MatrixCentralHub,
    voxelMatrix: VoxelMatrix,
    fxComm: FXComm,
    dataComm: DataComm,
    nexusComm: NexusComm,
    renderComm: RenderComm,
    constructorCommManager: ConstructorCommManager,
    richWorldComm: RichWorldComm,
    worldGeneration: WorldGeneration,
    worldData: WorldData,
    entityConstructor: EntityConstructor,
    voxelManager: VoxelManager,
    itemManager: ItemManager,
    queues: QueuesManager,
    isReady() {
        let ready = DVEW.constructorCommManager.isReady() &&
            DVEW.__settingsHaveBeenSynced &&
            DVEW.__renderIsDone;
        return ready;
    },
    syncSettings(data) {
        this.settings.syncSettings(data);
        this.settings.syncWithWorldBounds(this.worldBounds);
        this.__settingsHaveBeenSynced = true;
    },
    /**# Remove Chunk
     * ---
     * Removes a chunk from the render thread.
     * Can also delete the chunk from world ata.
     */
    removeChunk(chunkX, chunkY, chunkZ, deleteChunk = false) {
        const chunk = this.worldData.getChunk(chunkX, chunkY, chunkZ);
        if (!chunk)
            return false;
        this.renderComm.sendMessage("remove-chunk", [chunkX, chunkY, chunkZ]);
        if (deleteChunk) {
            this.worldData.removeChunk(chunkX, chunkY, chunkZ);
            this.matrixCentralHub.releaseChunk(chunkX, chunkY, chunkZ);
        }
        return true;
    },
    /**# Delete Chunk
     * ---
     * Deletes a chunk from world data and releases it from all threads.
     */
    deleteChunk(chunkX, chunkY, chunkZ) {
        this.worldData.removeChunk(chunkX, chunkY, chunkZ);
        this.matrixCentralHub.releaseChunk(chunkX, chunkY, chunkZ);
    },
    buildChunk(chunkX, chunkY, chunkZ, LOD = 1) {
        this.queues.addToRebuildQueTotal();
        this.constructorCommManager.requestFullChunkBeBuilt(chunkX, chunkY, chunkZ, LOD);
    },
    generate(x, z, data = []) {
        this.queues.addToGenerationTotal();
        this.constructorCommManager.runGeneration(x, z, data);
    },
    buildWorldColumn(x, z, LOD = 1) {
        const worldColumn = this.worldData.getWorldColumn(x, z);
        if (!worldColumn)
            return false;
        for (const chunkKey of Object.keys(worldColumn)) {
            const chunk = worldColumn[chunkKey];
            this.buildChunk(chunk.position[0], chunk.position[1], chunk.position[2], LOD);
        }
    },
    createItem(itemId, x, y, z) {
        this.constructorCommManager.constructItem(itemId, x, y, z);
    },
    async $INIT(data) {
        this.settings.setContext("DVEW");
        await InitWorldWorker(this, data);
    },
};
DVEW.environment = Util.getEnviorment();
DVEW.voxelManager.onRegister((voxel) => {
    DVEW.worldGeneration.voxelPalette.registerVoxel(voxel);
});
