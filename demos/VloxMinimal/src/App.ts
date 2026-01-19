import InitDVErenderer from "@divinevoxel/vlox-babylon/Init/Classic/InitDVEBRClassic";

import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";

import { StartRenderer } from "@divinevoxel/vlox/Init/StartRenderer";

import { InitSkybox } from "@divinevoxel/vlox-babylon/Init/Skybox/InitSkybox";
import { Tools } from "@babylonjs/core/Misc/tools";
export default async function Demo() {
  const appContainer = document.createElement("div");
  appContainer.id = "render-canvas-container";
  const canvas = document.createElement("canvas");
  canvas.id = "render-canvas";

  appContainer.append(canvas);

  const halfThreads = Math.ceil((navigator.hardwareConcurrency - 3) / 2);
  const worldWorker = new Worker(
    new URL("./Contexts/World/", import.meta.url),
    {
      type: "module",
    },
  );

  const mesherWorkers: Worker[] = [];
  for (let i = 0; i < halfThreads; i++) {
    mesherWorkers.push(
      new Worker(new URL("./Contexts/Mesher/", import.meta.url), {
        type: "module",
      }),
    );
  }
  const generatorWorkers: Worker[] = [];
  for (let i = 0; i < halfThreads; i++) {
    generatorWorkers.push(
      new Worker(new URL("./Contexts/Generator", import.meta.url), {
        type: "module",
      }),
    );
  }

  let antialias = false;
  const engine = new Engine(canvas, antialias, {
    alpha: true,
    premultipliedAlpha: false,
  });
  engine.doNotHandleContextLost = true;
  engine.enableOfflineSupport = false;

  engine.setSize(window.innerWidth, window.innerHeight);
  let dirty = false;
  window.addEventListener("resize", function () {
    engine.resize();
    dirty = true;
  });

  const canvasResized = new ResizeObserver(() => {
    engine.resize();
    dirty = true;
  });
  canvasResized.observe(canvas!);
  const scene = new Scene(engine);
  scene.clearColor.set(1, 1, 1, 0);
  const light = new HemisphericLight("", new Vector3(0, 0, 0), scene);
  light.specular.set(0, 0, 0);

  const renderer = await InitDVErenderer({
    textureTypes: [],
    substances: [],
    scene: scene,
    textureData: [
      {
        id: "dve_box",
        base64:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWElEQVQ4jV2TPU7EQAyFnVHEIqBhQQIKFAp+WnKH7bbiJpyMjo47gOj4KYgoAAmWZkGEgkHfLG/wxFI0jv38/MZOqsnpdXzr7m2j2TdO2efsxlbGR0Vcvo8FHMBK4GO77TSdnlQmLFbLUaEHqevj5XmRm78/ZD8rQC7nTzWy5aWYCcmTI06MZ219759AxRhnczyx15cud/fdIJFa5YKAso+nuzwDuofYL4CxT51FQo73RMAdJXl158AU4ypenYgg13WCugnQXV1kuV/fVTmw2Nt4+7DYUgCoQQ5NxUj1RNoQTcPmVpOSEGm6dFKhDJ/us+fbQmkgQAHTRwWEkqeuWitYuoqYfNWenEXtn2JAkqf4UI2/WhoiIFRo/1KAQepNKsGjrPYfCdfwtlhhLIdYjVKjpp2mVScFAGBlMBoOBf4/8YPlEa7W+uZ/W6BQX5lAdOV9+Mubmf0CC34HxeK/tr0AAAAASUVORK5CYII=",
      },
    ],
  });

  renderer.sceneOptions.levels.sunLevel = 1;

  const DVER = await StartRenderer({
    renderer,
    worldWorker,
    mesherWorkers,
    generatorWorkers,
    voxels: [
      {
        id: "dve_box",
        properties: {
          dve_model_data: {
            id: "dve_simple_cube",
            modSchema: [],
            modRelationSchema: [],
            inputs: {
              "*": {
                texture: "dve_box",
              },
            },
          },
        },
      },
    ],
    memoryAndCPU: {
      useSharedMemory: false,
    },
  });

  InitSkybox({
    renderer,
  });

  const camera = new FreeCamera("", new Vector3(-1, 64, -1), scene);

  camera.setTarget(new Vector3(8, 0, 8));

  camera.speed = 2;
  camera.maxZ = 500;
  camera.minZ = 0.01;
  camera.fov = Tools.ToRadians(70);
  camera.attachControl(canvas, true);

  scene.activeCamera = camera;
  scene.collisionsEnabled = false;
  camera.inertia = 0.2;

  engine.runRenderLoop(() => {
    scene.render();
  });

  DVER.threads.world.runTask("start-world", []);

  return appContainer;
}
