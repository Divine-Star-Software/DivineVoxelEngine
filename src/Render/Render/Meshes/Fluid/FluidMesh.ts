import { VoxelMeshInterface } from "Meta/Render/Meshes/VoxelMesh.interface";
import { FluidMaterial } from "../../Materials/Fluid/FluidMaterial.js";

export const FluidMesh: VoxelMeshInterface = {
 pickable: false,
 checkCollisions: false,
 seralize: false,
 clearCachedGeometry: false,
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
  if(this.clearCachedGeometry) {
    mesh.geometry?.clearCachedData();
  }
  return mesh;
 },

 createTemplateMesh(scene: BABYLON.Scene) {
  const mesh = new BABYLON.Mesh("fluid", scene);
  mesh.alphaIndex = 0;
  mesh.isPickable = this.pickable;
  mesh.checkCollisions = this.checkCollisions;
  if(!this.checkCollisions) {
    mesh.doNotSyncBoundingInfo = true;
  }
  mesh.doNotSerialize = this.seralize;
  return mesh;
 },

 syncSettings(settings) {
  if (settings.meshes.pickable) {
   this.pickable = true;
  }
  if (settings.meshes.clearChachedGeometry) {
   this.clearCachedGeometry = true;
  }
  if (settings.meshes.checkFluidCollisions) {
   this.checkCollisions = true;
  }
  if (settings.meshes.seralize) {
   this.seralize = true;
  }
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
  mesh.material = FluidMaterial.getMaterial();
  if(this.clearCachedGeometry) {
    mesh.geometry?.clearCachedData();
  }
  return mesh;
 },
};
