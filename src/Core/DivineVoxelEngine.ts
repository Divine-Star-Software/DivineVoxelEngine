import type { DVEInitData } from "Meta/Core/DVE.js";
import type { EngineSettingsData } from "Meta/Global/EngineSettings.types";

import { Util } from "../Global/Util.helper.js";
import { BuilderComm } from "./Builders/BuilderComm.js";
import { WorldComm } from "./World/WorldComm.js";
import { RenderManager } from "./Render/RenderManager.js";
import { BuildInitalMeshes } from "./Functions/BuildInitalMeshes.js";
import { MeshManager } from "./Meshes/MeshManager.js";
import { EngineSettings } from "../Global/EngineSettings.js";
import { NexusComm } from "./Nexus/NexusComm.js";
import { RenderedEntitesManager } from "./RenderedEntites/RenderedEntites.manager.js";

export class DivineVoxelEngine {
 worldComm = new WorldComm(this);
 nexusComm = new NexusComm(this);

 engineSettings = new EngineSettings();
 renderManager = new RenderManager();
 builderManager = new BuilderComm(this);
 meshManager = new MeshManager(this);

 renderedEntites = new RenderedEntitesManager(this);

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
  this.worldComm._syncSettings();
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
   this.worldComm.createWorldWorker(data.worldWorker);
  } else if (data.worldWorker instanceof Worker) {
   this.worldComm.setWorldWorker(data.worldWorker);
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

  if (data.nexusWorker && data.nexus?.enabled) {
   if (typeof data.nexusWorker == "string") {
    this.nexusComm.createNexusWorker(data.nexusWorker);
   } else if (data.nexusWorker instanceof Worker) {
    this.nexusComm.setNexusWorker(data.nexusWorker);
   } else {
    throw Error(
     "Supplied data for Nexus Worker is not correct. Must be path to worker or a worker."
    );
   }
  }

  this._syncSettings(data);

  await this.worldComm.getBaseWorldData();

  //terminate all workers
  window.addEventListener("beforeunload", () => {
   for (const builder of this.builderManager.builders) {
    builder.terminate();
   }
   this.builderManager.fluidBuilder.terminate();
   this.worldComm.worker.terminate();
   if (this.nexusComm.worker) {
    this.nexusComm.worker.terminate();
   }
  });
 }

 async $SCENEINIT(data: { scene: BABYLON.Scene }) {
  await BuildInitalMeshes(this, data.scene);
  this.worldComm.start();
  if (this.engineSettings.settings.nexus?.enabled) {
   this.renderedEntites.setScene(data.scene);
  }
 }
}

export const DVE = new DivineVoxelEngine();
