import {
  URITextureData,
  URITexture,
} from "@divinestar/uri/Textures/URITexture.js";
import { URIMesh } from "@divinestar/uri/Meshes/URIMesh.js";
import { URIInstanceMesh } from "@divinestar/uri/Meshes/URIInstanceMesh.js";
import { URIMaterial } from "@divinestar/uri/Materials/URIMaterial.js";
import { URIScene } from "@divinestar/uri/Scenes/URIScene.js";
import { DVEMeshCuller } from "./DVEMeshCuller.js";
import { DVEFOManager } from "./DVEFOManager.js";
import { DVENodeManager } from "./Nodes/DVENodeManager.js";
import { DivineVoxelEngineRender } from "Render/DivineVoxelEngineRender.js";
export abstract class DVERenderer {
  abstract scene: URIScene;
  abstract foManager: DVEFOManager;
  abstract meshCuller: DVEMeshCuller;
  abstract nodes: DVENodeManager;
  abstract createTexture(data: URITextureData): URITexture;
  abstract createMesh(): URIMesh;
  abstract createInstanceMesh(mesh: URIMesh): URIInstanceMesh;
  abstract createMaterial(id: string): URIMaterial;
  abstract init(dver: DivineVoxelEngineRender): Promise<void>;
}
