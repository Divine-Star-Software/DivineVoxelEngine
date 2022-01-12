import { Util } from "../Global/Util.helper.js";
import { ChunkMeshBuilder } from "./ChunkMeshBuilder.js";
import { InitWorker } from "./Functions/InitWorker.js";
import { ShapeHelper } from "./Shapes/ShapeHelper.js";
import { ShapeManager } from "./Shapes/ShapeManager.js";
export class DivineVoxelEngineBuilder {
    worker;
    UTIL = new Util();
    shapeManager = new ShapeManager();
    shapeHelper = new ShapeHelper(this.UTIL);
    builder = new ChunkMeshBuilder(this.shapeManager, this.UTIL);
    $INIT(worker) {
        this.worker = worker;
        InitWorker(this);
    }
}
