import { ShapeHelper } from '../Shapes/ShapeHelper.js';
import { ShapeManager } from '../Shapes/ShapeManager.js';
import { Util } from '../../Global/Util.helper.js';
import { FluidMeshBuilder } from './FluidMeshBuilder.js';
import { InitWorker } from './Functions/InitFluidMeshWorker.js';

class DivineVoxelEngineFluidBuilder {
  util = new Util();
  worker;
  shapeHelper = new ShapeHelper(this.util);
  shapeManager = new ShapeManager();
  fluidMeshBuilder = new FluidMeshBuilder(this.shapeManager, this.util);
  constructor() {
  }
  reStart() {
  }
  $INIT(worker) {
    this.worker = worker;
    InitWorker(this);
  }
}

export { DivineVoxelEngineFluidBuilder };
//# sourceMappingURL=divine-voxel-engine.mjs.map
