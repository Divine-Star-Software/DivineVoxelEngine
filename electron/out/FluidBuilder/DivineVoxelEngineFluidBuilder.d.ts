import type { DVEFBInitData } from "Meta/FluidBuilder/DVEFB.js";
import type { EngineSettingsData } from "Meta/Global/EngineSettings.types.js";
import { ShapeHelper } from "./Shapes/ShapeHelper.js";
import { ShapeManager } from "./Shapes/ShapeManager.js";
import { Util } from "../Global/Util.helper.js";
import { FluidMeshBuilder } from "./Mesher/FluidMeshBuilder.js";
export declare class DivineVoxelEngineFluidBuilder {
    util: Util;
    environment: "node" | "browser";
    worldComm: import("../Meta/Comms/InterComm.types.js").InterCommInterface;
    renderComm: import("../Meta/Comms/InterComm.types.js").InterCommInterface & {
        onReady: () => void;
        onRestart: () => void;
    };
    __settingsHaveBeenSynced: boolean;
    engineSettings: {
        settings: EngineSettingsData;
        syncSettings(data: EngineSettingsData): void;
        getSettingsCopy(): any;
    };
    shapeHelper: ShapeHelper;
    shapeManager: ShapeManager;
    fluidMeshBuilder: FluidMeshBuilder;
    constructor();
    isReady(): boolean;
    reStart(): void;
    syncSettings(data: EngineSettingsData): void;
    $INIT(initData: DVEFBInitData): Promise<void>;
}
export declare const DVEFB: DivineVoxelEngineFluidBuilder;
