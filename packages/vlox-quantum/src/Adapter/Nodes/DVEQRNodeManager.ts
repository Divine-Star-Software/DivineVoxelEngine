import { DVENodeManager } from "@divinevoxel/vlox/Interfaces/Render/Nodes/DVENodeManager";

import { DVEQRNodeMaterialsManager } from "./Materials/DVEQRNodeMaterialsManager";
import { DVEQRNodeMeshManager } from "./Meshes/DVEQRNodeMeshManager";

export class DVEQRNodeManager extends DVENodeManager {
  materials = new DVEQRNodeMaterialsManager();
  meshes = new DVEQRNodeMeshManager();
}
