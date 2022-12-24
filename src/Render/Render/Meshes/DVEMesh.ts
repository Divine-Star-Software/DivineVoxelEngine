import { EngineSettingsData } from "Meta/index.js";
import { SetChunkMeshTask } from "Meta/Tasks/RenderTasks.types";
import { DVEMaterial } from "../Materials/DVEMaterial.js";

export class DVEMesh {
 pickable = false;
 checkCollisions = false;
 seralize = false;
 clearCachedGeometry = false;
 defaultBb = new BABYLON.BoundingInfo(
  BABYLON.Vector3.Zero(),
  BABYLON.Vector3.Zero()
 );

 constructor(public name: string, public dveMat: DVEMaterial) {}

 createTemplateMesh(scene: BABYLON.Scene) {
  const mesh = new BABYLON.Mesh(this.name, scene);
  mesh.isPickable = this.pickable;
  mesh.checkCollisions = this.checkCollisions;
  (mesh as any).type = "chunk";
  mesh.alwaysSelectAsActiveMesh = true;

  if (!this.checkCollisions) {
   mesh.doNotSyncBoundingInfo = true;
  }

  mesh.doNotSerialize = this.seralize;
  mesh.cullingStrategy = BABYLON.AbstractMesh.CULLINGSTRATEGY_STANDARD;

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

 _applyVertexData(mesh: BABYLON.Mesh, data: SetChunkMeshTask) {
  mesh.unfreezeWorldMatrix();

  const chunkVertexData = new BABYLON.VertexData();

  mesh.position.x = data[2];
  mesh.position.y = data[3];
  mesh.position.z = data[4];
  chunkVertexData.positions = data[5];
  chunkVertexData.normals = data[6];
  chunkVertexData.indices = data[7];

  mesh.setVerticesData("faceData", data[8], false, 1);
  mesh.setVerticesData("aoColors", data[9], false, 1);
  mesh.setVerticesData("lightColors", data[10], false, 4);
  mesh.setVerticesData("colors", data[11], false, 4);
  mesh.setVerticesData("cuv3", data[12], false, 3);
  mesh.setVerticesData("ocuv3", data[13], false, 4);
  chunkVertexData.applyToMesh(mesh, false);

  if (this.clearCachedGeometry) {
   if (mesh.subMeshes) {
    for (const sm of mesh.subMeshes) {
     sm.setBoundingInfo(this.defaultBb);
    }
   }
   mesh.geometry?.clearCachedData();
  }

  mesh.freezeWorldMatrix();
 }

 async rebuildMeshGeometory(mesh: BABYLON.Mesh, data: SetChunkMeshTask) {
  this._applyVertexData(mesh, data);
  return mesh;
 }

 async createMeshGeometory(mesh: BABYLON.Mesh, data: SetChunkMeshTask) {
  mesh.material = this.dveMat.getMaterial();
  this._applyVertexData(mesh, data);
  return mesh;
 }
}
