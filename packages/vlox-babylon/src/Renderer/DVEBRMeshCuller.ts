import { Scene } from "@babylonjs/core";
import { DVEMeshCuller } from "@divinevoxel/vlox/Interfaces/Render/DVEMeshCuller.js";

import { DVEBRScene } from "./Scene/DVEBRScene.js";
import { DVEBRFOManager } from "./DVEBRFOManger.js";

export class DVEBRMeshCuller extends DVEMeshCuller {
  constructor(public scene: DVEBRScene, public foManager: DVEBRFOManager) {
    super(scene, foManager);
    this.init(scene._scene);
  }
  init(scene: Scene) {

  }
}
