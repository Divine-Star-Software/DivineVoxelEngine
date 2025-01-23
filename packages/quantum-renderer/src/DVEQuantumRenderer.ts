import { DVERenderer } from "@divinevoxel/core/Interfaces/Render/DVERenderer";

import { DivineVoxelEngineRender } from "@divinevoxel/core/Contexts/Render/DivineVoxelEngineRender.js";

export interface DVEBabylonRendererInitData {
  canvas: HTMLCanvasElement;
}
export class DVEBabylonRenderer extends DVERenderer {
  static instance: DVEBabylonRenderer;

  nodes: any;
  engine: any;
  scene: any;
  foManager: any;
  meshCuller: any;

  constructor(data: DVEBabylonRendererInitData) {
    super();

    if (!DVEBabylonRenderer.instance) DVEBabylonRenderer.instance = this;

    return DVEBabylonRenderer.instance;
  }
  async init(dver: DivineVoxelEngineRender) {}
}
