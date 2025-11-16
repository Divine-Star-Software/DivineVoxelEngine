/* import InitDVErenderer from "@divinevoxel/vlox-quantum/Init/InitDVEQuantum";
import { DVEVoxelData } from "@dvetesting/vlox/Data/VoxelData";
import { Textures } from "@dvetesting/vlox/Data/TextureData";
import { SceneTool } from "@divinevoxel/vlox-quantum/Tools/SceneTool";

import { StartRenderer } from "@divinevoxel/vlox/Init/StartRenderer";
import { Engine } from "@divinevoxel/vlox-quantum/Renderer/Engine/Engine";
import { Scene } from "@divinevoxel/vlox-quantum/Renderer/Scene/Scene";
import { PerspectiveCamera } from "@divinevoxel/vlox-quantum/Renderer/Camera/PerspectiveCamera";

import { GUI } from "dat.gui";
export async function App() {
  const appContainer = document.createElement("div");
  appContainer.className = "render-canvas-container";
  const canvas = document.createElement("canvas");
  canvas.id = "render-canvas";

  const halfThreads = Math.ceil((navigator.hardwareConcurrency - 3) / 2);
  const worldWorker = new Worker(
    new URL("./Contexts/World/", import.meta.url),
    {
      type: "module",
    }
  );

  const mesherWorkers: Worker[] = [];
  for (let i = 0; i < halfThreads; i++) {
    mesherWorkers.push(
      new Worker(new URL("./Contexts/Mesher/", import.meta.url), {
        type: "module",
      })
    );
  }
  const generatorWorkers: Worker[] = [];
  for (let i = 0; i < halfThreads; i++) {
    generatorWorkers.push(
      new Worker(new URL("./Contexts/Generator", import.meta.url), {
        type: "module",
      })
    );
  }

  const engine = new Engine(canvas);
  await engine.init();
  const scene = new Scene(engine, 300);
  await scene.init();

  const camera = new PerspectiveCamera(scene);
  scene.setCamera(camera);
  engine.runRenderLoop(() => {
    scene.render();
  });
  const renderer = await InitDVErenderer({
    textureTypes: [],
    substances: [],
    scene,
    textureData: Textures,
  });

  const DVER = await StartRenderer({
    rendererSettings: { mode: "webgpu" },
    renderer,
    worldWorker,
    mesherWorkers,
    generatorWorkers,
    voxels: DVEVoxelData,
  });

  const gui = new GUI();
  const cameraSettings = gui.addFolder("Camera Settings");
  cameraSettings.add(camera.struct, "fov", 0, 200);
  cameraSettings.add(camera.struct, "near", camera.struct.near, 1);
  cameraSettings.add(camera.struct, "far", 0, 100000);
  cameraSettings.open();
  const cameraPositionFolder = gui.addFolder("Camera Position");
  cameraPositionFolder.add(camera.position, "x", -100, 100, 0.5);
  cameraPositionFolder.add(camera.position, "y", -100, 100, 0.5);
  cameraPositionFolder.add(camera.position, "z", -100, 100, 0.5);
  cameraPositionFolder.open();
  const cameraTargetFolder = gui.addFolder("Camera Target");
  cameraTargetFolder.add(camera.target, "x", -100, 100, 0.5);
  cameraTargetFolder.add(camera.target, "y", -100, 100, 0.5);
  cameraTargetFolder.add(camera.target, "z", -100, 100, 0.5);
  const sunFolder = gui.addFolder("Sun");
  sunFolder.add(scene.voxelScene.sunPosition, "x", -200, 200, 0.5);
  sunFolder.add(scene.voxelScene.sunPosition, "y", -100, 100, 0.5);
  sunFolder.add(scene.voxelScene.sunPosition, "z", -200, 200, 0.5);
  sunFolder.open();
  const sceneTool = new SceneTool();
  sceneTool.fog.setDensity(0.00001);
  sceneTool.fog.setColor(1, 1, 1);
  sceneTool.options.doSun(true);
  sceneTool.options.doAO(true);
  sceneTool.options.doRGB(true);
  sceneTool.levels.setSun(0.8);
  sceneTool.levels.setBase(0.01);

  DVER.threads.world.runTask("start-world", []);

  return appContainer;
}
 */