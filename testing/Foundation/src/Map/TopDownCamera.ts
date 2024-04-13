import {
  ArcRotateCamera,
  Camera,
  FreeCamera,
  PointerEventTypes,
  Vector3,
  Scene,
} from "@babylonjs/core";
import { Vec3Array } from "@divinevoxel/core/Math";

export class TopDownCamera {
  camera: ArcRotateCamera;
  private _locked = false;
  defaultZoom = 100;
  constructor(public scene: Scene) {
    const engine = scene.getEngine()!;
    const canvas = engine.getRenderingCanvas()!;
    // Set Camera
    const camera = new ArcRotateCamera(
      "Camera",
      Math.PI / 2,
      Math.PI,
      -10,
      Vector3.Zero(),
      scene
    );
    (window as any).draftCamera = camera;
    this.camera = camera;
    camera.attachControl(canvas, true, false);
    let ortho = true;

    if (ortho) {
      camera.mode = Camera.ORTHOGRAPHIC_CAMERA;

      const zoom2DView = (camera: ArcRotateCamera, delta: number) => {
        const zoomingOut = delta < 0;

        // limit zooming in to no less than 3 units.
        if (
          (!zoomingOut && Math.abs(camera.orthoLeft!) <= 1) ||
          (zoomingOut && Math.abs(camera.orthoLeft!) >= 300)
        )
          return;

        camera.orthoLeft! += delta;
        camera.orthoRight! -= delta;

        this._updateRatio();

        // decrease pan sensitivity the closer the zoom level.
        camera.panningSensibility = 6250 / Math.abs(camera.orthoLeft!);
      };

      this._resetZoom();

      const zoomFactor = 1;
      scene.onPointerObservable.add(({ event }) => {
        const delta =
          Math.max(
            -1,
            Math.min(1, (event as any).wheelDelta || -(event as any).detail)
          ) * zoomFactor;
        zoom2DView(camera, delta);
      }, PointerEventTypes.POINTERWHEEL);
      camera._panningMouseButton = 0;
      // camera.panningSensibility = 30;
      (camera.inputs.attached.pointers as any).buttons = [0, 2];
      // lock the camera's placement, zooming is done manually in orthographic mode.
      // Locking this fixes strange issues with Hemispheric Light
      camera.lowerRadiusLimit = camera.radius;
      camera.upperRadiusLimit = camera.radius;
      camera.attachControl(canvas, true, false);
      camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
      camera.maxZ = 10000000;
      camera.minZ = 0.000001;
      const startRotation = camera.rotation.clone();
      const startAlpha = camera.alpha;
      const startBeta = camera.beta;
      scene.registerBeforeRender(() => {
        camera.alpha = startAlpha;
        camera.beta = startBeta;
        camera.rotation.copyFrom(startRotation);
      });
    }
  }

  lock() {
    this._locked = true;
    this.camera.detachControl();
  }
  unLock() {
    this._locked = false;
    this.camera.attachControl(
      this.scene.getEngine().getRenderingCanvas()!,
      true
    );
  }

  _resetZoom() {
    this.camera.orthoLeft = -this.defaultZoom;
    this.camera.orthoRight = this.defaultZoom;
    this._updateRatio();
  }

  _updateRatio() {
    const canvas = this.scene.getEngine()!.getRenderingCanvas()!;
    const ratio = canvas.height / canvas.width;
    this.camera.orthoTop = this.camera.orthoRight! * ratio;
    this.camera.orthoBottom = this.camera.orthoLeft! * ratio;
  }
  update(zoom: number, location: Vec3Array) {
    this.camera.setTarget(new Vector3(...location));
    this.camera.orthoLeft = -zoom;
    this.camera.orthoRight = zoom;
    this._updateRatio();
    console.log("UPDATE DRAFT CAMERA", location);
    //this.camera.detachControl();

    ///this.camera.position.set(...location);

    // this.camera.setPosition(new Vector3(...location));

    //this.camera.targetScreenOffset.set(location[0], location[2]);
    // this.camera.update();
    //this.camera.rebuildAnglesAndRadius();
  }
}
