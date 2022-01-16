import { ShapeHelper } from "../Shapes/ShapeHelper.js";
import { ShapeManager } from "../Shapes/ShapeManager.js";
import { Util } from "../../Global/Util.helper.js";
import { FluidMeshBuilder } from "./FluildMeshBuilder.js";
import { InitWorker } from "./Functions/InitWorker.js";
export class DivineVoxelEngineFluidBuilder {
    util = new Util();
    worker;
    shapeHelper = new ShapeHelper(this.util);
    shapeManager = new ShapeManager();
    fluidMeshBuilder = new FluidMeshBuilder(this.shapeManager, this.util);
    constructor() {
    }
    $INIT(worker) {
        this.worker = worker;
        InitWorker(this);
    }
    regenMesh() {
        const meshData = this.fluidMeshBuilder.generateMesh();
        const positionArray = new Float32Array(meshData.positions);
        const indiciesArray = new Int32Array(meshData.indices);
        const linearColorsArray = new Float32Array(meshData.colors);
        const fullColorsArray = new Float32Array(meshData.colors);
        const uvArray = new Float32Array(meshData.uvs);
        //@ts-ignore
        DVEFB.worker.postMessage([
            0,
            0,
            0,
            positionArray.buffer,
            indiciesArray.buffer,
            linearColorsArray.buffer,
            fullColorsArray.buffer,
            uvArray.buffer,
        ], 
        //@ts-ignore
        [
            positionArray.buffer,
            indiciesArray.buffer,
            linearColorsArray.buffer,
            fullColorsArray.buffer,
            uvArray.buffer,
        ]);
    }
}
