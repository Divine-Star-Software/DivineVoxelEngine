import { ShapeHelper } from "../Shapes/ShapeHelper.js";
import { ShapeManager } from "../Shapes/ShapeManager.js";
import { Util } from "../../Global/Util.helper.js";
import { FluidMeshBuilder } from "./FluidMeshBuilder.js";
import { InitWorker } from "./Functions/InitWorker.js";

export class DivineVoxelEngineFluidBuilder {
 util: Util = new Util();

 worker: Worker;

 shapeHelper: ShapeHelper = new ShapeHelper(this.util);
 shapeManager: ShapeManager = new ShapeManager();

 fluidMeshBuilder: FluidMeshBuilder = new FluidMeshBuilder(
  this.shapeManager,
  this.util
 );

 constructor() {}

 $INIT(worker: Worker) {
  this.worker = worker;
  InitWorker(this);
 }

}
