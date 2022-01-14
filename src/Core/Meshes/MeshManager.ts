import type { DivineVoxelEngine } from "Core/DivineVoxelEngine";
import { VoxelMeshInterface } from "Meta/Core/Meshes/VoxelMesh.interface";
import { VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types";

export class MeshManager {
 scene: BABYLON.Scene;
 runningUpdate = false;

 constructor(private DVE: DivineVoxelEngine) {
  this.meshMakes = {
   solid: this.DVE.renderManager.chunkMesh,
   transparent: this.DVE.renderManager.chunkMesh,
   flora: this.DVE.renderManager.floraMesh,
   fluid: this.DVE.renderManager.fluidMesh,
   magma: this.DVE.renderManager.floraMesh,
  };
 }

 chunkMeshes: Record<string, BABYLON.Mesh> = {};

 meshes: Record<VoxelSubstanceType, Record<string, BABYLON.Mesh>> = {
  solid: {},
  transparent: {},
  flora: {},
  fluid: {},
  magma: {},
 };

 meshMakes: Record<VoxelSubstanceType, VoxelMeshInterface>;

 handleUpdate(
  type: VoxelSubstanceType,
  chunkKey: string,
  chunkX: number,
  chunkZ: number,
  data: any
 ) {
  if (!this.meshes[type][chunkKey]) {
   this._buildNewMesh(type, chunkKey, chunkX, chunkZ, data);
  } else {
   this._updateMesh(type, chunkKey, chunkX, chunkZ, data);
  }
 }

 requestChunkBeRemoved(chunkKey: string) {
  for (const substance of Object.keys(this.meshes)) {
   if (this.meshes[substance as VoxelSubstanceType][chunkKey]) {
    this.meshes[substance as VoxelSubstanceType][chunkKey].dispose();
    delete this.meshes[substance as VoxelSubstanceType][chunkKey];
   }
  }
 }

 async _updateMesh(
  type: VoxelSubstanceType,
  chunkKey: string,
  chunkX: number,
  chunkZ: number,
  data: any
 ) {
  this.runningUpdate = true;
  const mesh = this.meshes[type][chunkKey];
  const positions = new Float32Array(data[3]);
  const indicies = new Int32Array(data[4]);
  const linearColors = new Float32Array(data[5]);
  const fullColors = new Float32Array(data[6]);
  const uvs = new Float32Array(data[7]);

  this.meshMakes[type].rebuildMeshGeometory(
   mesh,
   chunkX,
   chunkZ,
   positions,
   indicies,
   linearColors,
   linearColors,
   uvs
  );

  this.runningUpdate = false;
 }

 async _buildNewMesh(
  type: VoxelSubstanceType,
  chunkKey: string,
  chunkX: number,
  chunkZ: number,
  data: any
 ) {
  const mesh = this.meshMakes[type].createTemplateMesh(this.scene);
  mesh.setEnabled(true);

  const positions = new Float32Array(data[3]);
  const indicies = new Int32Array(data[4]);
  const linearColors = new Float32Array(data[5]);
  const fullColors = new Float32Array(data[6]);
  const uvs = new Float32Array(data[7]);

  this.meshMakes[type].createMeshGeometory(
   mesh,
   chunkX,
   chunkZ,
   positions,
   indicies,
   linearColors,
   linearColors,
   uvs
  );
  //chunkMesh.updateFacetData();
  this.meshes[type][chunkKey] = mesh;
 }
}
