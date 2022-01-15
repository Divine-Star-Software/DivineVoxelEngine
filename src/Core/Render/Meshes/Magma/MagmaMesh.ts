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
  const chunkVertexData = new BABYLON.VertexData();
  const calculatedNormals: number[] = [];

  chunkVertexData.positions = positions;
  chunkVertexData.indices = indicies;
  chunkVertexData.normals = calculatedNormals;

  BABYLON.VertexData.ComputeNormals(positions, indicies, calculatedNormals);
  chunkVertexData.applyToMesh(mesh, true);

  mesh.setVerticesData("myuvs", uvs, false, 3);
  mesh.setVerticesData("colors", linearcColors, false, 4);

  mesh.unfreezeWorldMatrix();
  mesh.position.x = chunkX;
  mesh.position.z = chunkZ;
  mesh.freezeWorldMatrix();
  //Babylon throws an error but this functions works
  //So wrapped it in this for now. It works though
  try {
   mesh.updateFacetData();
  } catch (error: any) {}
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
