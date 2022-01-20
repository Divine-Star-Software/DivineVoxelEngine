import type { DivineVoxelEngine } from "../DivineVoxelEngine";

export class BuilderWorkerManager {
 numBuilders = 4;
 count = 0;
 builders: Worker[] = [];

 fluidBuilder: Worker;

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
   this.DVE.meshManager.handleUpdate(
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
   this.DVE.meshManager.handleUpdate(
    "flora",
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
   this.DVE.meshManager.handleUpdate(
    "magma",
    chunkKey,
    chunkX,
    chunkY,
    chunkZ,
    data
   );
  },
 };

 constructor(private DVE: DivineVoxelEngine) {
       const numBuilders = 4;

    if(window.navigator.hardwareConcurrency > numBuilders) {
      //use all possible cores if we can
      this.numBuilders = window.navigator.hardwareConcurrency;
      ;
    }
    
 }

 createBuilderWorker(path: string) {
  //  "../Contexts/MeshBuilders/ChunkMeshBuilder.worker.js",
  for (let i = 0; i < this.numBuilders; i++) {
   this.builders[i] = new Worker(new URL(path, import.meta.url), {
    type: "module",
   });
   this.builders[i].onerror = (er: ErrorEvent) => {
    console.log(er);
   };
   this.builders[i].onmessage = async (event) => {
    this._handleBuildMeshMessage(event);
   };

   const channel = new MessageChannel();
   const worldWorker = this.DVE.world.getWorker();
   const builderWorker = this.builders[i];

   //connect builder to world
   worldWorker.postMessage(["connect-builder"], [channel.port1]);
   //connect world to builder
   builderWorker.postMessage(["connect-world"], [channel.port2]);
  }
 }

 createFluidBuilderWorker(path: string) {
  this.fluidBuilder = new Worker(new URL(path, import.meta.url), {
   type: "module",
  });
  this.fluidBuilder.onerror = (er: ErrorEvent) => {
   console.log(er);
  };
  this.fluidBuilder.onmessage = async (event) => {
   this._handlFluideBuildMeshMessage(event);
  };

  const channel = new MessageChannel();
  const worldWorker = this.DVE.world.getWorker();

  //connect world to fluid builder
  worldWorker.postMessage(["connect-fluid-builder"], [channel.port1]);
  //connect fluid builder to world
  this.fluidBuilder.postMessage(["connect-world"], [channel.port2]);
 }

 async _handlFluideBuildMeshMessage(event: MessageEvent) {
  const meshType = event.data[0];
  const chunkX = event.data[1];
  const chunkY = event.data[2];
  const chunkZ = event.data[3];
  const chunkKey = `${chunkX}-${chunkZ}-${chunkY}`;

  this.DVE.meshManager.handleUpdate(
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
}
