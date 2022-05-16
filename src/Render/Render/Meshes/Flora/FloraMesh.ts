import { VoxelMeshInterface } from "Meta/Render/Meshes/VoxelMesh.interface";
import { FloraMaterial } from "../../Materials/Flora/FloraMaterial.js";

export const FloraMesh: VoxelMeshInterface = {
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
  mesh.setVerticesData("colors", aoColors, false, 4);
  mesh.freezeWorldMatrix();
 },

 createTemplateMesh(scene: BABYLON.Scene) {
  const mesh = new BABYLON.Mesh("flora", scene);
  mesh.alphaIndex = 1;
  mesh.isPickable = false;
  mesh.checkCollisions = false;
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

  chunkVertexData.applyToMesh(mesh, true);

  mesh.setVerticesData("cuv3", uvs, false, 3);
  mesh.setVerticesData("colors", aoColors, false, 4);

  mesh.material = FloraMaterial.getMaterial();
  mesh.freezeWorldMatrix();

  return mesh;
 },
};
