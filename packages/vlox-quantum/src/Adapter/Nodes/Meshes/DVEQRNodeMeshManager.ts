import { NodeMeshData } from "@divinevoxel/vlox/Interfaces/Render/Nodes/DVERenderNode.types";
import { DVENodeMeshManager } from "@divinevoxel/vlox/Interfaces/Render/Nodes/Meshes/DVENodeMeshManager";
import { DVEQRNodeMesh } from "./DVEQRNodeMesh";

export class DVEQRNodeMeshManager extends DVENodeMeshManager {
  meshes = new Map<string, DVEQRNodeMesh>();
  get(id: string): DVEQRNodeMesh {
    const mesh = this.meshes.get(id);
    if (!mesh) throw new Error(`Could not find mesh with id ${id}`);
    return mesh;
  }
  register(id:string,mesh:DVEQRNodeMesh): void {
  this.meshes.set(id,mesh);
  }
}
