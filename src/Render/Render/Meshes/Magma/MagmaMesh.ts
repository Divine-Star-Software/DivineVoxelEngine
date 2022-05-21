import type { VoxelMeshInterface } from "Meta/Render/Meshes/VoxelMesh.interface";
import { MagmaMaterial } from "../../Materials/Magma/MagmaMaterial.js";

export const MagmaMesh: VoxelMeshInterface = {
 rebuildMeshGeometory(
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
  const calculatedNormals: number[] = [];

  chunkVertexData.positions = positions;
  chunkVertexData.indices = indicies;
  chunkVertexData.normals = calculatedNormals;

  BABYLON.VertexData.ComputeNormals(positions, indicies, calculatedNormals);
  chunkVertexData.applyToMesh(mesh, true);

  mesh.setVerticesData("cuv3", uvs, false, 3);
  mesh.setVerticesData("colors", aoColors, false, 4);

  mesh.freezeWorldMatrix();
 },

 createTemplateMesh(scene: BABYLON.Scene) {
  const mesh = new BABYLON.Mesh("magma", scene);
  mesh.alphaIndex = 0;
  mesh.isPickable = false;
  mesh.checkCollisions = false;
  mesh.doNotSyncBoundingInfo = true;
  mesh.doNotSerialize = true;
  return mesh;
 },

 createMeshGeometory(
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
  const calculatedNormals: number[] = [];
  BABYLON.VertexData.ComputeNormals(positions, indicies, calculatedNormals);
  chunkVertexData.positions = positions;
  chunkVertexData.indices = indicies;

  chunkVertexData.applyToMesh(mesh, true);

  mesh.setVerticesData("cuv3", uvs, false, 3);
  mesh.setVerticesData("colors", aoColors, false, 4);

  mesh.material = MagmaMaterial.getMaterial();

  mesh.freezeWorldMatrix();

  return mesh;
 },
};
