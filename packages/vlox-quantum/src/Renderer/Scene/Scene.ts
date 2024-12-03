import { PerspectiveCamera } from "../Camera/PerspectiveCamera";
import { Engine } from "../Engine/Engine";
import { VoxelScene } from "./VoxelScene/VoxelScene";

export class Scene {
  activeCamera: PerspectiveCamera | null;

  voxelScene: VoxelScene;

  private _isReady = false;

  constructor(
    public engine: Engine,
    public renderRadius: number
  ) {}

  async init() {
    this.voxelScene = new VoxelScene(this, this.renderRadius);
    await this.voxelScene.init();
    this._isReady = true;
  }

  setCamera(camera: PerspectiveCamera) {
    this.voxelScene.setCamera(camera);
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
