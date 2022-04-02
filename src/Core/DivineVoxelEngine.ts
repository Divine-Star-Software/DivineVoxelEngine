import type { DVEInitData } from "Meta/Core/DVE.js";
import type { EngineSettingsData } from "Meta/Global/EngineSettings.types";

import { Util } from "../Global/Util.helper.js";
import { BuilderWorkerManager } from "./Builders/BuilderWorkerManager.js";
import { World } from "./World/World.js";
import { RenderManager } from "./Render/RenderManager.js";
import { BuildInitalMeshes } from "./Functions/BuildInitalMeshes.js";
import { MeshManager } from "./Meshes/MeshManager.js";
import { EngineSettings } from "../Global/EngineSettings.js";

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

  if (typeof data.worldWorker == "string") {
   this.world.createWorldWorker(data.worldWorker);
  } else if (data.worldWorker instanceof Worker) {
   this.world.setWorldWorker(data.worldWorker);
  } else {
   throw Error(
    "Supplied data for World Worker is not correct. Must be path to worker or a worker."
   );
  }

  if (typeof data.builderWorker == "string") {
   this.builderManager.createBuilderWorkers(data.builderWorker);
  } else if (
   Array.isArray(data.builderWorker) &&
   data.builderWorker[0] instanceof Worker
  ) {
   this.builderManager.setBuilderWorkers(data.builderWorker);
  } else {
   throw Error(
    "Supplied data for Builder Workers is not correct. Must be path to worker or an array workers."
   );
  }

  if (typeof data.fluidBuilderWorker == "string") {
   this.builderManager.createFluidBuilderWorker(data.fluidBuilderWorker);
  } else if (data.fluidBuilderWorker instanceof Worker) {
   this.builderManager.setFluidBuilderWorker(data.fluidBuilderWorker);
  } else {
   throw Error(
    "Supplied data for Fluid Worker is not correct. Must be path to worker or a worker."
   );
  }


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

export const DVE = new DivineVoxelEngine();
