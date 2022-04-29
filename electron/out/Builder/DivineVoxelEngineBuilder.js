import { EngineSettings } from "../Global/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { ChunkMeshBuilder } from "./ChunkMeshBuilder.js";
import { InitWorker } from "./Init/InitWorker.js";
import { ShapeHelper } from "./Shapes/ShapeHelper.js";
import { ShapeManager } from "./Shapes/ShapeManager.js";
import { MatrixHub } from "../Matrix/MatrixHub.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
import { RenderComm } from "./InterComms/Render/RenderComm.js";
import { WorldComm } from "./InterComms/World/WorldComm.js";
import { ChunkBounds } from "../Global/Chunks/ChunkBounds.js";
import { VoxelManager } from "./Voxels/VoxelManager.js";
import { VoxelHelper } from "./Voxels/VoxelHelper.js";
export class DivineVoxelEngineBuilder {
    environment = "browser";
    worker;
    UTIL = new Util();
    worldMatrix = new WorldMatrix();
    matrixHub = new MatrixHub("builder-1", this.worldMatrix);
    renderComm = RenderComm;
    worldComm = WorldComm;
    chunkBounds = new ChunkBounds();
    voxelManager = new VoxelManager(this);
    voxelHelper = new VoxelHelper(this);
    __connectedToWorld = false;
    engineSettings = new EngineSettings();
    shapeManager = new ShapeManager();
    shapeHelper = new ShapeHelper(this.UTIL);
    builder = new ChunkMeshBuilder(this, this.shapeManager, this.UTIL);
    syncSettings(data) {
        this.engineSettings.syncSettings(data);
        this.engineSettings.syncSettings(data);
        if (data.chunks) {
            this.chunkBounds.setChunkBounds(data.chunks.chunkXPow2, data.chunks.chunkYPow2, data.chunks.chunkZPow2);
            this.worldMatrix.syncChunkBounds();
        }
    }
    reStart() { }
    isReady() {
        return this.__connectedToWorld && this.matrixHub.worldPort !== undefined;
    }
    async $INIT(initData) {
        await InitWorker(this, initData);
    }
}
//@ts-ignore
export const DVEB = new DivineVoxelEngineBuilder(self);
//@ts-ignore
if (typeof process !== "undefined" && typeof Worker === "undefined") {
    DVEB.environment = "node";
}
