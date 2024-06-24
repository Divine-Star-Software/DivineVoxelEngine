import { DVERenderer } from "@divinevoxel/core/Interfaces/Render/DVERenderer";
import { URIScene } from "@amodx/uri/Scenes/URIScene";
import {
  URITextureData,
  URITexture,
} from "@amodx/uri/Textures/URITexture";
import { Camera, Scene } from "three";
import { DVETRMeshCuller } from "./DVETRMeshCuller";
import { DVETRFOManager } from "./DVETRFOManger";
import { DVETRScene } from "./Scene/DVETRScene";
import { URIMaterial } from "@amodx/uri/Materials/URIMaterial";
import {
  URIInstanceMesh,
  URIInstanceMeshEntity,
} from "@amodx/uri/Meshes/URIInstanceMesh";
import { URIMesh } from "@amodx/uri/Meshes/URIMesh";
import { DVETRNodeManager } from "./Nodes/DVEBRNodeManager";
import { DVETRTexture } from "./Textures/DVETRTexture";
import { DivineVoxelEngineRender } from "@divinevoxel/core/Contexts/Render/DivineVoxelEngineRender";
import { URIEngine } from "@amodx/uri/Engine/URIEngine";
export interface DVEThreeRendererInitData {
  scene: Scene;
  camera: Camera;
}
export class DVEThreeRenderer extends DVERenderer {
  engine: URIEngine<unknown>;
  static instance: DVEThreeRenderer;
  nodes: DVETRNodeManager;
  scene: DVETRScene;
  foManager: DVETRFOManager;
  meshCuller: DVETRMeshCuller;

  constructor(data: DVEThreeRendererInitData) {
    super();
    this.scene = new DVETRScene();
    this.scene._scene = data.scene;
    this.scene.camera = data.camera;
    this.foManager = new DVETRFOManager(this.scene);
    this.meshCuller = new DVETRMeshCuller(this.scene, this.foManager);
    this.nodes = new DVETRNodeManager();

    if (!DVEThreeRenderer.instance) DVEThreeRenderer.instance = this;

    return DVEThreeRenderer.instance;
  }
  async init(dver: DivineVoxelEngineRender) {}
  createTexture(data: URITextureData<DVETRScene>): URITexture<DVETRScene, any> {
    return new DVETRTexture(data);
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
