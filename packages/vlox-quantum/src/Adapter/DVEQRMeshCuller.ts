
import { DVEMeshCuller } from "@divinevoxel/vlox/Interfaces/Render/DVEMeshCuller.js";

import { DVEQRScene } from "./Scene/DVEQRScene.js";
import { DVEQRFOManager } from "./DVEQRFOManger.js";

export class DVEQRMeshCuller extends DVEMeshCuller {
  constructor(public scene: DVEQRScene, public foManager: DVEQRFOManager) {
    super(scene, foManager);
    this.init(scene._scene);
  }
  init(scene: any) {

  }
}
