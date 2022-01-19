import type { MagmaMaterial } from "Core/Render/Materials/Magma/MagmaMaterial";
import type { VoxelMeshInterface } from "Meta/Core/Meshes/VoxelMesh.interface";

export class MagmaMesh implements VoxelMeshInterface {
 constructor(private material: MagmaMaterial) {}
 rebuildMeshGeometory(
  mesh: BABYLON.Mesh,
  chunkX: number,
  chunkZ: number,
  positions: Float32Array,
  indicies: Int32Array,
  linearcColors: Float32Array,
  fullColors: Float32Array,
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
  mesh.setVerticesData("colors", linearcColors, false, 4);

  mesh.freezeWorldMatrix();
 }

 createTemplateMesh(scene: BABYLON.Scene) {
  const mesh = new BABYLON.Mesh("magma", scene);
  mesh.alphaIndex = 0;
  mesh.checkCollisions = false;
  return mesh;
 }

 createMeshGeometory(
  mesh: BABYLON.Mesh,
  chunkX: number,
  chunkZ: number,
  positions: Float32Array,
  indicies: Int32Array,
  linearColors: Float32Array,
  fullColors: Float32Array,
  uvs: Float32Array
 ) {
  const chunkVertexData = new BABYLON.VertexData();
  const calculatedNormals: number[] = [];
  BABYLON.VertexData.ComputeNormals(positions, indicies, calculatedNormals);
  chunkVertexData.positions = positions;
  chunkVertexData.indices = indicies;


  chunkVertexData.applyToMesh(mesh, true);

  mesh.setVerticesData("cuv3", uvs, false, 3);
  mesh.setVerticesData("colors", linearColors, false, 4);

  mesh.material = this.material.getMaterial();


  mesh.freezeWorldMatrix();

  return mesh;
 }
}