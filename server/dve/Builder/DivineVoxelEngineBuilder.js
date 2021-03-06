//objects
import { EngineSettings } from "../Global/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { ShapeHelper } from "./Shapes/ShapeHelper.js";
import { ShapeManager } from "./Shapes/ShapeManager.js";
import { ShapeBuilder } from "./Shapes/ShapeBuilder.js";
import { VoxelManager } from "./Voxels/VoxelManager.js";
import { VoxelHelper } from "./Voxels/VoxelHelper.js";
import { TextureManager } from "./Textures/TextureManager.js";
import { ChunkProcessor } from "./Processor/ChunkProcessor.js";
import { ChunkMeshBuilder } from "./Mesher/ChunkMeshBuilder.js";
//matrix
import { MatrixHub } from "../Matrix/MatrixHub.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
//inter comms
import { WorldComm } from "./InterComms/World/WorldComm.js";
import { RenderComm } from "./InterComms/Render/RenderComm.js";
//functions
import { InitWorker } from "./Init/InitWorker.js";
export const DVEB = {
    environment: "browser",
    __settingsHaveBeenSynced: false,
    __connectedToWorld: false,
    _3dFlatArray: Util.getFlat3DArray(),
    worldBounds: Util.getWorldBounds(),
    UTIL: Util,
    settings: EngineSettings,
    renderComm: RenderComm,
    worldComm: WorldComm,
    worldMatrix: WorldMatrix,
    matrixHub: MatrixHub,
    textureManager: TextureManager,
    voxelManager: VoxelManager,
    voxelHelper: VoxelHelper,
    shapeManager: ShapeManager,
    shapeHelper: ShapeHelper,
    shapeBuilder: ShapeBuilder,
    chunkMesher: ChunkMeshBuilder,
    chunkProccesor: ChunkProcessor,
    syncSettings(data) {
        this.settings.syncSettings(data);
        this.settings.syncWithWorldBounds(this.worldBounds);
        this.__settingsHaveBeenSynced = true;
    },
    reStart() { },
    isReady() {
        return (DVEB.__connectedToWorld &&
            DVEB.matrixHub.worldPort !== undefined &&
            DVEB.voxelManager.shapMapIsSet() &&
            DVEB.worldComm.port !== null &&
            DVEB.textureManager.isReady() &&
            DVEB.__settingsHaveBeenSynced);
    },
    async $INIT(initData) {
        this.settings.setContext("DVEB");
        await InitWorker(this, initData);
        this.worldComm.sendMessage("ready", []);
    },
    async buildChunk(chunkX, chunkY, chunkZ) {
        let chunk = this.worldMatrix.getChunk(chunkX, chunkY, chunkZ);
        if (!chunk) {
            await this.matrixHub.requestChunkSync(chunkX, chunkY, chunkZ);
            chunk = this.worldMatrix.getChunk(chunkX, chunkY, chunkZ);
            if (!chunk) {
                console.warn(`${chunkX} ${chunkY} ${chunkZ} could not be loaded`);
                return;
            }
        }
        const template = this.chunkProccesor.makeAllChunkTemplates(chunk, chunkX, chunkY, chunkZ);
        this.chunkMesher.buildChunkMesh(chunkX, chunkY, chunkZ, template);
        return true;
    },
};
console.log("hello from builder");
DVEB.environment = Util.getEnviorment();
