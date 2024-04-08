import { DVERenderer } from "@divinevoxel/core/Interfaces/Render/DVERenderer";
import { Scene } from "@babylonjs/core/scene";
import { DVEBRMeshCuller } from "./DVEBRMeshCuller";
import { DVEBRFOManager } from "./DVEBRFOManger";
import { DVEBRScene } from "./Scene/DVEBRScene";
import { DVEBRNodeManager } from "./Nodes/DVEBRNodeManager.js";
import { DivineVoxelEngineRender } from "@divinevoxel/core/Render/DivineVoxelEngineRender.js";
import { Observable } from "@divinestar/utils/Observers/Observable.js";
import { DVEBRMesh } from "./Nodes/Meshes/DVEBRMesh.js";
import { DVEBREngine } from "./Engine/DVEBREngine.js";
export interface DVEBabylonRendererInitData {
  scene: Scene;
}
export class DVEBabylonRenderer extends DVERenderer {
  static instance: DVEBabylonRenderer;
  observers = {
    meshCreated: new Observable<DVEBRMesh>(),
    meshDisposed: new Observable<DVEBRMesh>()
  };
  nodes: DVEBRNodeManager;
  engine: DVEBREngine;
  scene: DVEBRScene;
  foManager: DVEBRFOManager;
  meshCuller: DVEBRMeshCuller;

  constructor(data: DVEBabylonRendererInitData) {
    super();
    this.engine = new DVEBREngine();
    this.engine._engine = data.scene.getEngine();
    this.scene = new DVEBRScene();
    this.scene._scene = data.scene;
    this.foManager = new DVEBRFOManager(this.scene);
    this.meshCuller = new DVEBRMeshCuller(this.scene, this.foManager);
    this.nodes = new DVEBRNodeManager();
    console.log("CREATED", DVEBabylonRenderer);
    if (!DVEBabylonRenderer.instance) DVEBabylonRenderer.instance = this;

    console.log(DVEBabylonRenderer.instance);
    return DVEBabylonRenderer.instance;
  }
  async init(dver: DivineVoxelEngineRender) {}

}
