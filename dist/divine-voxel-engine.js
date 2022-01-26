'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Util_helper_js = require('../Global/Util.helper.js');
var BuilderWorkerManager_js = require('./Builders/BuilderWorkerManager.js');
var World_js = require('./World/World.js');
var RenderManager_js = require('./Render/RenderManager.js');
var BuildInitalMeshes_js = require('./Functions/BuildInitalMeshes.js');
var MeshManager_js = require('./Meshes/MeshManager.js');

class DivineVoxelEngine {
  world = new World_js.World(this);
  renderManager = new RenderManager_js.RenderManager();
  builderManager = new BuilderWorkerManager_js.BuilderWorkerManager(this);
  meshManager = new MeshManager_js.MeshManager(this);
  util = new Util_helper_js.Util();
  constructor() {
  }
  _handleOptions(data) {
    if (data.textureOptions) {
      if (data.textureOptions.width && data.textureOptions.height) {
        this.renderManager.textureCreator.defineTextureDimensions(data.textureOptions.width, data.textureOptions.height);
      }
    }
  }
  async reStart(data) {
    this._handleOptions(data);
  }
  async $INIT(data) {
    this._handleOptions(data);
    this.world.createWorldWorker(data.worldWorkerPath);
    this.builderManager.createBuilderWorker(data.builderWorkerPath);
    this.builderManager.createFluidBuilderWorker(data.fluidBuilderWorkerPath);
    await this.world.getBaseWorldData();
    window.addEventListener("beforeunload", () => {
      for (const builder of this.builderManager.builders) {
        builder.terminate();
      }
      this.world.worker.terminate();
    });
  }
  async $SCENEINIT(data) {
    await BuildInitalMeshes_js.BuildInitalMeshes(this, data.scene);
    this.world.startWorldGen();
  }
}

exports.DivineVoxelEngine = DivineVoxelEngine;
//# sourceMappingURL=divine-voxel-engine.js.map
