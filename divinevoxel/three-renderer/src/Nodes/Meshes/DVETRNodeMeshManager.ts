import { NodeMeshData } from "@divinevoxel/core/Interfaces/Render/Nodes/DVERenderNode.types";
import { DVENodeMeshManager } from "@divinevoxel/core/Interfaces/Render/Nodes/Meshes/DVENodeMeshManager";
import { DVETRNodeMesh } from "./DVETRNodeMesh";
import { DVETRScene } from "Scene/DVETRScene";

export class DVETRNodeMeshManager extends DVENodeMeshManager {
  meshes = new Map<string, DVETRNodeMesh>();
  get(id: string): DVETRNodeMesh {
    const mesh = this.meshes.get(id);
    if (!mesh) throw new Error(`Could not find mesh with id ${id}`);
    return mesh;
  }
  register(id:string,mesh:DVETRNodeMesh): void {
  this.meshes.set(id,mesh);
  }
}
