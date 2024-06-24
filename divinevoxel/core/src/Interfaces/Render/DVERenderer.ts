import { URIEngine } from "@amodx/uri/Engine/URIEngine.js";
import { URIScene } from "@amodx/uri/Scenes/URIScene.js";
import { DVEMeshCuller } from "./DVEMeshCuller.js";
import { DVEFOManager } from "./DVEFOManager.js";
import { DVENodeManager } from "./Nodes/DVENodeManager.js";
import { DivineVoxelEngineRender } from "../../Contexts/Render/DivineVoxelEngineRender.js";
export abstract class DVERenderer {
  abstract engine: URIEngine;
  abstract scene: URIScene;
  abstract foManager: DVEFOManager;
  abstract meshCuller: DVEMeshCuller;
  abstract nodes: DVENodeManager;
  abstract init(dver: DivineVoxelEngineRender): Promise<void>;
}
