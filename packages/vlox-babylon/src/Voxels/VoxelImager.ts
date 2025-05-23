import {
  ArcRotateCamera,
  Engine,
  Mesh,
  Scene,
  Vector3,
  RenderTargetTexture,
  Color4,
} from "@babylonjs/core";
import { PaintVoxelData } from "@divinevoxel/vlox/Voxels/";
import { VoxelMesher } from "./VoxelMesher";

export class VoxelImager {
  _2dCanvas = document.createElement("canvas");
  _2dContext: CanvasRenderingContext2D;

  _rtt: RenderTargetTexture;

  _mesher: VoxelMesher;
  _camera: ArcRotateCamera;
  constructor(public scene: Scene) {
    this._mesher = new VoxelMesher(scene);
    this._2dCanvas.width = 256;
    this._2dCanvas.height = 256;
    this._2dContext = this._2dCanvas.getContext("2d")!;

    const rtt = new RenderTargetTexture(
      "Voxel Imager RTT",
      {
        width: 256,
        height: 256,
      },
      scene,
      false,
      true,
      Engine.TEXTURETYPE_UNSIGNED_BYTE
    );

    this._rtt = rtt;
    scene.customRenderTargets.push(rtt);
    rtt.clearColor = new Color4(0, 0, 0, 0);
    rtt.renderList = [];

    const camera = new ArcRotateCamera(
      "Voxel Imager Camera",
      -Math.PI / 4,
      Math.PI / 2.5,
      2,
      new Vector3(0, 0, 0),
      scene,
      false
    );
    this._camera = camera;
    rtt.activeCamera = camera;
    camera.minZ = 0.0001;
    camera.mode = ArcRotateCamera.ORTHOGRAPHIC_CAMERA;

    const zoom = 0.8;
    const ratio = 1;
    camera.orthoLeft = -zoom;
    camera.orthoRight = zoom;
    camera.orthoBottom = -zoom / ratio;
    camera.orthoTop = zoom / ratio;
  }

  private _waitTillReady() {
    return new Promise((resolve) => {
      const run = () => {
        if (this._rtt.isReadyForRendering()) {
          return resolve(true);
        }
        setTimeout(run, 10);
      };
      run();
    });
  }

  async createImage(voxel: PaintVoxelData) {
    const mesh = this._mesher.meshVoxel(voxel);
    if (!mesh) return null;
    mesh.setEnabled(true);
    const image = await this.createImageFromMesh(mesh);
    mesh.dispose();
    return image;
  }

  async createImageFromMesh(mesh: Mesh): Promise<string> {
    if (!this._rtt.isReadyForRendering()) await this._waitTillReady();
    const rtt = this._rtt;
    const ctx = this._2dContext;

    rtt.renderList = [mesh];
    rtt.render();
    //  displayScene.render();

    const rawPixels = await rtt.readPixels()!;

    const imageData = new ImageData(
      new Uint8ClampedArray(rawPixels.buffer),
      256,
      256
    );

    const bitmap = await createImageBitmap(imageData);
    ctx.save();
    ctx.clearRect(0, 0, 256, 256);
    ctx.scale(1, -1);
    ctx.drawImage(bitmap, 0, -256); // draw flipped
    ctx.restore();

    return this._2dCanvas.toDataURL("image/png");
  }
  dispose() {
    this._camera.dispose();
    this._rtt.dispose();
  }
}
