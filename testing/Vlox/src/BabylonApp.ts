import InitDVErenderer from "@divinevoxel/vlox-babylon/Init/Classic/InitDVEBRClassic";
import CreateDisplayIndex from "@divinevoxel/vlox-babylon/Init/CreateDisplayIndex";

import {
  Engine,
  HemisphericLight,
  Scene,
  Vector3,
  FreeCamera,
} from "@babylonjs/core";

import { RenderNodes } from "Classes";
import { DVEVoxelData } from "@dvetesting/vlox/Data/VoxelData";
import { Textures } from "@dvetesting/vlox/Data/TextureData";
import { StartRenderer } from "@divinevoxel/vlox/Init/StartRenderer";
import { CacheManager } from "@divinevoxel/vlox/Cache/CacheManager";
import { DebugGenMap } from "@divinevoxel/vlox-babylon/Debug/GenMap/DebugGenMap";
let ran = false;

import { BinaryObject } from "@amodx/binary";
import { Compressor } from "@amodx/core/Compression/Compression";
import { InitSkybox } from "@divinevoxel/vlox-babylon/Init/Skybox/InitSkybox";
import { Debug } from "./Debug/Debug";
import { TextureManager } from "@divinevoxel/vlox/Textures/TextureManager";
const downloadFile = async (
  name: string,
  data: ArrayBufferLike | string | HTMLImageElement,
  mimeType: string = "application/octet-stream"
): Promise<void> => {
  let blob: Blob;

  if (data instanceof HTMLImageElement) {
    const canvas = document.createElement("canvas");
    canvas.width = data.naturalWidth;
    canvas.height = data.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(data, 0, 0);

    blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Failed to create blob"))),
        mimeType,
        1.0
      );
    });
  } else {
    blob = new Blob([data as any], { type: mimeType });
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
export async function App() {
  const appContainer = document.createElement("div");
  appContainer.id = "render-canvas-container";
  const canvas = document.createElement("canvas");
  canvas.id = "render-canvas";

  appContainer.append(canvas);

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

  let antialias = false;
  const engine = new Engine(canvas, antialias, {
    alpha: true,
    premultipliedAlpha: false,
  });
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
  canvasResized.observe(canvas!);
  const scene = new Scene(engine);
  scene.clearColor.set(1, 1, 1, 0);
  const light = new HemisphericLight("", new Vector3(0, 0, 0), scene);
  light.specular.set(0, 0, 0);

  const urlParams = new URLSearchParams(
    new URL(window.location.href).searchParams
  );
  if (urlParams.has("read-compact-textures")) {
    TextureManager.registerTexture(Textures);
    const paths: string[] = [
      "assets/compacted/dve_voxel",
      "assets/compacted/dve_item",
    ];
    for (const path of paths) {
      const json = await (await fetch(`${path}.json`)).json();
      await TextureManager.readCompactedTexture( json, `${path}.png`);
    }
  }

  const renderer = await InitDVErenderer({
    textureTypes: [],
    substances: [],
    scene: scene,
    textureData: Textures,
  });

  if (urlParams.has("compact-textures")) {
    const compactedImages = await TextureManager.createCompactedTextures(
      "assets/textures",
      [16, 16]
    );
    for (const image of compactedImages) {
      await downloadFile(`${image.data.type}.png`, image.image, "image/png");
      await downloadFile(
        `${image.data.type}.json`,
        JSON.stringify(image.data),
        "application/json"
      );
    }
  }

  const DVER = await StartRenderer({
    renderer,
    worldWorker,
    mesherWorkers,
    generatorWorkers,
    voxels: DVEVoxelData,
    memoryAndCPU: {
      useSharedMemory: true,
    },
  });

  await CreateDisplayIndex(DVEVoxelData);

  const skybox = InitSkybox({
    renderer,
  });

  const camera = new FreeCamera("", new Vector3(-1, 64, -1), scene);

  camera.setTarget(new Vector3(8, 0, 8));

  camera.speed = 1;
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

  const map = new DebugGenMap(DVER);
  map.init(camera.globalPosition, Vector3.Zero(), 0);

  Debug(renderer);
  engine.runRenderLoop(() => {
    scene.render();
  });

  DVER.threads.world.runTask("start-world", []);

  return appContainer;
}
