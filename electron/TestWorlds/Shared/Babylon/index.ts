import { CreateGUI } from "../GUI/index.js";
import { PositionMatrix } from "../../../out/Meta/Util.types";
import { DivineVoxelEngineRender } from "../../../out/Render/DivineVoxelEngineRender.js";

export const SetUpEngine = (canvas: HTMLCanvasElement) => {
 const engine = new BABYLON.Engine(canvas, false, {});
 engine.doNotHandleContextLost = true;
 engine.enableOfflineSupport = false;
 engine.setSize(1920, 1080);
 return engine;
};

export const SetUpCanvas = () => {
 const canvas = document.createElement("canvas");
 canvas.id = "renderCanvas";
 document.body.append(canvas);

 window.addEventListener("click", function () {
  canvas.requestPointerLock();
 });
 window.addEventListener("keydown", (event) => {
  if (event.key == "Escape") {
   document.exitPointerLock();
  }
 });

 return canvas;
};

export const SetUpDefaultScene = (engine: BABYLON.Engine) => {
 const scene = new BABYLON.Scene(engine);
 const assumedFramesPerSecond = 60;
 const earthGravity = -9.81;
 scene.gravity = new BABYLON.Vector3(
  0,
  earthGravity / assumedFramesPerSecond,
  0
 );
 scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
 scene.fogDensity = 0.008;
 scene.fogColor = new BABYLON.Color3(99 / 255, 157 / 255, 216 / 255);
 scene.fogEnabled = true;
 scene.autoClear = false;
 scene.autoClearDepthAndStencil = false;

// scene.debugLayer.show();

 return scene;
};

export const SetUpDarkScene = (engine: BABYLON.Engine) => {
 const scene = new BABYLON.Scene(engine);
 const assumedFramesPerSecond = 60;
 const earthGravity = -9.81;
 scene.gravity = new BABYLON.Vector3(
  0,
  earthGravity / assumedFramesPerSecond,
  0
 );


 scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
 scene.fogDensity = 0.008;
 scene.fogColor = new BABYLON.Color3(1 / 255, 1 / 255, 1 / 255);
 scene.fogEnabled = false;
 scene.autoClear = false;
 scene.autoClearDepthAndStencil = false;

 return scene;
};

export const SetUpDefaultCamera = (
 scene: BABYLON.Scene,
 canvas: HTMLCanvasElement,
 startPosition: PositionMatrix = { x: 0, y: 30, z: -2 },
 startTarget: PositionMatrix = { x: 0, y: 0, z: 0 }
) => {
 const target = new BABYLON.Vector3(
  startTarget.x,
  startTarget.y,
  startTarget.z
 );
 const camera = new BABYLON.FreeCamera("main", BABYLON.Vector3.Zero(), scene);

 camera.fov = 1.5;
 camera.minZ = 0.01;
 camera.maxZ = 500;
 camera.angularSensibility = 4000;

 camera.position.x = startPosition.x;
 camera.position.y = startPosition.y;
 camera.position.z = startPosition.z;
 camera.setTarget(target);

 scene.activeCamera = camera;
 camera.attachControl(canvas, true);
 return camera;
};

export const SetUpDefaultSkybox = (scene: BABYLON.Scene) => {
 const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 400.0 }, scene);
 const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
 skyboxMaterial.backFaceCulling = false;
 skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
 skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
 skybox.material = skyboxMaterial;
 skybox.infiniteDistance = true;
 return skybox;
};

export const CreateWorldAxis = (scene: BABYLON.Scene, y: number) => {
 //@ts-ignore
 const axes = new BABYLON.AxesViewer(scene, 5);
 axes.xAxis.position.y = y;
 axes.yAxis.position.y = y;
 axes.zAxis.position.y = y;
};

export const runRenderLoop = (
 engine: BABYLON.Engine,
 scene: BABYLON.Scene,
 watchPositon: BABYLON.FreeCamera | BABYLON.Mesh,
 DVER?: DivineVoxelEngineRender
) => {
 const runGui = CreateGUI(DVER);
 engine.runRenderLoop(() => {
  scene.render();
  runGui(engine, watchPositon);
 });
};
