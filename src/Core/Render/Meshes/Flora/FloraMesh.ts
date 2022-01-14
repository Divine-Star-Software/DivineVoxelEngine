import type { FloraMaterial } from "Core/Render/Materials/Flora/FloraMaterial";
import { VoxelMeshInterface } from "Meta/Core/Meshes/VoxelMesh.interface";

export class FloraMesh implements VoxelMeshInterface {
 constructor(private material: FloraMaterial) {}

 rebuildMeshGeometory(
  chunkMesh: BABYLON.Mesh,
  chunkX: number,
  chunkZ: number,
  positions: Float32Array,
  indicies: Int32Array,
  linearcColors: Float32Array,
  fullColors: Float32Array,
  uvs: Float32Array
 ) {
  const chunkVertexData = new BABYLON.VertexData();
  const calculatedNormals: number[] = [];

  chunkVertexData.positions = positions;
  chunkVertexData.indices = indicies;
  chunkVertexData.normals = calculatedNormals;

  BABYLON.VertexData.ComputeNormals(positions, indicies, calculatedNormals);
  chunkVertexData.applyToMesh(chunkMesh, true);

  chunkMesh.setVerticesData("myuvs", uvs, false, 3);
  chunkMesh.setVerticesData("colors", linearcColors, false, 4);

  chunkMesh.unfreezeWorldMatrix();
  chunkMesh.position.x = chunkX;
  chunkMesh.position.z = chunkZ;
  chunkMesh.freezeWorldMatrix();
  //Babylon throws an error but this functions works
  //So wrapped it in this for now. It works though
  try {
   chunkMesh.updateFacetData();
  } catch (error: any) {}
 }

 createTemplateMesh(scene: BABYLON.Scene) {
  const mesh = new BABYLON.Mesh("flora", scene);
  mesh.alphaIndex = 1;
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
  chunkVertexData.normals = calculatedNormals;

  chunkVertexData.applyToMesh(mesh, true);

  mesh.setVerticesData("myuvs", uvs, false, 3);
  mesh.setVerticesData("colors", linearColors, false, 4);

  mesh.material = this.material.getMaterial();

  mesh.position.x = chunkX;
  mesh.position.z = chunkZ;
  mesh.freezeWorldMatrix();

  return mesh;
 }
}
