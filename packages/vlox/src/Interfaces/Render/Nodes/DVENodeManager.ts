import { DVENodeMaterialManager } from "./Materials/DVENodeMaterialManager";
import { DVENodeMeshManager } from "./Meshes/DVENodeMeshManager";

export abstract class DVENodeManager {
  abstract materials: DVENodeMaterialManager;
  abstract meshes: DVENodeMeshManager;
}
