import { SetNodeMesh } from "Meta/Tasks/RenderTasks.types.js";
import { UtilMap } from "../../../Global/Util/UtilMap.js";
import { NodeMeshData } from "../types/RenderNode.types.js";
import { DVENodeMesh } from "./NodeMesh.js";

export const NodeMeshManager = {
 meshes: new UtilMap<string, DVENodeMesh>(),

 add(meshes: NodeMeshData[]) {
  for (const mesh of meshes) {
   this.meshes.add([[mesh.id, new DVENodeMesh(mesh)]]);
  }
 },
 create(id: string, data: SetNodeMesh) {
  const nodeMesh = this.meshes.get(id);
  if (!nodeMesh) return false;
  return nodeMesh.createMesh(data);
 },

 get(id: string) {
  return this.meshes.get(id);
 },
};
