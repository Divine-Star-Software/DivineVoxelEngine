//objects
import { ShapeHelper } from "./Shapes/ShapeHelper.js";
import { ShapeManager } from "./Shapes/ShapeManager.js";
import { Util } from "../Global/Util.helper.js";
import { FluidMeshBuilder } from "./Mesher/FluidMeshBuilder.js";
import { InitWorker } from "./Init/InitFluidMeshWorker.js";
import { EngineSettings } from "../Global/EngineSettings.js";
import { WorldComm } from "./InterComms/World/WorldComm.js";
import { RenderComm } from "./InterComms/Render/RenderComm.js";
export class DivineVoxelEngineFluidBuilder {
    util = new Util();
    environment = "browser";
    worldComm = WorldComm;
    renderComm = RenderComm;
    __settingsHaveBeenSynced = false;
    engineSettings = new EngineSettings();
    shapeHelper = new ShapeHelper(this.util);
    shapeManager = new ShapeManager();
    fluidMeshBuilder = new FluidMeshBuilder(this.shapeManager, this.util);
    constructor() { }
    isReady() {
        return this.worldComm.port !== null && this.__settingsHaveBeenSynced;
    }
    reStart() { }
    syncSettings(data) {
        this.engineSettings.syncSettings(data);
        this.__settingsHaveBeenSynced = true;
    }
    async $INIT(initData) {
        await InitWorker(this, initData);
        this.worldComm.sendMessage("ready", []);
    }
}
//@ts-ignore
export const DVEFB = new DivineVoxelEngineFluidBuilder(self);
//@ts-ignore
if (typeof process !== "undefined" && typeof Worker === "undefined") {
    DVEFB.environment = "node";
}
