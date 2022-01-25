import { Util } from "../Global/Util.helper.js";
import { ChunkMeshBuilder } from "./ChunkMeshBuilder.js";
import { ShapeHelper } from "./Shapes/ShapeHelper.js";
import { ShapeManager } from "./Shapes/ShapeManager.js";
export declare class DivineVoxelEngineBuilder {
    worker: Worker;
    UTIL: Util;
    shapeManager: ShapeManager;
    shapeHelper: ShapeHelper;
    builder: ChunkMeshBuilder;
    reStart(): void;
    $INIT(worker: Worker): void;
}
