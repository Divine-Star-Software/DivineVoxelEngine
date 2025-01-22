import { DVERenderer } from "@divinevoxel/vlox/Renderer/DVERenderer";
import { Scene } from "@babylonjs/core/scene";
import { DVEBRMeshCuller } from "./DVEBRMeshCuller";
import { DVEBRFOManager } from "./DVEBRFOManger";
import { DivineVoxelEngineRender } from "@divinevoxel/vlox/Contexts/Render/DivineVoxelEngineRender.js";
import { Observable } from "@amodx/core/Observers/Observable.js";
import { DVEBRMesh } from "../Meshes/DVEBRMesh.js";
import { TimerState, type Engine } from "@babylonjs/core";
import { SceneTool } from "../Tools/SceneTool";
import { DVEBRChunkMeshes } from "../Meshes/DVEBRChunkMeshes";
import { DVEBRMaterialRegister } from "../Matereials/DVEBRNodeMaterialsManager";
export interface DVEBabylonRendererInitData {
  scene: Scene;
}
export class DVEBabylonRenderer extends DVERenderer {
  static instance: DVEBabylonRenderer;
  observers = {
    meshCreated: new Observable<DVEBRMesh>(),
    meshDisposed: new Observable<DVEBRMesh>(),
  };
  chunkMeshes: DVEBRChunkMeshes;
  engine: Engine;
  scene: Scene;
  foManager: DVEBRFOManager;
  meshCuller: DVEBRMeshCuller;
  sceneTool: SceneTool;
  materials = new DVEBRMaterialRegister();

  constructor(data: DVEBabylonRendererInitData) {
    super();
    this.engine = data.scene.getEngine() as any;
    this.scene = data.scene;
    this.foManager = new DVEBRFOManager();
    this.meshCuller = new DVEBRMeshCuller();

    this.chunkMeshes = new DVEBRChunkMeshes(data.scene, this.engine, this);
    this.sceneTool = new SceneTool();
    this.meshCuller.init(this.scene);
    if (!DVEBabylonRenderer.instance) DVEBabylonRenderer.instance = this;

    return DVEBabylonRenderer.instance;
  }

  async init(dver: DivineVoxelEngineRender) {}
}
