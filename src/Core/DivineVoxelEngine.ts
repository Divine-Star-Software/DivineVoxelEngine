import type { DVEInitData } from "Meta/Core/DVE.js";
import type { EngineSettingsData } from "Meta/Global/EngineSettings.types";

import { Util } from "../Global/Util.helper.js";
import { BuilderWorkerManager } from "./Builders/BuilderWorkerManager.js";
import { World } from "./World/World.js";
import { RenderManager } from "./Render/RenderManager.js";
import { BuildInitalMeshes } from "./Functions/BuildInitalMeshes.js";
import { MeshManager } from "./Meshes/MeshManager.js";
import { EngineSettings } from "../Global/EngineSettings.js";
import { TimerState } from "babylonjs/Misc/timer";

export class DivineVoxelEngine {
 world = new World(this);

 engineSettings = new EngineSettings();
 renderManager = new RenderManager();
 builderManager = new BuilderWorkerManager(this);
 meshManager = new MeshManager(this);
 util: Util = new Util();

 constructor() {}

 _handleOptions() {
  const data = this.engineSettings.settings;
  if (data.textureOptions) {
   if (data.textureOptions.width && data.textureOptions.height) {
    this.renderManager.textureCreator.defineTextureDimensions(
     data.textureOptions.width,
     data.textureOptions.height
    );
   }
  }
 }

 _syncSettings(data: EngineSettingsData) {
  this.engineSettings.syncSettings(data);
  this.world._syncSettings();
  this.builderManager._syncSettings();
 }

 async reStart(data: EngineSettingsData): Promise<void> {
  this._syncSettings(data);
  this._handleOptions();
 }

 async $INIT(data: DVEInitData) {
  this.engineSettings.syncSettings(data);
  this._handleOptions();
  this.world.createWorldWorker(data.worldWorkerPath);
  this.builderManager.createBuilderWorker(data.builderWorkerPath);
  this.builderManager.createFluidBuilderWorker(data.fluidBuilderWorkerPath);
  this._syncSettings(data);
  await this.world.getBaseWorldData();

  window.addEventListener("beforeunload", () => {
   for (const builder of this.builderManager.builders) {
    builder.terminate();
   }
   this.world.worker.terminate();
  });
 }

 async $SCENEINIT(data: { scene: BABYLON.Scene }) {
  // data.scene.enableDepthRenderer();

  await BuildInitalMeshes(this, data.scene);

  this.world.startWorldGen();
 }
}
