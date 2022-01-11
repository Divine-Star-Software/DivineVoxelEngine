import type { DivineVoxelEngine } from "../DivineVoxelEngine";
import { ChunkBuilder } from "./ChunkBuilder.js";

export class BuilderManager {
 numBuilders = 4;
 count = 0;
 runningBlockUpdate = false;

 maxChunkMeshes = 450;
 aviableMeshes: BABYLON.Mesh[] = [];

 builders: Worker[] = [];
 chunkBuilder: ChunkBuilder = new ChunkBuilder();
 scene: BABYLON.Scene;
 material: BABYLON.ShaderMaterial;
 shadowGen: BABYLON.ShadowGenerator;
 chunkMeshes: Record<number, Record<number, BABYLON.Mesh>> = {};

 constructor(private DS: DivineVoxelEngine) {
  /*     const numBuilders = 4;

    if(window.navigator.hardwareConcurrency > numBuilders) {
      //use all possible cores if we can
      this.numBuilders = window.navigator.hardwareConcurrency * 2
      ;
    }]
     */
 }

 _returnChunkMesh(mesh: BABYLON.Mesh) {
  mesh.setEnabled(false);
  //  mesh.dispose();
  this.aviableMeshes.push(mesh);
 }

 _getChunkMesh() {
  return <BABYLON.Mesh>this.aviableMeshes.pop();
 }

 createBaseChunkMeshes() {
  for (let i = 0; i < this.maxChunkMeshes; i++) {
   const mesh = new BABYLON.Mesh(`solid`);
   mesh.setEnabled(false);
   //   mesh.hasVertexAlpha = true;
   this.aviableMeshes.push(mesh);
   //   this.shadowGen.getShadowMap()?.renderList?.push(mesh);
   //    this.shadowGen.addShadowCaster(mesh);
   //   mesh.receiveShadows = true;
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
    this._handleChunkBuildMessage(event);
   };

   const channel = new MessageChannel();
   const worldWorker = this.DS.world.getWorker();
   const builderWorker = this.builders[i];

   // Setup the connection: Port 1 is for worker 1
   worldWorker.postMessage(["connect-builder"], [channel.port1]);

   // Setup the connection: Port 2 is for worker 2
   builderWorker.postMessage(["connect-world"], [channel.port2]);
  }
 }

 setScene(scene: BABYLON.Scene) {
  this.scene = scene;
 }

 setShadowGen(shadowGenerator: BABYLON.ShadowGenerator) {
  this.shadowGen = shadowGenerator;
 }

 setMaterial(material: BABYLON.ShaderMaterial) {
  this.material = material;
 }

 async requestChunkBeRemoved(chunkX: number, chunkZ: number) {
  if (!this.chunkMeshes[chunkX]) return;
  if (!this.chunkMeshes[chunkX][chunkZ]) return;
  const chunkMesh = this.chunkMeshes[chunkX][chunkZ];
  delete this.chunkMeshes[chunkX][chunkZ];
  this._returnChunkMesh(chunkMesh);
 }

 async updateChunkUVs(chunkX: number, chunkZ: number, uvs: Float32Array) {
  if (this.runningBlockUpdate) return;
  if (!this.chunkMeshes[chunkX]) return;
  if (!this.chunkMeshes[chunkX][chunkZ]) return;
  if (uvs.length == 0) return;
  const chunkMesh = this.chunkMeshes[chunkX][chunkZ];

  if (chunkMesh) {
   setTimeout(() => {
    chunkMesh.updateVerticesData(BABYLON.VertexBuffer.UVKind, uvs);
   }, 0);
  }
 }

 async _handleChunkBuildMessage(event: MessageEvent) {
  const chunkX = event.data[0];
  const chunkZ = event.data[1];

  if (!this.chunkMeshes[chunkX]) {
   this._buildNewChunk(chunkX, chunkZ, event.data);
  } else {
   if (!this.chunkMeshes[chunkX][chunkZ]) {
    this._buildNewChunk(chunkX, chunkZ, event.data);
   } else {
    this._updateChunk(chunkX, chunkZ, event.data);
   }
  }
 }

 async _updateChunk(chunkX: number, chunkZ: number, data: any) {
  this.runningBlockUpdate = true;

  const chunk = this.chunkMeshes[chunkX][chunkZ];

  const positions = new Float32Array(data[2]);
  const indicies = new Int32Array(data[3]);
  const colors = new Float32Array(data[4]);
  const uvs = new Float32Array(data[5]);

  const newChunk = this.chunkBuilder.rebuildChunkMesh(
   chunk,
   chunkX,
   chunkZ,
   positions,
   indicies,
   colors,
   uvs
  );

  this.runningBlockUpdate = false;
 }

 async _buildNewChunk(chunkX: number, chunkZ: number, data: any) {
  const chunkMesh = this._getChunkMesh();
  chunkMesh.setEnabled(true);

  const positions = new Float32Array(data[2]);
  const indicies = new Int32Array(data[3]);
  const colors = new Float32Array(data[4]);
  const uvs = new Float32Array(data[5]);
  const newChunk = this.chunkBuilder.makeChunkMesh(
   chunkMesh,
   chunkX,
   chunkZ,
   this.material,
   positions,
   indicies,
   colors,
   uvs
  );
  //chunkMesh.updateFacetData();
  this.chunkMeshes[chunkX] ??= [];
  this.chunkMeshes[chunkX][chunkZ] = newChunk;
 }
}
