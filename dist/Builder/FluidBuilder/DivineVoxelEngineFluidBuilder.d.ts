import { ShapeHelper } from "../Shapes/ShapeHelper.js";
import { ShapeManager } from "../Shapes/ShapeManager.js";
import { Util } from "../../Global/Util.helper.js";
import { FluidMeshBuilder } from "./FluidMeshBuilder.js";
import { EngineSettings } from "../../Global/EngineSettings.js";
import { EngineSettingsData } from "Meta/Global/EngineSettings.types.js";
export declare class DivineVoxelEngineFluidBuilder {
    util: Util;
    worker: Worker;
    engineSettings: EngineSettings;
    shapeHelper: ShapeHelper;
    shapeManager: ShapeManager;
    fluidMeshBuilder: FluidMeshBuilder;
    constructor();
    reStart(): void;
    syncSettings(data: EngineSettingsData): void;
    $INIT(worker: Worker): void;
}
