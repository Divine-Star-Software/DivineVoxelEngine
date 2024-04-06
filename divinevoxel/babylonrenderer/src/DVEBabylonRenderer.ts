import { DVERenderer } from "@divinevoxel/core/Interfaces/Render/DVERenderer";
import { URIScene } from "@divinestar/uri/Scenes/URIScene";
import {
  URITextureData,
  URITexture,
} from "@divinestar/uri/Textures/URITexture";
import { Scene } from "@babylonjs/core/scene";
import { DVEBRMeshCuller } from "./DVEBRMeshCuller";
import { DVEBRFOManager } from "./DVEBRFOManger";
import { DVEBRScene } from "./Scene/DVEBRScene";
import { URIMaterial } from "@divinestar/uri/Materials/URIMaterial";
import {
  URIInstanceMesh,
  URIInstanceMeshEntity,
} from "@divinestar/uri/Meshes/URIInstanceMesh";
import { URIMesh } from "@divinestar/uri/Meshes/URIMesh";
import { DVEBRNodeManager } from "./Nodes/DVEBRNodeManager";
import { DVEBRTexture } from "./Textures/DVEBRTexture";
export interface DVEBabylonRendererInitData {
  scene: Scene;
}
export class DVEBabylonRenderer extends DVERenderer {
  static instance: DVEBabylonRenderer;
  nodes: DVEBRNodeManager;
  scene: DVEBRScene;
  foManager: DVEBRFOManager;
  meshCuller: DVEBRMeshCuller;

  constructor(data: DVEBabylonRendererInitData) {
    super();
    this.scene = new DVEBRScene();
    this.scene._scene = data.scene;
    this.foManager = new DVEBRFOManager(this.scene);
    this.meshCuller = new DVEBRMeshCuller(this.scene, this.foManager);
    this.nodes = new DVEBRNodeManager();
    console.log("CREATED",DVEBabylonRenderer)
    if (!DVEBabylonRenderer.instance) DVEBabylonRenderer.instance = this;

    console.log(
      DVEBabylonRenderer.instance
    )
    return DVEBabylonRenderer.instance;
  }
  async init() {}
  createTexture(data: URITextureData): URITexture<URIScene<any>, any> {
    return new DVEBRTexture(data);
  }
  createMesh(): URIMesh<URIScene<unknown>, unknown> {
    throw new Error("Method not implemented.");
  }
  createInstanceMesh(
    mesh: URIMesh<URIScene<unknown>, unknown>
  ): URIInstanceMesh<
    URIScene<unknown>,
    unknown,
    URIInstanceMeshEntity<unknown>
  > {
    throw new Error("Method not implemented.");
  }
  createMaterial(id: string): URIMaterial<URIScene<unknown>, any, unknown> {
    throw new Error("Method not implemented.");
  }
}
