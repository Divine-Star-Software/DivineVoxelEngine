import { EngineSettings } from "../Global/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { ChunkMeshBuilder } from "./ChunkMeshBuilder.js";
import { InitWorker } from "./Init/InitWorker.js";
import { ShapeHelper } from "./Shapes/ShapeHelper.js";
import { ShapeManager } from "./Shapes/ShapeManager.js";
import { MatrixHub } from "../Matrix/MatrixHub.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
export class DivineVoxelEngineBuilder {
    worker;
    UTIL = new Util();
    worldMatrix = new WorldMatrix();
    matrixHub = new MatrixHub("builder", this.worldMatrix);
    engineSettings = new EngineSettings();
    shapeManager = new ShapeManager();
    shapeHelper = new ShapeHelper(this.UTIL);
    builder = new ChunkMeshBuilder(this, this.shapeManager, this.UTIL);
    syncSettings(data) {
        this.engineSettings.syncSettings(data);
    }
    reStart() {
    }
    $INIT(worker) {
        this.worker = worker;
        InitWorker(this);
    }
}
//@ts-ignore
export const DVEB = new DivineVoxelEngineBuilder(self);
