import { NodeMeshData } from "@divinevoxel/core/Interfaces/Render/Nodes/DVERenderNode.types";
import { DVENodeMeshManager } from "@divinevoxel/core/Interfaces/Render/Nodes/Meshes/DVENodeMeshManager";
import { DVEBRNodeMesh } from "./DVEBRNodeMesh";

export class DVEBRNodeMeshManager extends DVENodeMeshManager {
  meshes = new Map<string, DVEBRNodeMesh>();
  get(id: string): DVEBRNodeMesh {
    const mesh = this.meshes.get(id);
    if (!mesh) throw new Error(`Could not find mesh with id ${id}`);
    return mesh;
  }
  register(id:string,mesh:DVEBRNodeMesh): void {
  this.meshes.set(id,mesh);
  }
}
