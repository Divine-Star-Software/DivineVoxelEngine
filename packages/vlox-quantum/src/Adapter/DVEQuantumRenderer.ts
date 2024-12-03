import { DVERenderer } from "@divinevoxel/vlox/Interfaces/Render/DVERenderer";

import { DVEQRMeshCuller } from "./DVEQRMeshCuller";
import { DVEQRFOManager } from "./DVEQRFOManger";
import { DVEQRScene } from "./Scene/DVEQRScene";
import { DVEQRNodeManager } from "./Nodes/DVEQRNodeManager.js";
import { DivineVoxelEngineRender } from "@divinevoxel/vlox/Contexts/Render/DivineVoxelEngineRender.js";
import { Observable } from "@amodx/core/Observers/Observable.js";
import { DVEQRMesh } from "./Nodes/Meshes/DVEQRMesh.js";
import { DVEQREngine } from "./Engine/DVEQREngine.js";

export interface DVEBabylonRendererInitData {
  scene: any;
}
export class DVEQuantumRenderer extends DVERenderer {
  static instance: DVEQuantumRenderer;
  observers = {
    meshCreated: new Observable<DVEQRMesh>(),
    meshDisposed: new Observable<DVEQRMesh>(),
  };
  nodes: DVEQRNodeManager;
  engine: DVEQREngine;
  scene: DVEQRScene;
  foManager: DVEQRFOManager;
  meshCuller: DVEQRMeshCuller;


  constructor(data: DVEBabylonRendererInitData) {
    super();
    this.engine = new DVEQREngine();
   // this.engine._engine = data.scene.getEngine() as any;
    this.scene = new DVEQRScene();
    this.scene._scene = data.scene;
    this.foManager = new DVEQRFOManager(this.scene);
    this.meshCuller = new DVEQRMeshCuller(this.scene, this.foManager);
    this.nodes = new DVEQRNodeManager();

    this.meshCuller.init(this.scene._scene);
    if (!DVEQuantumRenderer.instance) DVEQuantumRenderer.instance = this;

    return DVEQuantumRenderer.instance;
  }
  async init(dver: DivineVoxelEngineRender) {}
}
