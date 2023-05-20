import {
 BoundingInfo,
 FloatArray,
 Mesh,
 Scene,
 VertexData,
 Engine,
} from "@babylonjs/core";
import type { LocationData } from "voxelspaces";
import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types.js";
import { ChunkMeshData, SetNodeMesh } from "Meta/Tasks/RenderTasks.types";
import { DVEBabylon } from "../DVEBabylon.js";
import { NodeManager } from "../NodeManager.js";
import type { NodeMeshData } from "../types/RenderNode.types.js";
import { RenderManager } from "../../Scene/RenderManager.js";
import { FOManager } from "../../Scene/FloatingOrigin/FoManager.js";

export class NodeMesh {
 meshes: Mesh[] = [];
 pickable = false;
 checkCollisions = false;
 seralize = false;
 clearCachedGeometry = true;
 defaultBb: BoundingInfo;
 scene: Scene;
 engine: Engine;
 constructor(public data: NodeMeshData) {}

 createMesh(data: SetNodeMesh) {
  if (!this.scene) {
   const scene = RenderManager.scene;
   if (!scene) {
    throw new Error(`A scene is required.`);
   }
   this.scene = scene;
   this.engine = scene.getEngine();
  }
  if (!this.defaultBb) {
   this.defaultBb = new DVEBabylon.system.BoundingInfo(
    DVEBabylon.system.Vector3.Zero(),
    new DVEBabylon.system.Vector3(16, 16, 16)
   );
  }

  const mesh = new DVEBabylon.system.Mesh(this.data.id, this.scene);

  const mat = NodeManager.materials.get(this.data.materialId);
  if (!mat) {
   throw new Error(`Material: ${this.data.materialId} does not exist`);
  }
 
  if (FOManager.activeNode) {
   mesh.parent = FOManager.activeNode;
  }

  if (!this.checkCollisions) {
   mesh.doNotSyncBoundingInfo = true;
  }
  mesh.isPickable = this.pickable;

  (mesh as any).type = "node";

  if (!mesh.geometry) {
   const geo = new DVEBabylon.system.Geometry(
    DVEBabylon.system.Geometry.RandomId(),
    this.scene,
    undefined,
    undefined,
    mesh
   );
   geo._boundingInfo = this.defaultBb;
   geo!.useBoundingInfoFromGeometry = true;
  }
  mesh.checkCollisions = this.checkCollisions;
  mesh.doNotSerialize = this.seralize;
  mesh.alwaysSelectAsActiveMesh = true;
  mesh.doNotSyncBoundingInfo = true;

  this.updateVetexData(data, mesh);
  mesh.setEnabled(true);
  mesh.isVisible = true;
  mesh.material = mat.getMaterial();
  return mesh;
 }
 returnMesh(mesh: Mesh) {
  mesh.dispose();
 }
 updateVetexData(data: SetNodeMesh, mesh: Mesh) {
  mesh.unfreezeWorldMatrix();
  mesh.position.x = data[0][1];
  mesh.position.y = data[0][2];
  mesh.position.z = data[0][3];

  for (const [id, attribute, stride] of data[1]) {
   switch (id) {
    case "position":
     mesh.setVerticesBuffer(
      new DVEBabylon.system.VertexBuffer(
       this.engine,
       attribute,
       id,
       false,
       undefined,
       stride
      )
     );
     break;
    case "normal":
     mesh.setVerticesBuffer(
      new DVEBabylon.system.VertexBuffer(
       this.engine,
       attribute,
       id,
       false,
       undefined,
       stride
      )
     );
     break;
    case "indices":
     mesh.setIndices(attribute as any);
     break;
    default:
     mesh.setVerticesBuffer(
      new DVEBabylon.system.VertexBuffer(
       this.engine,
       attribute,
       id,
       false,
       undefined,
       stride
      )
     );
     break;
   }
  }

  mesh.freezeWorldMatrix();
  this._clearCached(mesh);
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
  if (!this.clearCachedGeometry) return;
  mesh.geometry!.clearCachedData();
  if (mesh.subMeshes) {
   for (const sm of mesh.subMeshes) {
    sm.setBoundingInfo(this.defaultBb);
   }
  }
 }
}
