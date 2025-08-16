import { NCS, Node } from "@amodx/ncs";
import { ToolPanelComponent } from "@dvegames/vlox-tools/ToolPanel.component";
import { BabylonContext } from "@dvegames/vlox/Babylon/Babylon.context";
import { RendererContext } from "@dvegames/vlox/Contexts/Renderer.context";
import { DivineVoxelEngineRender } from "@divinevoxel/vlox/Contexts/Render";
import InitDVErenderer from "@divinevoxel/vlox-babylon/Init/Classic/InitDVEBRClassic";
import { Engine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { StartRenderer } from "@divinevoxel/vlox/Init/StartRenderer";
import CreateDisplayIndex from "@divinevoxel/vlox-babylon/Init/CreateDisplayIndex";
import { InitSkybox } from "@divinevoxel/vlox-babylon/Init/Skybox/InitSkybox";
import { GUI } from "dat.gui";
//tools
import InitPlayerTool from "@dvegames/vlox-tools/Tools/Player";
import InitControlsTool from "@dvegames/vlox-tools/Tools/Controls";
import InitBuilderTool from "@dvegames/vlox-tools/Tools/Builder";
import InitTemplatesTool from "@dvegames/vlox-tools/Tools/Templates";
import InitArchiverTool from "@dvegames/vlox-tools/Tools/Archive";
import InitGuidesTool from "@dvegames/vlox-tools/Tools/Guides";
import InitWorldGenTool from "@dvegames/vlox-tools/Tools/WorldGen";
import InitSceneTool from "@dvegames/vlox-tools/Tools/Scene";
import InitProceduralGraphs from "@dvegames/vlox-tools/Tools/ProceduralGraphs";
import { DebugGenMap } from "@divinevoxel/vlox-babylon/Debug/GenMap/DebugGenMap";

import { DVEVoxelData } from "@dvetesting/vlox/Data/VoxelData";
import { Textures } from "@dvetesting/vlox/Data/TextureData";
import "./index.css";

import "@babylonjs/core/Meshes/thinInstanceMesh";
import { Tools } from "@babylonjs/core/Misc/tools";
async function InitBuilder() {
  const canvas = document.getElementById("render-canvas")! as HTMLCanvasElement;
/*   const worldWorker = new Worker(
    new URL("./Contexts/World/", import.meta.url),
    {
      type: "module",
    }
  );

  const nexusWorker = new Worker(new URL("./Contexts/Nexus", import.meta.url), {
    type: "module",
  });
  const mesherWorkers: Worker[] = [];
  const halfThreads = Math.ceil((navigator.hardwareConcurrency - 3) / 2);

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
      new Worker(new URL("./Contexts/Generator/", import.meta.url), {
        type: "module",
      })
    );
  }
 */
  let antialias = false;
  const engine = new Engine(canvas, antialias);
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
  canvasResized.observe(canvas);
  const scene = new Scene(engine);
  scene.preventDefaultOnPointerDown = false;
  scene.preventDefaultOnPointerUp = false;
  const light = new HemisphericLight("", new Vector3(0, 0, 0), scene);

  light.specular.set(0, 0, 0);

  const initTimeT = performance.now();
/*   const renderer = await InitDVErenderer({
    textureTypes: [],
    substances: [],
    scene: scene,
    textureData: Textures,
  });

  const DVER = await StartRenderer({
    renderer,
    nexusWorker,
    worldWorker,
    mesherWorkers,
    generatorWorkers,
    voxels: DVEVoxelData,
  });

  await CreateDisplayIndex(DVEVoxelData);

  const skybox = InitSkybox({ renderer });
 */
  const camera = new FreeCamera("", new Vector3(0, 4, 0), scene);

  camera.position.y = 4;
  camera.speed = 10;
  camera.minZ = 0.1;
  camera.maxZ = 500;
  camera.fov = Tools.ToRadians(70);

  camera.attachControl(canvas, true);

  scene.activeCamera = camera;
  scene.collisionsEnabled = false;
  camera.inertia = 0.2;

  engine.runRenderLoop(() => {
    scene.render();
  });
  const graph = NCS.createGraph();
/*   RendererContext.set(graph.root, null, null, {
    dve: DivineVoxelEngineRender.instance,
  });
  BabylonContext.set(graph.root, null, null, {
    renderer,
    scene: scene,
    engine: scene.getEngine() as any,
    utilLayer: null as any,
  });
  InitControlsTool(graph);
  InitBuilderTool(graph);
  InitTemplatesTool(graph);
  // InitMapTool(graph);
  InitPlayerTool(graph);
  InitArchiverTool(graph);
  InitGuidesTool(graph);
  InitWorldGenTool(graph);
  InitSceneTool(graph); */

  InitProceduralGraphs(graph);
  graph.addNode(Node({}, [ToolPanelComponent()]));

  //const map = new DebugGenMap(DVER);
 // map.init(camera.globalPosition, Vector3.Zero(), 0);

  scene.registerBeforeRender(() => {
    graph.update();
  });

 

}

document.addEventListener("DOMContentLoaded", InitBuilder);
