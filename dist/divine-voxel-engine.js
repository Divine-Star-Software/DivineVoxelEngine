'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ShapeHelper_js = require('../Shapes/ShapeHelper.js');
var ShapeManager_js = require('../Shapes/ShapeManager.js');
var Util_helper_js = require('../../Global/Util.helper.js');
var FluidMeshBuilder_js = require('./FluidMeshBuilder.js');
var InitFluidMeshWorker_js = require('./Functions/InitFluidMeshWorker.js');
var EngineSettings_js = require('../../Global/EngineSettings.js');

class DivineVoxelEngineFluidBuilder {
  util = new Util_helper_js.Util();
  worker;
  engineSettings = new EngineSettings_js.EngineSettings();
  shapeHelper = new ShapeHelper_js.ShapeHelper(this.util);
  shapeManager = new ShapeManager_js.ShapeManager();
  fluidMeshBuilder = new FluidMeshBuilder_js.FluidMeshBuilder(this.shapeManager, this.util);
  constructor() {
  }
  reStart() {
  }
  syncSettings(data) {
    this.engineSettings.syncSettings(data);
  }
  $INIT(worker) {
    this.worker = worker;
    InitFluidMeshWorker_js.InitWorker(this);
  }
}

exports.DivineVoxelEngineFluidBuilder = DivineVoxelEngineFluidBuilder;
//# sourceMappingURL=divine-voxel-engine.js.map
