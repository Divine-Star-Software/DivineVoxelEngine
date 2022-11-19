import type {
 MeshSetData,
 VoxelMeshInterface,
} from "Meta/Render/Meshes/VoxelMesh.interface";
import type { VoxelSubstanceType } from "Meta/Data/Voxels/Voxel.types";
import { DVER } from "../DivineVoxelEngineRender.js";
import { SetChunkMeshTask } from "Meta/Tasks/RenderTasks.types.js";

export const MeshManager = {
 scene: <BABYLON.Scene | null>null,
 runningUpdate: false,

 meshes: <
  Record<VoxelSubstanceType, Record<string, Record<string, BABYLON.Mesh>>>
 >{
  solid: {},
  transparent: {},
  flora: {},
  liquid: {},
  magma: {},
 },


 meshMakers: <Record<VoxelSubstanceType, VoxelMeshInterface>>{},

 $INIT() {
  //@ts-ignore
  this.meshMakers = {
   solid: DVER.renderManager.solidMesh,
   transparent: DVER.renderManager.solidMesh,
   liquid: DVER.renderManager.liquidMesh,
   flora: DVER.renderManager.floraMesh,
   magma: DVER.renderManager.magmaMesh,
  };
 },

 setScene(scene: BABYLON.Scene) {
  this.scene = scene;
 },

 reStart() {},

 removeChunkMesh(
  dimesnion: string,
  type: VoxelSubstanceType,
  chunkKey: string
 ) {
  if (!this.meshes[type][dimesnion]) return;
  const mesh = this.meshes[type][dimesnion][chunkKey];
  if (!mesh) {
   return;
  }
  mesh.dispose();
  delete this.meshes[type][dimesnion][chunkKey];
 },

 handleItemUpdate(x: number, y: number, z: number, data: any) {
/*   const meshData: ItemMeshSetData = {
   positionArray: new Float32Array(data[ConstructItemIndexes.positionArray]),
   normalsArray: new Float32Array(data[ConstructItemIndexes.normalsArray]),
   indiciesArray: new Int32Array(data[ConstructItemIndexes.indiciesArray]),
   RGBLightColorsArray: new Float32Array(
    data[ConstructItemIndexes.RGBLightColorsArray]
   ),
   sunLightColorsArray: new Float32Array(
    data[ConstructItemIndexes.sunLightColorsArray]
   ),
   uvArray: new Float32Array(data[ConstructItemIndexes.uvArray]),
   extra: [],
  };

  RenderManager.itemMesh.createTemplateMesh(x, y, z, meshData); */
 },

 handleEntityUpdate(x: number, y: number, z: number, data: any) {
/*   const meshData: MeshSetData = {
   positionArray: new Float32Array(data[ConstructEntityIndexes.positionArray]),
   normalsArray: new Float32Array(data[ConstructEntityIndexes.normalsArray]),
   indiciesArray: new Int32Array(data[ConstructEntityIndexes.indiciesArray]),
   faceDataArray: new Float32Array(data[ConstructEntityIndexes.faceDataArray]),
   AOColorsArray: new Float32Array(data[ConstructEntityIndexes.AOColorsArray]),
   RGBLightColorsArray: new Float32Array(
    data[ConstructEntityIndexes.RGBLightColorsArray]
   ),
   sunLightColorsArray: new Float32Array(
    data[ConstructEntityIndexes.sunLightColorsArray]
   ),
   colorsArray: new Float32Array(data[ConstructEntityIndexes.colorsArray]),
   uvArray: new Float32Array(data[ConstructEntityIndexes.uvArray]),
   overlayUVArray: new Float32Array(
    data[ConstructEntityIndexes.overlayUVArray]
   ),
   extra: [],
  };
  this.entityMesh.createMesh(x, y, z, meshData); */
 },

 handleChunkUpdate(
  dimesnion: string,
  type: VoxelSubstanceType,
  chunkKey: string,
  data: SetChunkMeshTask
 ) {
  const meshData: MeshSetData = {
   positionArray: data[5],
   normalsArray: data[6],
   indiciesArray: data[7],
   faceDataArray: data[8],
   AOColorsArray: data[9],
   lightColorsArray: data[10],
   colorsArray: data[11],
   uvArray: data[12],
   overlayUVArray: data[13],
   extra: [],
  };
  if (!this.meshes[type][dimesnion]) {
   this.meshes[type][dimesnion] = {};
  }
  if (!this.meshes[type][dimesnion][chunkKey]) {
   this._buildNewMesh(dimesnion, type, chunkKey, meshData);
  } else {
   this._updateMesh(dimesnion, type, chunkKey, meshData);
  }
 },

 requestChunkBeRemoved(dimesnion: string, chunkKey: string) {
  for (const substance of Object.keys(this.meshes)) {
   if (this.meshes[substance as VoxelSubstanceType][dimesnion][chunkKey]) {
    this.meshes[substance as VoxelSubstanceType][dimesnion][chunkKey].dispose();
    delete this.meshes[substance as VoxelSubstanceType][dimesnion][chunkKey];
   }
  }
 },

 async _updateMesh(
  dimesnion: string,
  type: VoxelSubstanceType,
  chunkKey: string,
  data: any
 ) {
  if (!this.scene) return;
  const mesh = this.meshes[type][dimesnion][chunkKey];
  this.scene.unfreezeActiveMeshes();
  this.meshMakers[type].createMeshGeometory(mesh, data);
  this.scene.freeActiveMeshes();
 },

 async _buildNewMesh(
  dimesnion: string,
  type: VoxelSubstanceType,
  chunkKey: string,
  data: any
 ) {
  if (!this.scene) return;
  this.scene.unfreezeActiveMeshes();
  const mesh = this.meshMakers[type].createTemplateMesh(this.scene);
  mesh.setEnabled(true);
  this.meshMakers[type].createMeshGeometory(mesh, data);
  this.meshes[type][dimesnion][chunkKey] = mesh;
  this.scene.freeActiveMeshes();
 },
};
