import { useEffect, useRef, useState } from "react";
import InitDVErenderer from "@divinevoxel/vlox-babylon/Init/Classic/InitDVEBRClassic";
import CreateDisplayIndex from "@divinevoxel/vlox-babylon/Init/CreateDisplayIndex";

import {
  CreateSphere,
  Engine,
  HemisphericLight,
  Scene,
  Vector3,
  FreeCamera,
  AxesViewer,
} from "@babylonjs/core";
import { Textures } from "Data/TextureData";

import { RenderNodes } from "Classes";
import { DVEVoxelData } from "Data/VoxelData";
import { StartRenderer } from "@divinevoxel/vlox/Init/StartRenderer";
import { CacheManager } from "@divinevoxel/vlox/Cache/CacheManager";
import { DebugGenMap } from "@divinevoxel/vlox-babylon/Debug/GenMap/DebugGenMap";
let ran = false;

import { BinaryObject } from "@amodx/binary";
import { Compressor } from "@amodx/core/Compression/Compression";
import { InitSkybox } from "@divinevoxel/vlox-babylon/Init/Skybox/InitSkybox";
import { Debug } from "./Debug/Debug";
export function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (ran) return;
    if (!canvasRef.current) return;
    ran = true;

    (async () => {
      //  CacheManager.cacheLoadEnabled = true;
      //   CacheManager.cacheStoreEnabled = true;

      if (CacheManager.cacheLoadEnabled) {
        BinaryObject.setUseSharedMemory(true);
        const cachedData = BinaryObject.bufferToObject(
          (
            await Compressor.core.decompressArrayBuffer(
              await (await fetch("/dve-cache.bin")).arrayBuffer()
            )
          ).buffer as any
        );
        BinaryObject.setUseSharedMemory(false);

        CacheManager.cachedData = cachedData as any;
      }
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
      const canvas = canvasRef.current;

      let antialias = false;
      const engine = new Engine(canvas, antialias, {
        alpha: true,
        premultipliedAlpha: false,
      });
      engine.doNotHandleContextLost = true;
      engine.enableOfflineSupport = false;

      const gl = engine._gl;

      if (!gl) {
        console.error("WebGL 2 not supported!");
      }

      const multiDraw = gl.getExtension("WEBGL_multi_draw");

      if (!multiDraw) {
        console.error("WEBGL_multi_draw extension is not available!");
      } else {
        console.log("WEBGL_multi_draw is enabled!");
      }

      console.warn(multiDraw);

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
      canvasResized.observe(canvas!);
      const scene = new Scene(engine);
      scene.clearColor.set(1,1,1,0);
      const light = new HemisphericLight("", new Vector3(0, 0, 0), scene);
      light.specular.set(0, 0, 0);

      const renderer = await InitDVErenderer({
        textureTypes: [],
        substances: [],
        scene: scene,
        textureData: Textures,
      });

      const DVER = await StartRenderer({
        /*         rendererSettings: {
          cpuBound: true,
        }, */
        renderer,
        worldWorker,
        mesherWorkers,
        generatorWorkers,
        voxels: DVEVoxelData,
      });

      await CreateDisplayIndex(DVEVoxelData);

      /* 
      const sceneTool = new SceneTool();
      sceneTool.fog.setDensity(0.00001);
      sceneTool.fog.setColor(1, 1, 1);
      sceneTool.options.doSun(true);
      sceneTool.options.doAO(true);
      sceneTool.options.doRGB(true);
      sceneTool.levels.setSun(0.8);
      sceneTool.levels.setBase(0.01); */

      const skybox = InitSkybox({
        renderer,
      });

      /*     const viwer = new AxesViewer(scene);
      viwer.xAxis.position.z -= 2;
      viwer.yAxis.position.z -= 2;
      viwer.zAxis.position.z -= 2;
 */
      const camera = new FreeCamera("", new Vector3(-1, 64, -1), scene);

      camera.setTarget(new Vector3(8, 0, 8));

      camera.speed = 10;
      camera.maxZ = 500;
      camera.minZ = 0.01;
      camera.fov = 1.8;
      camera.attachControl(canvas, true);

      scene.activeCamera = camera;
      scene.collisionsEnabled = false;
      camera.inertia = 0.2;
      nodes.camera = camera as any;
      //  nodes.camera = camera;
      nodes.scene = scene;
      nodes.canvas = canvas!;
      nodes.engine = engine;

      const map = new DebugGenMap();
      map.init(camera.globalPosition, Vector3.Zero(), 0);

      Debug(renderer);
      engine.runRenderLoop(() => {
        scene.render();
      });

      /*      setTimeout(() => {
        Inspector.Show(scene, {});
      }, 1_000); */

      //  await InitRenderPlayer(DVER, nodes);
      DVER.threads.world.runTask("start-world", []);

      /* 

      const cursor = new WorldCursor();
      cursor.setFocalPoint(0, 0, 0, 0);
      setInterval(() => {
        const particles = new VoxelExplodeParticles(scene, cursor);
        particles.explodeAt(0, 10, 0, "dve_dream_stone");
      }, 2_000); */
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
