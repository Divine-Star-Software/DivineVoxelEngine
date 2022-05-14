import type { DivineVoxelEngineRender } from "../../DivineVoxelEngineRender";

/**# Builder Comm
 * ---
 * Handles communcation with the builder threads and the fluid builder thread.
 * Sends the mesh data from them to the mesh manager.
 */
export class BuilderComm {
 numBuilders = 4;
 count = 0;
 builders: Worker[] = [];



 buildRequestFunctions: Record<
  number,
  (
   chunkKey: string,
   chunkX: number,
   chunkY: number,
   chunkZ: number,
   data: any
  ) => void
 > = {
  //chunk meshes
  0: (
   chunkKey: string,
   chunkX: number,
   chunkY: number,
   chunkZ: number,
   data: any
  ) => {
   this.DVER.meshManager.handleUpdate(
    "solid",
    chunkKey,
    chunkX,
    chunkY,
    chunkZ,
    data
   );
  },
  1: (
   chunkKey: string,
   chunkX: number,
   chunkY: number,
   chunkZ: number,
   data: any
  ) => {
   this.DVER.meshManager.handleUpdate(
    "flora",
    chunkKey,
    chunkX,
    chunkY,
    chunkZ,
    data
   );
  },
  2: (
    chunkKey: string,
    chunkX: number,
    chunkY: number,
    chunkZ: number,
    data: any
   ) => {
    this.DVER.meshManager.handleUpdate(
     "fluid",
     chunkKey,
     chunkX,
     chunkY,
     chunkZ,
     data
    );
   },
  3: (
   chunkKey: string,
   chunkX: number,
   chunkY: number,
   chunkZ: number,
   data: any
  ) => {
   this.DVER.meshManager.handleUpdate(
    "magma",
    chunkKey,
    chunkX,
    chunkY,
    chunkZ,
    data
   );
  },
 };

 constructor(private DVER: DivineVoxelEngineRender) {
  const numBuilders = 4;

  /*   if (window.navigator.hardwareConcurrency > numBuilders) {
   //use all possible cores if we can
   this.numBuilders = window.navigator.hardwareConcurrency;
  } */
 }

 reStart() {
  for (const worker of this.builders) {
   worker.postMessage(["re-start"]);
  }

 }

 setBuilderWorkers(workers: Worker[]) {
  this.builders = workers;
  this.numBuilders = workers.length;
  this._initBuilderWorkers();
 }

 createBuilderWorkers(path: string) {
  //  "../Contexts/MeshBuilders/ChunkMeshBuilder.worker.js",
  for (let i = 0; i < this.numBuilders; i++) {
   this.builders[i] = new Worker(new URL(path, import.meta.url), {
    type: "module",
   });
  }
  this._initBuilderWorkers();
 }

 _initBuilderWorkers() {
  for (let i = 0; i < this.numBuilders; i++) {
   this.builders[i].onerror = (er: ErrorEvent) => {
    console.log(er);
   };
   this.builders[i].onmessage = async (event) => {
    this._handleBuildMeshMessage(event);
   };

   const channel = new MessageChannel();
   const worldWorker = this.DVER.worldComm.getWorker();
   const builderWorker = this.builders[i];

   //connect builder to world
   worldWorker.postMessage(["connect-builder"], [channel.port1]);
   //connect world to builder
   builderWorker.postMessage(["connect-world"], [channel.port2]);
  }
 }



 async _handlFluideBuildMeshMessage(event: MessageEvent) {
  const meshType = event.data[0];
  const chunkX = event.data[1];
  const chunkY = event.data[2];
  const chunkZ = event.data[3];
  const chunkKey = `${chunkX}-${chunkZ}-${chunkY}`;

  this.DVER.meshManager.handleUpdate(
   "fluid",
   chunkKey,
   chunkX,
   chunkY,
   chunkZ,
   event.data
  );
 }

 async _handleBuildMeshMessage(event: MessageEvent) {
  const meshType = event.data[0];
  const chunkX = event.data[1];
  const chunkY = event.data[2];
  const chunkZ = event.data[3];

  const chunkKey = `${chunkX}-${chunkZ}-${chunkY}`;

  this.buildRequestFunctions[meshType](
   chunkKey,
   chunkX,
   chunkY,
   chunkZ,
   event.data
  );
 }

 _syncSettings() {
  const settings = this.DVER.engineSettings.getSettingsCopy();

  for (const builders of this.builders) {
   builders.postMessage(["sync-settings", settings]);
  }

 }
}
