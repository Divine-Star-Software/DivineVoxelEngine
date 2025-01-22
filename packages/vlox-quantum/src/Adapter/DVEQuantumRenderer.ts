import { DVERenderer } from "@divinevoxel/vlox/Interfaces/Render/DVERenderer";

import { DVEQRMeshCuller } from "./DVEQRMeshCuller";
import { DVEQRFOManager } from "./DVEQRFOManger";


import { DivineVoxelEngineRender } from "@divinevoxel/vlox/Contexts/Render/DivineVoxelEngineRender.js";
import { Observable } from "@amodx/core/Observers/Observable.js";
import { DVEQRMesh } from "./Nodes/Meshes/DVEQRMesh.js";
import { DVEChunkMeshes } from "@divinevoxel/vlox/Interfaces/Render/DVEChunkMeshes";
import { DVEQRNodeMesh } from "./Nodes/Meshes/DVEQRNodeMesh";
import { DVEQRMaterialsRegister } from "./Nodes/Materials/DVEQRNodeMaterialsManager";

export interface DVEBabylonRendererInitData {
  scene: any;
}
export class DVEQuantumRenderer extends DVERenderer {
  static instance: DVEQuantumRenderer;
  observers = {
    meshCreated: new Observable<DVEQRMesh>(),
    meshDisposed: new Observable<DVEQRMesh>(),
  };

  foManager: DVEQRFOManager;
  meshCuller: DVEQRMeshCuller;
  chunkMeshes:  DVEQRNodeMesh;
  materials = new DVEQRMaterialsRegister();


  constructor(data: DVEBabylonRendererInitData) {
    super();


    this.chunkMeshes = new DVEQRNodeMesh(data.scene);

    if (!DVEQuantumRenderer.instance) DVEQuantumRenderer.instance = this;

    return DVEQuantumRenderer.instance;
  }
  async init(dver: DivineVoxelEngineRender) {}
}
