import type { VoxelSubstanceType } from "Meta/Data/Voxels/Voxel.types";
import { DVER } from "../DivineVoxelEngineRender.js";
import {
 RemoveChunkMeshTasks,
 SetChunkMeshTask,
} from "Meta/Tasks/RenderTasks.types.js";
import { DVEMesh } from "Render/Render/Meshes/DVEMesh.js";
import { MeshRegister } from "./MeshRegister.js";
import { LocationData } from "Meta/Data/CommonTypes.js";

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

 meshMakers: <Record<VoxelSubstanceType, DVEMesh>>{},

 $INIT(scene: BABYLON.Scene) {
  this.scene = scene;
  scene.freeActiveMeshes();
  //@ts-ignore
  this.meshMakers = {
   solid: DVER.renderManager.solidMesh,
   transparent: DVER.renderManager.solidMesh,
   liquid: DVER.renderManager.liquidMesh,
   flora: DVER.renderManager.floraMesh,
   magma: DVER.renderManager.magmaMesh,
  };
 },

 removeChunk(data: RemoveChunkMeshTasks) {
  const dimension = data[0];
  const substance = data[1];
  const chunkX = data[2];
  const chunkY = data[3];
  const chunkZ = data[4];
  const mesh = MeshRegister.chunk.remove(
   dimension,
   chunkX,
   chunkY,
   chunkZ,
   substance
  );
  if (!mesh) return false;
  this.meshMakers[substance].removeMesh(mesh);
 },
 updateChunk(data: SetChunkMeshTask) {
  if (!this.scene) return;
  const dimension = data[0];
  const chunkX = data[1];
  const chunkY = data[2];
  const chunkZ = data[3];
  const chunks = data[4];
  for (const chunkData of chunks) {
   const substance = chunkData[0];
   const remove = !chunkData[1];
   if (remove) {
    const mesh = MeshRegister.chunk.remove(
     dimension,
     chunkX,
     chunkY,
     chunkZ,
     substance
    );
    if (mesh) {
     this.meshMakers[substance].removeMesh(mesh);
    }
    continue;
   }
   let chunk = MeshRegister.chunk.get(
    dimension,
    chunkX,
    chunkY,
    chunkZ,
    substance
   );
   let mesh: BABYLON.Mesh;
   if (!chunk) {
    mesh = this.meshMakers[substance].createTemplateMesh(this.scene);
    MeshRegister.chunk.add(dimension, chunkX, chunkY, chunkZ, mesh, substance);
    this.meshMakers[substance].setMeshData(
     mesh,
     chunkX,
     chunkY,
     chunkZ,
     chunkData
    );
   } else {
    mesh = chunk.mesh;
    this.meshMakers[substance].setMeshData(
     mesh,
     chunkX,
     chunkY,
     chunkZ,
     chunkData
    );
   }
  }
 },
 removeColumn(data: LocationData) {
  const dimension = data[0];
  const chunkX = data[1];
  const chunkY = data[2];
  const chunkZ = data[3];
  const column = MeshRegister.column.remove(dimension, chunkX, chunkZ, chunkY);
  if (!column) return false;
  for (const [key, chunk] of column.chunks) {
   for (const [substance, mesh] of chunk) {
    this.meshMakers[substance].removeMesh(mesh.mesh);
   }
  }
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
};
