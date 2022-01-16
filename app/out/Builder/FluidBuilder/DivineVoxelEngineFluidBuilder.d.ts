import { ShapeHelper } from "../Shapes/ShapeHelper.js";
import { ShapeManager } from "../Shapes/ShapeManager.js";
import { Util } from "../../Global/Util.helper.js";
import { FluidMeshBuilder } from "./FluildMeshBuilder.js";
export declare class DivineVoxelEngineFluidBuilder {
    util: Util;
    worker: Worker;
    shapeHelper: ShapeHelper;
    shapeManager: ShapeManager;
    fluidMeshBuilder: FluidMeshBuilder;
    constructor();
    $INIT(worker: Worker): void;
    regenMesh(): void;
}
