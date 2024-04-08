import { URIEngine } from "@divinestar/uri/Engine/URIEngine.js";
import { URIScene } from "@divinestar/uri/Scenes/URIScene.js";
import { DVEMeshCuller } from "./DVEMeshCuller.js";
import { DVEFOManager } from "./DVEFOManager.js";
import { DVENodeManager } from "./Nodes/DVENodeManager.js";
import { DivineVoxelEngineRender } from "Render/DivineVoxelEngineRender.js";
export abstract class DVERenderer {
  abstract engine: URIEngine;
  abstract scene: URIScene;
  abstract foManager: DVEFOManager;
  abstract meshCuller: DVEMeshCuller;
  abstract nodes: DVENodeManager;

  abstract init(dver: DivineVoxelEngineRender): Promise<void>;
}
