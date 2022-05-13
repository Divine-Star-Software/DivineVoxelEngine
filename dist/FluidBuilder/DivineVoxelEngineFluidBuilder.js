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
    engineSettings = EngineSettings;
    shapeHelper = new ShapeHelper(this.util);
    shapeManager = new ShapeManager();
    fluidMeshBuilder = new FluidMeshBuilder(this.shapeManager, this.util);
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
export const DVEFB = new DivineVoxelEngineFluidBuilder();
//@ts-ignore
if (typeof process !== "undefined" && typeof Worker === "undefined") {
    DVEFB.environment = "node";
}
