import type { BoundingInfo, Mesh, Scene, VertexData } from "babylonjs";
import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";
import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types.js";
import { ChunkMeshData } from "Meta/Tasks/RenderTasks.types";
import { DVEBabylon } from "../../Babylon/DVEBabylon.js";
import { DVEMaterial } from "../Materials/DVEMaterial.js";

export class DVEMesh {
 meshes: Mesh[] = [];
 pickable = false;
 checkCollisions = false;
 seralize = false;
 clearCachedGeometry = false;
 defaultBb: BoundingInfo;

 constructor(public name: string, public dveMat: DVEMaterial) {

  this.defaultBb = new DVEBabylon.system.BoundingInfo(
   DVEBabylon.system.Vector3.Zero(),
   DVEBabylon.system.Vector3.Zero()
  );
 }

 createTemplateMesh(scene: Scene) {
  let mesh = this.meshes.shift();
  if (!mesh) {
   mesh = new DVEBabylon.system.Mesh(this.name, scene);
   this._setEmptyData(mesh);
  } else {
   mesh.setEnabled(true);
  }

  mesh.isPickable = this.pickable;
  mesh.checkCollisions = this.checkCollisions;
  (mesh as any).type = "chunk";
  mesh.alwaysSelectAsActiveMesh = true;

  if (!this.checkCollisions) {
   mesh.doNotSyncBoundingInfo = true;
  }

  mesh.doNotSerialize = this.seralize;
  mesh.cullingStrategy = DVEBabylon.system.Mesh.CULLINGSTRATEGY_STANDARD;
  mesh.material = this.dveMat.getMaterial();
  mesh.isVisible = false;
  mesh.setEnabled(false);
  return mesh;
 }

 syncSettings(settings: EngineSettingsData) {
  if (settings.meshes.pickable) {
   this.pickable = true;
  }
  if (settings.meshes.clearChachedGeometry) {
   this.clearCachedGeometry = true;
  }
  if (settings.meshes.seralize) {
   this.seralize = true;
  }
 }

 _setEmptyData(mesh: Mesh) {
  let chunkVertexData = (mesh as any).vertexData;
  if (!chunkVertexData) {
   chunkVertexData = new DVEBabylon.system.VertexData();
   (mesh as any).vertexData = chunkVertexData;
  }

  mesh.position.x = 0;
  mesh.position.y = 0;
  mesh.position.z = 0;
  chunkVertexData.positions = [0];
  chunkVertexData.normals = [0];
  chunkVertexData.indices = [0];
  mesh.setVerticesData("faceData", [0], false, 1);
  mesh.setVerticesData("aoColors", [0], false, 1);
  mesh.setVerticesData("lightColors", [0], false, 4);
  mesh.setVerticesData("colors", [9], false, 4);
  mesh.setVerticesData("cuv3", [0], false, 3);
  mesh.setVerticesData("ocuv3", [0], false, 4);
  chunkVertexData.applyToMesh(mesh, false);
 }

 _clearCached(mesh: Mesh) {
  if (this.clearCachedGeometry) {
   if (mesh.subMeshes) {
    for (const sm of mesh.subMeshes) {
     sm.setBoundingInfo(this.defaultBb);
    }
   }
   mesh.geometry?.clearCachedData();
  }
 }

 removeMesh(mesh: Mesh) {
  this._clearCached(mesh);
  this._setEmptyData(mesh);
  this.meshes.push(mesh);
 }

 async setMeshData(mesh: Mesh, location: LocationData, data: ChunkMeshData) {
  mesh.unfreezeWorldMatrix();
  mesh.position.x = location[1];
  mesh.position.y = location[2];
  mesh.position.z = location[3];

  const chunkVertexData: VertexData = (mesh as any).vertexData;
  chunkVertexData.positions = data[1];
  chunkVertexData.normals = data[2];
  chunkVertexData.indices = data[3];
  mesh.setVerticesData("faceData", data[4], false, 1);
  mesh.setVerticesData("aoColors", data[5], false, 1);
  mesh.setVerticesData("lightColors", data[6], false, 4);
  mesh.setVerticesData("colors", data[7], false, 4);
  mesh.setVerticesData("cuv3", data[8], false, 3);
  mesh.setVerticesData("ocuv3", data[9], false, 4);
  chunkVertexData.applyToMesh(mesh, false);

  this._clearCached(mesh);

  mesh.freezeWorldMatrix();
  return mesh;
 }
}
