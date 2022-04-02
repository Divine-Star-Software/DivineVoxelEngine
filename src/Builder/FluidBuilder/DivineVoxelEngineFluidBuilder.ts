import { ShapeHelper } from "../Shapes/ShapeHelper.js";
import { ShapeManager } from "../Shapes/ShapeManager.js";
import { Util } from "../../Global/Util.helper.js";
import { FluidMeshBuilder } from "./FluidMeshBuilder.js";
import { InitWorker } from "./Functions/InitFluidMeshWorker.js";
import { EngineSettings } from "../../Global/EngineSettings.js";
import { EngineSettingsData } from "Meta/Global/EngineSettings.types.js";

export class DivineVoxelEngineFluidBuilder {
 util: Util = new Util();

 worker: Worker;

 engineSettings : EngineSettings = new EngineSettings();
 shapeHelper: ShapeHelper = new ShapeHelper(this.util);
 shapeManager: ShapeManager = new ShapeManager();

 fluidMeshBuilder: FluidMeshBuilder = new FluidMeshBuilder(
  this.shapeManager,
  this.util
 );

 constructor() {}

 reStart() {}
 syncSettings(data : EngineSettingsData) {
    this.engineSettings.syncSettings(data);
}
 $INIT(worker: Worker) {
  this.worker = worker;
  InitWorker(this);
 }
}
//@ts-ignore
export const DVEFB = new DivineVoxelEngineFluidBuilder((self as Worker));