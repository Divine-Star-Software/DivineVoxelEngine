import {
 ConstructEntityIndexes,
 ConstructItemIndexes,
 SetChunkDataIndexes,
} from "../../Constants/InterComms/ConstructorToRender.js";
import type {
 MeshSetData,
 VoxelMeshInterface,
} from "Meta/Render/Meshes/VoxelMesh.interface";
import type { VoxelSubstanceType } from "Meta/Voxels/Voxel.types";
import { DVER } from "../DivineVoxelEngineRender.js";
import { EntityMesh } from "../Render/Meshes/Entity/EntityMesh.js";
import { ItemMesh } from "../Render/Meshes/Item/ItemMesh.js";
import { ItemMeshSetData } from "Meta/Render/Meshes/ItemMesh.types.js";

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

 entityMesh: EntityMesh,
 itemMesh: ItemMesh,
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

 removeChunkMesh(type: VoxelSubstanceType, chunkKey: string) {
  const mesh = this.meshes[type][chunkKey];
  if (!mesh) {
   return;
  }
  mesh.dispose();
  delete this.meshes[type][chunkKey];
 },

 handleItemUpdate(x: number, y: number, z: number, data: any) {
  const meshData: ItemMeshSetData = {
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

  this.itemMesh.createMesh(x, y, z, meshData);
 },

 handleEntityUpdate(x: number, y: number, z: number, data: any) {
  const meshData: MeshSetData = {
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
  this.entityMesh.createMesh(x, y, z, meshData);
 },

 handleChunkUpdate(type: VoxelSubstanceType, chunkKey: string, data: any) {
  const meshData: MeshSetData = {
   positionArray: new Float32Array(data[SetChunkDataIndexes.positionArray]),
   normalsArray: new Float32Array(data[SetChunkDataIndexes.normalsArray]),
   indiciesArray: new Int32Array(data[SetChunkDataIndexes.indiciesArray]),
   faceDataArray: new Float32Array(data[SetChunkDataIndexes.faceDataArray]),
   AOColorsArray: new Float32Array(data[SetChunkDataIndexes.AOColorsArray]),
   RGBLightColorsArray: new Float32Array(
    data[SetChunkDataIndexes.RGBLightColorsArray]
   ),
   sunLightColorsArray: new Float32Array(
    data[SetChunkDataIndexes.sunLightColorsArray]
   ),
   colorsArray: new Float32Array(data[SetChunkDataIndexes.colorsArray]),
   uvArray: new Float32Array(data[SetChunkDataIndexes.uvArray]),
   overlayUVArray: new Float32Array(data[SetChunkDataIndexes.overlayUVArray]),
   extra: [],
  };

  if (!this.meshes[type][chunkKey]) {
   this._buildNewMesh(type, chunkKey, meshData);
  } else {
   this._updateMesh(type, chunkKey, meshData);
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
  const mesh = this.meshes[type][chunkKey];
  this.scene.unfreezeActiveMeshes();
  this.meshMakers[type].createMeshGeometory(mesh, data);
  this.scene.freeActiveMeshes();
 },

 async _buildNewMesh(type: VoxelSubstanceType, chunkKey: string, data: any) {
  if (!this.scene) return;
  this.scene.unfreezeActiveMeshes();
  const mesh = this.meshMakers[type].createTemplateMesh(this.scene);
  mesh.setEnabled(true);
  this.meshMakers[type].createMeshGeometory(mesh, data);
  this.meshes[type][chunkKey] = mesh;
  this.scene.freeActiveMeshes();
 },
};
