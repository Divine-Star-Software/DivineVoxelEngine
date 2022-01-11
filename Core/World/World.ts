import type { DivineVoxelEngine } from "Core/DivineVoxelEngine.js";
import { PositionMatrix } from "Meta/Util.types.js";
import { ChunkBuilder } from "../Builders/ChunkBuilder.js";

export class World {
  runningBlockUpdate = false;
  worldGen: Worker;
  chunkBuilder: ChunkBuilder = new ChunkBuilder();
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
    this.worldGen.postMessage([type, position.x, position.y, position.z]);
    setTimeout(() => {
      if (this.DS.builderManager.runningBlockUpdate) {
        this.DS.builderManager.runningBlockUpdate = false;
    }
    },10);
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
    return this.worldGen;
  }

  sendPlayerSharedArrays(arrays: SharedArrayBuffer[]) {
    this.worldGen.postMessage([
      "connect-player",
      arrays[0],
      arrays[1],
      arrays[2],
    ]);
  }

  startWorldGen() {
    this.worldGen.postMessage("start");
  }

  createWorldWorker(workerPath : string) {
    //../Contexts/World/World.worker.js
    this.worldGen = new Worker(
      new URL(workerPath, import.meta.url),
      {
        type: "module",
      }
    );
    this.worldGen.onerror = (er: ErrorEvent) => {
      console.log(er);
    };
    this.worldGen.onmessage = (event: MessageEvent) => {
      const message = event.data[0];
      const chunkX = event.data[1];
      const chunkZ = event.data[2];
      if (message == "remove-chunk") {
        this.DS.builderManager.requestChunkBeRemoved(chunkX, chunkZ);
      }
    };
  }
}
