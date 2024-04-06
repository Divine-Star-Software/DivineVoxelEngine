import { DVENodeMesh } from "./DVENodeMesh";
import { NodeMeshData } from "../DVERenderNode.types";

export abstract class DVENodeMeshManager {
  abstract get(id: string): DVENodeMesh;
  abstract register(id:string,mesh: DVENodeMesh): void;
}
