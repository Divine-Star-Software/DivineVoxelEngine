import type { FluidMaterial } from "Render/Render/Materials/Fluid/FluidMaterial";

export class FluidMesh {
 mesh: BABYLON.Mesh;

 scene: BABYLON.Scene;
 beenCreated: boolean = false;

 constructor(private material: FluidMaterial) {}

 async rebuildMeshGeometory(
  positions: Float32Array,
  indicies: Int32Array,
  RGBLightColors: Float32Array,
  sunLightColors: Float32Array,
  colors: Float32Array,
  uvs: Float32Array
 ) {
  const chunkVertexData = new BABYLON.VertexData();
  chunkVertexData.positions = positions;
  chunkVertexData.indices = indicies;
  chunkVertexData.applyToMesh(this.mesh, true);

  this.mesh.setVerticesData("cuv3", uvs, false, 3);
  this.mesh.setVerticesData("rgbLightColors", RGBLightColors, false, 4);
  this.mesh.setVerticesData("sunLightColors", sunLightColors, false, 4);
  this.mesh.setVerticesData("colors", colors, false, 4);
 }

 createTemplateMesh(scene: BABYLON.Scene) {
  this.mesh = new BABYLON.Mesh("fluid", scene);
  this.scene = scene;
  this.mesh.isPickable = false;
  this.mesh.alphaIndex = 1;
  this.mesh.checkCollisions = false;
  this.mesh.visibility = 0.1;
  this.mesh.hasVertexAlpha = true;
  return this.mesh;
 }

 async createMeshGeometory(
  positions: Float32Array,
  indicies: Int32Array,
  RGBLightColors: Float32Array,
  sunLightColors: Float32Array,
  colors: Float32Array,
  uvs: Float32Array
 ) {
  this.mesh.material = this.material.getMaterial();
  this.beenCreated = true;
  const chunkVertexData = new BABYLON.VertexData();
  chunkVertexData.positions = positions;
  chunkVertexData.indices = indicies;

  chunkVertexData.applyToMesh(this.mesh, true);

  this.mesh.setVerticesData("cuv3", uvs, false, 3);

  this.mesh.setVerticesData("rgbLightColors", RGBLightColors, false, 4);
  this.mesh.setVerticesData("sunLightColors", sunLightColors, false, 4);
  this.mesh.setVerticesData("colors", colors, false, 4);

  this.mesh.freezeWorldMatrix();

  return this.mesh;
 }
}
