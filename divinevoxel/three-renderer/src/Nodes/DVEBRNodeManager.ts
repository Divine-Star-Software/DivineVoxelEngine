import { DVENodeManager } from "@divinevoxel/core/Interfaces/Render/Nodes/DVENodeManager";

import { DVETRNodeMaterialsManager } from "./Materials/DVETRNodeMaterialsManager";
import { DVETRNodeMeshManager } from "./Meshes/DVETRNodeMeshManager";

export class DVETRNodeManager extends DVENodeManager {
  materials = new DVETRNodeMaterialsManager();
  meshes = new DVETRNodeMeshManager();
}
