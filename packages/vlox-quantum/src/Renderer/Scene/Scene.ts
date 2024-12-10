import { PerspectiveCamera } from "../Camera/PerspectiveCamera";
import { Engine } from "../Engine/Engine";
import { VoxelScene } from "./VoxelScene/VoxelScene";

export class Scene {
  activeCamera: PerspectiveCamera | null;

  voxelScene: VoxelScene;

  _isReady = false;

  constructor(
    public engine: Engine,
    public renderRadius: number
  ) {}

  async init() {}

  setCamera(camera: PerspectiveCamera) {

    this.activeCamera = camera;

  
  }

  render() {
    if (!this._isReady) return;
    if (!this.activeCamera)
      throw new Error("An active camera must be set to render scene.");
    this.activeCamera._update();
    this.voxelScene.render();
  }
}
