import { Util } from "../Global/Util.helper.js";
import { ChunkMeshBuilder } from "./ChunkMeshBuilder.js";
import { InitWorker } from "./Functions/InitWorker.js";
import { ShapeHelper } from "./Shapes/ShapeHelper.js";
import { ShapeManager } from "./Shapes/ShapeManager.js";


export class DivineVoxelEngineBuilder {

    worker : Worker;
    UTIL : Util = new Util();

    shapeManager : ShapeManager = new ShapeManager();
    shapeHelper = new ShapeHelper(this.UTIL);
    builder : ChunkMeshBuilder = new ChunkMeshBuilder(this,this.shapeManager,this.UTIL);


    reStart(){
        
    }

    $INIT(worker : Worker) {
        this.worker = worker;
        InitWorker(this);
    }
}