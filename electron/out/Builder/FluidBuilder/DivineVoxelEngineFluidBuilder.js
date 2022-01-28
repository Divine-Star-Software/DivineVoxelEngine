import { ShapeHelper } from "../Shapes/ShapeHelper.js";
import { ShapeManager } from "../Shapes/ShapeManager.js";
import { Util } from "../../Global/Util.helper.js";
import { FluidMeshBuilder } from "./FluidMeshBuilder.js";
import { InitWorker } from "./Functions/InitFluidMeshWorker.js";
import { EngineSettings } from "../../Global/EngineSettings.js";
export class DivineVoxelEngineFluidBuilder {
    util = new Util();
    worker;
    engineSettings = new EngineSettings();
    shapeHelper = new ShapeHelper(this.util);
    shapeManager = new ShapeManager();
    fluidMeshBuilder = new FluidMeshBuilder(this.shapeManager, this.util);
    constructor() { }
    reStart() { }
    syncSettings(data) {
        this.engineSettings.syncSettings(data);
    }
    $INIT(worker) {
        this.worker = worker;
        InitWorker(this);
    }
}
