import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  StandardMaterial,
  Color3,
  TransformNode,
  Quaternion,
  Axis,
  Camera,
} from "@babylonjs/core";
import { GenMap } from "./Internal/GenMap";
import { TickInterval } from "@divinevoxel/vlox/Util/TickInterval";
import { Vector3Like } from "@amodx/math";

export class DebugGenMap {
  private _onDispose: (() => void) | null = null;
  init(
    followPosition: Vector3Like,
    followDirection: Vector3Like,
    dimension = 0
  ) {
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.zIndex = "200";
    container.style.width = "250px";
    container.style.height = "250px";
    container.style.top = "0";
    container.style.left = "0";
    container.style.padding = "0";
    container.style.margin = "0";
    document.body.append(container);

    const canvas = document.createElement("canvas");

    const worldGenButton = document.createElement("button");
    const biomesButton = document.createElement("button");

    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.position = "absolute";
    canvas.style.zIndex = "250";

    worldGenButton.innerText = "World Gen";
    biomesButton.innerText = "Biomes";

    container.appendChild(canvas);

    // Babylon.js setup
    const engine = new Engine(canvas);
    const scene = new Scene(engine);
    const camera = new ArcRotateCamera(
      "",
      Math.PI,
      0,
      800,
      Vector3.Zero(),
      scene
    );
    camera.attachControl(canvas, true);
    camera.panningSensibility = 1;
    const light = new HemisphericLight("", new Vector3(0, 1, 0), scene);
    light.specular.set(0, 0, 0);
    scene.activeCamera = camera;

    const material = new StandardMaterial("", scene);
    material.diffuseColor = new Color3(0, 1, 1);

    let map: GenMap = new GenMap();
    let renderState = { isBig: false };

    const follow = new TransformNode("follow", scene);
    const fixedParent = new TransformNode("fixedParent", scene);

    // Resize observer
    let lastWidth = 0,
      lastHeight = 0;
    const resizeObserver = new ResizeObserver(() => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width !== lastWidth || height !== lastHeight) {
        engine.resize();
        lastWidth = width;
        lastHeight = height;
      }
    });

    resizeObserver.observe(container);

    engine.runRenderLoop(() => {
      if (!renderState.isBig) {
        follow.position.x = followPosition.x;
        follow.position.y = followPosition.y;
        follow.position.z = followPosition.z;

        fixedParent.position.x = followPosition.x;
        fixedParent.position.y = followPosition.y;
        fixedParent.position.z = followPosition.z;

        const direction = camera.getDirection(new Vector3(0, 0, 1)).normalize();
        const normalized = new Vector3(direction.x, 0, direction.z).normalize();
        const angle = Math.atan2(normalized.x, normalized.z);
        const rotationQuaternion = Quaternion.RotationAxis(Axis.Y, angle);

        follow.rotationQuaternion = rotationQuaternion;
        follow.position.y = 10;
        fixedParent.position.y = 10;
        camera.radius = 800;
        camera.position.x = follow.position.x;
        camera.position.z = follow.position.z;

        camera.setTarget(follow.position);
      }
      scene.render();
    });

    map.init(scene);

    const interval = new TickInterval(() => {
      map.updateTiles([
        dimension || 0,
        followPosition.x,
        followPosition.y,
        followPosition.z,
      ]);
    }, 500);
    interval.start();

    this._onDispose = () => {
      interval.stop();
      engine.dispose();
      container.remove();
    };
  }

  dispose() {
    if (this._onDispose) this.dispose();
    this._onDispose = null;
  }
}
