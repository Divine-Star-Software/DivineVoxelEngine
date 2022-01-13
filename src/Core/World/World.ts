import type { DivineVoxelEngine } from "Core/DivineVoxelEngine.js";
import { BaseWorldData } from "Meta/Global/BaseWorldData.type.js";
import { PositionMatrix } from "Meta/Util.types.js";
import { ChunkMesh } from "../Render/Meshes/Chunk/ChunkMesh.js";

export class World {
 waitingForWolrdData = false;
 baseWorldData: BaseWorldData | null = null;

 runningBlockUpdate = false;
 worker: Worker;
 chunkBuilder: ChunkMesh = new ChunkMesh();
 scene: BABYLON.Scene;
 material: BABYLON.MultiMaterial;
 shadowGen: BABYLON.ShadowGenerator;
 chunkMeshes: Record<number, Record<number, BABYLON.Mesh>> = {};

 constructor(private DS: DivineVoxelEngine) {}

 requestWorldUpdate(
  type: "block-add" | "block-remove",
  position: PositionMatrix
 ) {
  this.DS.builderManager.runningBlockUpdate = true;
  this.worker.postMessage([type, position.x, position.y, position.z]);
  setTimeout(() => {
   if (this.DS.builderManager.runningBlockUpdate) {
    this.DS.builderManager.runningBlockUpdate = false;
   }
  }, 10);
 }

 setShadowGen(shadowGen: BABYLON.ShadowGenerator) {
  this.shadowGen = shadowGen;
 }

 getChunkMeshFacetData(chunkX: number, chunkZ: number, faceID: number) {
  if (!this.chunkMeshes[chunkX]) return false;
  if (this.chunkMeshes[chunkX][chunkZ]) {
   return this.chunkMeshes[chunkX][chunkZ].getFacetLocalPositions()[faceID];
  } else {
   return false;
  }
 }

 getChunkMesh(chunkX: number, chunkZ: number) {
  if (!this.chunkMeshes[chunkX]) return false;
  if (this.chunkMeshes[chunkX][chunkZ]) {
   return this.chunkMeshes[chunkX][chunkZ];
  } else {
   return false;
  }
 }

 setScene(scene: BABYLON.Scene) {
  this.scene = scene;
 }

 setMaterial(material: BABYLON.MultiMaterial) {
  this.material = material;
 }

 getWorker() {
  return this.worker;
 }

 sendPlayerSharedArrays(arrays: SharedArrayBuffer[]) {
  this.worker.postMessage(["connect-player", arrays[0], arrays[1], arrays[2]]);
 }

 startWorldGen() {
  this.worker.postMessage("start");
 }

 handleMessage(event: MessageEvent, world: this) {
  const message = event.data[0];

  if (message == "remove-chunk") {
   const chunkX = event.data[1];
   const chunkZ = event.data[2];
   this.DS.builderManager.requestChunkBeRemoved(chunkX, chunkZ);
  }
  if (message == "set-world-data") {
   this.baseWorldData = event.data[1];
   this.waitingForWolrdData = false;
  }
 }

 getBaseWorldData(): Promise<BaseWorldData> {
  this.waitingForWolrdData = true;
  this.baseWorldData = null;
  this.worker.postMessage(["get-world-data"]);
  const world = this;
  const prom: Promise<BaseWorldData> = new Promise((resolve, reject) => {
   let checkTimeout: any = null;
   const check = () => {
    if (world.waitingForWolrdData) {
     checkTimeout = setTimeout(() => {
      check();
     }, 1);
    } else {
     resolve(<BaseWorldData>world.baseWorldData);
     clearTimeout(rejectTimeout);
     clearTimeout(checkTimeout);
    }
   };
   check();

   const rejectTimeout = setTimeout(() => {
    clearTimeout(checkTimeout);
    reject("Timed out");
   }, 60000);
  });
  return prom;
 }

 createWorldWorker(workerPath: string) {
  //../Contexts/World/World.worker.js
  const world = this;

  this.worker = new Worker(new URL(workerPath, import.meta.url), {
   type: "module",
  });
  this.worker.onerror = (er: ErrorEvent) => {
   console.log(er);
  };
  this.worker.onmessage = (message: MessageEvent) => {
   this.handleMessage(message, world);
  };
 }
}
