import { BoundingInfo, Mesh, Scene, VertexData } from "@babylonjs/core";
import type { LocationData } from "voxelspaces";
import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types.js";
import { ChunkMeshData, SetNodeMesh } from "Meta/Tasks/RenderTasks.types";
import { DVEBabylon } from "../../Babylon/DVEBabylon.js";
import { NodeManager } from "../NodeManager.js";
import type { NodeMeshData } from "../types/RenderNode.types.js";
import { RenderManager } from "../../Render/RenderManager.js";
import { FOManager } from "../../Render/FloatingOrigin/FoManager.js";

export class NodeMesh {
 meshes: Mesh[] = [];
 pickable = false;
 checkCollisions = false;
 seralize = false;
 clearCachedGeometry = false;
 defaultBb: BoundingInfo;

 constructor(public data: NodeMeshData) {}

 createMesh(data: SetNodeMesh) {
  const scene = RenderManager.scene;
  if (!scene) return false;
  if (!this.defaultBb) {
   this.defaultBb = new DVEBabylon.system.BoundingInfo(
    DVEBabylon.system.Vector3.Zero(),
    new DVEBabylon.system.Vector3(16, 16, 16)
   );
  }
  let mesh = new DVEBabylon.system.Mesh(this.data.id, scene);

  const mat = NodeManager.materials.get(this.data.materialId);
  if (!mat) {
   throw new Error(`Material: ${this.data.materialId} does not exist`);
  }
  mesh.material = mat.getMaterial();
  if (FOManager.activeNode) {
   mesh.parent = FOManager.activeNode;
  }
  const atrs = mat.shader.data.mesh.getAttributes();

  for (const [id, stride] of atrs) {
   mesh.setVerticesData(id, [0], false, stride);
  }
  window.requestIdleCallback;
  mesh.position.x = data[0][1];
  mesh.position.y = data[0][2];
  mesh.position.z = data[0][3];

  const vertexData = new DVEBabylon.system.VertexData();
  for (const [id, attribute, stride] of data[1]) {
   if (id == "position") {
    vertexData.positions = attribute;
    continue;
   }
   if (id == "normal") {
    vertexData.normals = attribute;
    continue;
   }
   if (id == "indices") {
    vertexData.indices = attribute;

    continue;
   }
   mesh.setVerticesData(id, attribute, false, stride);
  }
  vertexData.applyToMesh(mesh, false);

  if (!this.checkCollisions) {
   mesh.doNotSyncBoundingInfo = true;
  }
  mesh.isPickable = this.pickable;

  (mesh as any).type = "node";
  mesh.checkCollisions = this.checkCollisions;
  mesh.doNotSerialize = this.seralize;
  mesh.cullingStrategy = DVEBabylon.system.Mesh.CULLINGSTRATEGY_STANDARD;
  mesh.isVisible = true;
  mesh.setEnabled(true);
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
}
