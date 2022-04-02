import { EngineSettingsData } from "Meta/Global/EngineSettings.types.js";
import { EngineSettings } from "../Global/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { ChunkMeshBuilder } from "./ChunkMeshBuilder.js";
import { InitWorker } from "./Functions/InitWorker.js";
import { ShapeHelper } from "./Shapes/ShapeHelper.js";
import { ShapeManager } from "./Shapes/ShapeManager.js";


export class DivineVoxelEngineBuilder {

    worker : Worker;
    UTIL : Util = new Util();

    engineSettings : EngineSettings = new EngineSettings();
    shapeManager : ShapeManager = new ShapeManager();
    shapeHelper = new ShapeHelper(this.UTIL);
    builder : ChunkMeshBuilder = new ChunkMeshBuilder(this,this.shapeManager,this.UTIL);



    syncSettings(data : EngineSettingsData) {
        
            this.engineSettings.syncSettings(data);
    }
    reStart(){
        
    }

    $INIT(worker : Worker) {
        this.worker = worker;
        InitWorker(this);
    }
}


//@ts-ignore
export const DVEB = new DivineVoxelEngineBuilder((self as Worker));