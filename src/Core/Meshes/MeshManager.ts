import type { DivineVoxelEngine } from "Core/DivineVoxelEngine";
import { VoxelMeshInterface } from "Meta/Core/Meshes/VoxelMesh.interface";
import { VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types";

export class MeshManager {
 scene: BABYLON.Scene;
 runningUpdate = false;

 meshes: Record<VoxelSubstanceType, Record<string, BABYLON.Mesh>> = {
  solid: {},
  transparent: {},
  flora: {},
  fluid: {},
  magma: {},
 };

 meshMakers: Record<VoxelSubstanceType, VoxelMeshInterface>;

 constructor(private DVE: DivineVoxelEngine) {
  //@ts-ignore
  this.meshMakers = {
   solid: this.DVE.renderManager.solidMesh,
   transparent: this.DVE.renderManager.solidMesh,
   flora: this.DVE.renderManager.floraMesh,
   magma: this.DVE.renderManager.magmaMesh,
  };
 }

 handleUpdate(
  type: VoxelSubstanceType,
  chunkKey: string,
  chunkX: number,
  chunkZ: number,
  data: any
 ) {
  if (type != "fluid") {
   if (!this.meshes[type][chunkKey]) {
    this._buildNewMesh(type, chunkKey, chunkX, chunkZ, data);
   } else {
    this._updateMesh(type, chunkKey, chunkX, chunkZ, data);
   }
  } else {
    this._updateFluidMesh(data);
  }

 }

  _updateFluidMesh(data: any) {
    console.log(data);
  const positions = new Float32Array(data[3]);
  const indicies = new Int32Array(data[4]);
  const linearColors = new Float32Array(data[5]);
  const fullColors = new Float32Array(data[6]);
  const uvs = new Float32Array(data[7]);
  if (this.DVE.renderManager.fluidMesh.beenCreated) {
   this.DVE.renderManager.fluidMesh.rebuildMeshGeometory(
    positions,
    indicies,
    linearColors,
    fullColors,
    uvs
   );
  } else {
   this.DVE.renderManager.fluidMesh.createTemplateMesh(this.scene);
   this.DVE.renderManager.fluidMesh.createMeshGeometory(
    positions,
    indicies,
    linearColors,
    fullColors,
    uvs
   );
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

  this.meshMakers[type].rebuildMeshGeometory(
   mesh,
   chunkX,
   chunkZ,
   positions,
   indicies,
   linearColors,
   fullColors,
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
  const mesh = this.meshMakers[type].createTemplateMesh(this.scene);
  mesh.setEnabled(true);

  const positions = new Float32Array(data[3]);
  const indicies = new Int32Array(data[4]);
  const linearColors = new Float32Array(data[5]);
  const fullColors = new Float32Array(data[6]);
  const uvs = new Float32Array(data[7]);

  this.meshMakers[type].createMeshGeometory(
   mesh,
   chunkX,
   chunkZ,
   positions,
   indicies,
   linearColors,
   fullColors,
   uvs
  );
  //chunkMesh.updateFacetData();
  this.meshes[type][chunkKey] = mesh;
 }
}
