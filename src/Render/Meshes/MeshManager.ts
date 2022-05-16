import type { VoxelMeshInterface } from "Meta/Render/Meshes/VoxelMesh.interface";
import type { VoxelSubstanceType } from "Meta/Voxels/Voxel.types";
import { DVER } from "../DivineVoxelEngineRender.js";

export const MeshManager = {
 scene: <BABYLON.Scene | null>null,
 runningUpdate: false,

 meshes: <Record<VoxelSubstanceType, Record<string, BABYLON.Mesh>>>{
  solid: {},
  transparent: {},
  flora: {},
  fluid: {},
  magma: {},
 },

 meshMakers: <Record<VoxelSubstanceType, VoxelMeshInterface>>{},

 $INIT() {
  //@ts-ignore
  this.meshMakers = {
   solid: DVER.renderManager.solidMesh,
   transparent: DVER.renderManager.solidMesh,
   fluid: DVER.renderManager.fluidMesh,
   flora: DVER.renderManager.floraMesh,
   magma: DVER.renderManager.magmaMesh,
  };
 },

 setScene(scene: BABYLON.Scene) {
  this.scene = scene;
 },

 reStart() {},

 handleUpdate(type: VoxelSubstanceType, chunkKey: string, data: any) {
  if (!this.meshes[type][chunkKey]) {
   this._buildNewMesh(type, chunkKey, data);
  } else {
   this._updateMesh(type, chunkKey, data);
  }
 },

 requestChunkBeRemoved(chunkKey: string) {
  for (const substance of Object.keys(this.meshes)) {
   if (this.meshes[substance as VoxelSubstanceType][chunkKey]) {
    this.meshes[substance as VoxelSubstanceType][chunkKey].dispose();
    delete this.meshes[substance as VoxelSubstanceType][chunkKey];
   }
  }
 },

 async _updateMesh(type: VoxelSubstanceType, chunkKey: string, data: any) {
  if (!this.scene) return;
  this.scene.unfreezeActiveMeshes();
  this.runningUpdate = true;
  const mesh = this.meshes[type][chunkKey];
  const positions = new Float32Array(data[4]);
  const indicies = new Int32Array(data[5]);
  const aoColors = new Float32Array(data[6]);
  const rgbLightColors = new Float32Array(data[7]);
  const sunLightColors = new Float32Array(data[8]);
  const colors = new Float32Array(data[9]);
  const uvs = new Float32Array(data[10]);

  this.meshMakers[type].rebuildMeshGeometory(
   mesh,
   positions,
   indicies,
   aoColors,
   rgbLightColors,
   sunLightColors,
   colors,
   uvs
  );

  this.runningUpdate = false;
  this.scene.freeActiveMeshes();
 },

 async _buildNewMesh(type: VoxelSubstanceType, chunkKey: string, data: any) {
  if (!this.scene) return;
  this.scene.unfreezeActiveMeshes();
  const mesh = this.meshMakers[type].createTemplateMesh(this.scene);
  mesh.setEnabled(true);

  const positions = new Float32Array(data[4]);
  const indicies = new Int32Array(data[5]);
  const aoColors = new Float32Array(data[6]);
  const rgbLightColors = new Float32Array(data[7]);
  const sunLightColors = new Float32Array(data[8]);
  const colors = new Float32Array(data[9]);
  const uvs = new Float32Array(data[10]);

  this.meshMakers[type].createMeshGeometory(
   mesh,
   positions,
   indicies,
   aoColors,
   rgbLightColors,
   sunLightColors,
   colors,
   uvs
  );
  //chunkMesh.updateFacetData();
  this.meshes[type][chunkKey] = mesh;
  this.scene.freeActiveMeshes();
 },
};
