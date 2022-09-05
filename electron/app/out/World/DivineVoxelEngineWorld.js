//objects
import { EngineSettings } from "../Global/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { WorldData } from "./WorldData/WorldData.js";
import { WorldGeneration } from "./WorldGenration/WorldGeneration.js";
import { VoxelManager } from "../Voxels/VoxelManager.js";
import { ItemManager } from "../Items/ItemManager.js";
import { EntityConstructor } from "./EntityConstructor/EntityConstructor.js";
//inter comms
import { RenderComm } from "./InterComms/Render/RenderComm.js";
import { ServerComm } from "./InterComms/Server/ServerComm.js";
import { ConstructorCommManager } from "./InterComms/Constructor/ConstructorCommManager.js";
import { NexusComm } from "./InterComms/Nexus/NexusComm.js";
import { RichWorldComm } from "./InterComms/RichWorld/RichWorldComm.js";
import { DataComm } from "./InterComms/Data/DataComm.js";
import { FXComm } from "./InterComms/FX/FXComm.js";
//matrix
import { MatrixCentralHub } from "./Matrix/MatrixCentralHub.js";
import { Matrix } from "./Matrix/Matrix.js";
import { VoxelMatrix } from "./Matrix/VoxelMatrix.js";
import { MatrixMap } from "./Matrix/MatrixMap.js";
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
    chunkReader: Util.getChunkReader(),
    __settingsHaveBeenSynced: false,
    __renderIsDone: false,
    __serverIsDone: false,
    UTIL: Util,
    settings: EngineSettings,
    matrix: Matrix,
    matrixCentralHub: MatrixCentralHub,
    voxelMatrix: VoxelMatrix,
    matrixMap: MatrixMap,
    fxComm: FXComm,
    dataComm: DataComm,
    nexusComm: NexusComm,
    renderComm: RenderComm,
    serverComm: ServerComm,
    constructorCommManager: ConstructorCommManager,
    richWorldComm: RichWorldComm,
    worldGeneration: WorldGeneration,
    worldData: WorldData,
    entityConstructor: EntityConstructor,
    voxelManager: VoxelManager,
    itemManager: ItemManager,
    queues: QueuesManager,
    isReady() {
        return (DVEW.constructorCommManager.isReady() &&
            DVEW.__settingsHaveBeenSynced &&
            (DVEW.__renderIsDone || DVEW.__serverIsDone) &&
            DVEW.matrixMap.isReady());
    },
    syncSettings(data) {
        this.settings.syncSettings(data);
        this.settings.syncWithWorldBounds(this.worldBounds);
        this.chunkReader.syncSettings();
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
            const chunkPOS = this.chunkReader.getChunkPosition(chunk.data);
            this.buildChunk(chunkPOS.x, chunkPOS.y, chunkPOS.z, LOD);
        }
    },
    createItem(itemId, x, y, z) {
        this.constructorCommManager.constructItem(itemId, x, y, z);
    },
    async $INIT(data) {
        this.settings.setContext("DVEW");
        await InitWorldWorker(this, data);
    },
    addChunkFromServer(data) {
        const chunk = this.worldGeneration.createChunkFromServer(data);
        const chunkPOS = this.chunkReader.getChunkPosition(chunk.data);
        this.worldData.setChunk(chunkPOS.x, chunkPOS.y, chunkPOS.z, chunk);
    },
};
DVEW.environment = Util.getEnviorment();
DVEW.voxelManager.onRegister((voxel) => {
    DVEW.worldGeneration.voxelPalette.registerVoxel(voxel);
});
