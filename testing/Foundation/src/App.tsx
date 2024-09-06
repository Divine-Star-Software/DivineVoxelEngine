import { useEffect, useRef, useState } from "react";
import InitDVErenderer from "@divinevoxel/babylon-renderer/Defaults/Foundation/Classic/InitDVEBRClassic";
import { DVEFBRCore } from "@divinevoxel/babylon-renderer/Defaults/Foundation/DVEFBRCore";
import {
  CreateSphere,
  Engine,
  HemisphericLight,
  Scene,
  Vector3,
  FreeCamera,
  AxesViewer
} from "@babylonjs/core";
import { DivineVoxelEngineRender } from "@divinevoxel/core/Contexts/Render";
import { Textures } from "Data/TextureData";
import { SceneTool } from "@divinevoxel/babylon-renderer/Defaults/Foundation/Tools/SceneTool";
import { RenderNodes } from "Classes";
import { InitVoxelModels } from "@divinevoxel/foundation/Default/VoxelModels/InitVoxelModels";
import { DVEVoxelData } from "Data/VoxelData";
let ran = false;

export function App() {
  const [gameReady, setGameReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    (async () => {
      if (ran) return;
      if (!canvasRef.current) return;
      ran = true;

      const worldWorker = new Worker(
        new URL("./Contexts/World/", import.meta.url),
        {
          type: "module",
        }
      );

      const constructorWorkers: Worker[] = [];
      for (let i = 0; i < navigator.hardwareConcurrency - 1; i++) {
        constructorWorkers.push(
          new Worker(new URL("./Contexts/Constructor/", import.meta.url), {
            type: "module",
          })
        );
      }

      const canvas = canvasRef.current;
      const DVER = new DivineVoxelEngineRender();
      let antialias = false;
      const engine = new Engine(canvas, antialias);
      engine.doNotHandleContextLost = true;
      engine.enableOfflineSupport = false;

      const nodes = new RenderNodes();
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
      canvasResized.observe(canvas);
      const scene = new Scene(engine);
      scene.clearColor.setAll(0);
      const light = new HemisphericLight("", new Vector3(0, 0, 0), scene);

      light.specular.set(0, 0, 0);

      console.log("1");
      const renderer = await InitDVErenderer({
        textureTypes: [],
        substances: [],
        scene: scene,
        textureData: Textures,
      });

      const core = new DVEFBRCore({
        renderer,
      });

      await DVER.init({
        core,
        renderer,
        worldWorker,
        constructorWorkers,
      });

/*       const skybox = CreateSphere("skyBox", { diameter: 400.0 }, scene);
      skybox.infiniteDistance = true;
      const skyboxMat = renderer.nodes.materials.get("#dve_skybox");
      if (skyboxMat) {
        skybox.material = skyboxMat._material;
        skybox.material!.backFaceCulling = false;
      } */
      const sceneTool = new SceneTool();
      sceneTool.fog.setDensity(0.00001);
      sceneTool.fog.setColor(1, 1, 1);
      sceneTool.options.doSun(true);
      sceneTool.options.doAO(true);
      sceneTool.options.doRGB(true);
      sceneTool.levels.setSun(0);
      sceneTool.levels.setBase(0.9);

      const viwer = new AxesViewer(scene)

      const camera = new FreeCamera("", new Vector3(0, 10, 0));

      camera.setTarget(new Vector3(0, 0, 0));
      InitVoxelModels({
        constructors: DVER.threads.construcotrs,
        voxels: DVEVoxelData,
      });
      camera.speed = 10;
      camera.maxZ = 1000;
      camera.fov = 1.8;
      camera.attachControl(canvas, true);

      scene.activeCamera = camera;
      scene.collisionsEnabled = false;
      camera.inertia = 0.2;
      nodes.camera = camera as any;
      //  nodes.camera = camera;
      nodes.scene = scene;
      nodes.canvas = canvas;
      nodes.engine = engine;
      nodes.core = core;
      nodes.sceneTool = sceneTool;

      engine.runRenderLoop(() => {
        scene.render();
      });

      setGameReady(true);

      /*    setTimeout(() => {
        Inspector.Show(scene, {});
      }, 1_000);
 */
      //  await InitRenderPlayer(DVER, nodes);

      DVER.threads.world.runTasks("start-world", []);
      console.error("GOOD TO GO ");
    })();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <canvas id="render-canvas" ref={canvasRef}></canvas>
    </div>
  );
}
