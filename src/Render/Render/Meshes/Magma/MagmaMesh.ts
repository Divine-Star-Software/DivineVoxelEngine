import type { VoxelMeshInterface } from "Meta/Render/Meshes/VoxelMesh.interface";
import { MagmaMaterial } from "../../Materials/Magma/MagmaMaterial.js";

export const MagmaMesh: VoxelMeshInterface = {

 async rebuildMeshGeometory(mesh, data) {
  mesh.unfreezeWorldMatrix();
  const chunkVertexData = new BABYLON.VertexData();
  chunkVertexData.positions = data.positionArray;
  chunkVertexData.indices = data.indiciesArray;
  chunkVertexData.normals = data.normalsArray;
  chunkVertexData.applyToMesh(mesh, true);
  mesh.setVerticesData("cuv3", data.uvArray, false, 3);
  mesh.setVerticesData("rgbLightColors", data.RGBLightColorsArray, false, 4);
  mesh.setVerticesData("sunLightColors", data.sunLightColorsArray, false, 4);
  mesh.setVerticesData("colors", data.colorsArray, false, 4);
  mesh.freezeWorldMatrix();
  return mesh;
 },

 createTemplateMesh(scene: BABYLON.Scene) {
  const mesh = new BABYLON.Mesh("fluid", scene);
  mesh.alphaIndex = 0;
  mesh.isPickable = false;
  mesh.checkCollisions = false;
  mesh.doNotSyncBoundingInfo = true;
  mesh.doNotSerialize = true;
  return mesh;
 },

 async createMeshGeometory(mesh, data) {
  mesh.unfreezeWorldMatrix();
  const chunkVertexData = new BABYLON.VertexData();
  chunkVertexData.positions = data.positionArray;
  chunkVertexData.indices = data.indiciesArray;
  chunkVertexData.normals = data.normalsArray;
  chunkVertexData.applyToMesh(mesh, true);
  mesh.setVerticesData("cuv3", data.uvArray, false, 3);
  mesh.setVerticesData("rgbLightColors", data.RGBLightColorsArray, false, 4);
  mesh.setVerticesData("sunLightColors", data.sunLightColorsArray, false, 4);
  mesh.setVerticesData("colors", data.colorsArray, false, 4);
  mesh.freezeWorldMatrix();
  return mesh;
 },
};
