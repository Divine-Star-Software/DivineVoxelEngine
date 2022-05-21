import type { VoxelMeshInterface } from "Meta/Render/Meshes/VoxelMesh.interface";
import { SolidMaterial } from "../../Materials/Solid/SolidMaterial.js";

export const SolidMesh : VoxelMeshInterface  = {
 async rebuildMeshGeometory(
  mesh: BABYLON.Mesh,
  positions: Float32Array,
  indicies: Int32Array,
  aoColors: Float32Array,
  rgbLightColors: Float32Array,
  sunLightColors: Float32Array,
  colors: Float32Array,
  uvs: Float32Array
 ) {
  mesh.unfreezeWorldMatrix();
  const chunkVertexData = new BABYLON.VertexData();

  chunkVertexData.positions = positions;
  chunkVertexData.indices = indicies;
  chunkVertexData.applyToMesh(mesh, true);

  mesh.setVerticesData("cuv3", uvs, false, 3);
  mesh.setVerticesData("aoColors", aoColors, false, 4);
  mesh.setVerticesData("rgbLightColors", rgbLightColors, false, 4);
  mesh.setVerticesData("sunLightColors", sunLightColors, false, 4);
  mesh.setVerticesData("colors", colors, false, 4);
  mesh.freezeWorldMatrix();
 },

 createTemplateMesh(scene: BABYLON.Scene) {
  const mesh = new BABYLON.Mesh("solid", scene);
  mesh.alphaIndex = 0;
  mesh.isPickable = false;
  mesh.checkCollisions = true;
  mesh.doNotSerialize = true;

  return mesh;
 },

 async createMeshGeometory(
  mesh: BABYLON.Mesh,
  positions: Float32Array,
  indicies: Int32Array,
  aoColors: Float32Array,
  rgbLightColors: Float32Array,
  sunLightColors: Float32Array,
  colors: Float32Array,
  uvs: Float32Array
 ) {
  const chunkVertexData = new BABYLON.VertexData();

  chunkVertexData.positions = positions;
  chunkVertexData.indices = indicies;
  // chunkVertexData.colors = linearColors;
  chunkVertexData.applyToMesh(mesh, true);

  mesh.setVerticesData("cuv3", uvs, false, 3);
  mesh.setVerticesData("aoColors", aoColors, false, 4);
  mesh.setVerticesData("rgbLightColors", rgbLightColors, false, 4);
  mesh.setVerticesData("sunLightColors", sunLightColors, false, 4);
  mesh.setVerticesData("colors", colors, false, 4);

  mesh.material = SolidMaterial.material;
  mesh.freezeWorldMatrix();
  return mesh;
 }
}
