import { DVENodeManager } from "@divinevoxel/vlox/Interfaces/Render/Nodes/DVENodeManager";

import { DVEBRNodeMaterialsManager } from "./Materials/DVEBRNodeMaterialsManager";
import { DVEBRNodeMeshManager } from "./Meshes/DVEBRNodeMeshManager";

export class DVEBRNodeManager extends DVENodeManager {
  materials = new DVEBRNodeMaterialsManager();
  meshes = new DVEBRNodeMeshManager();
}
