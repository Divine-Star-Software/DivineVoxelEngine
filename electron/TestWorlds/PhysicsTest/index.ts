import {
 SetUpEngine,
 SetUpCanvas,
 SetUpDefaultCamera,
 SetUpDefaultSkybox,
 CreateWorldAxis,
 runRenderLoop,
 SetUpDefaultScene,
} from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers, SyncWithGraphicsSettings } from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";
import { DVEM } from "../../out/Libs/Math/DivineVoxelEngineMath.js";
import {
 PlayerStatesIndexes,
 PlayerStatesValues,
} from "./Shared/Player.data.js";

RegisterTexutres(DVER);

let ready = false;
let playerPostionArray = new Float32Array();
DVER.nexusComm.listenForMessage("connect-player-data", (data) => {
 playerPostionArray = new Float32Array(data[1]);
 ready = true;
});

let hitbox: any = false;

const cameras: any = {
 freeCam: null,
 playerCam: null,
};

const workers = SetUpWorkers(
 import.meta.url,
 "./World/world.js",
 "../Shared/Constructor/constructor.js",
 "./Nexus/nexus.js"
);

await DVER.$INIT({
 worldWorker: workers.worldWorker,
 constructorWorker: workers.constructorWorkers,
 nexusWorker: workers.nexusWorker,
 nexus: {
  enabled: true,
  autoSyncChunks: true,
  autoSyncVoxelPalette: true,
 },
 lighting: {
  doAO: true,
  doRGBLight: false,
  doSunLight: false,
  autoRGBLight: false,
  autoSunLight: false,
 },
 materials: {
  doAO: true,
  doRGBLight: false,
  doSunLight: false,
  disableFloraShaderEffects: false,
  disableFluidShaderEffects: false,
 },
 world: {
  minX: -Infinity,
  maxX: Infinity,
  minZ: -Infinity,
  maxZ: Infinity,
  minY: 0,
  maxY: 128,
 },
});
SyncWithGraphicsSettings(DVER);
const init = async () => {
 const canvas = SetUpCanvas();
 const engine = SetUpEngine(canvas);
 const scene = SetUpDefaultScene(engine);
 const camera = SetUpDefaultCamera(scene, canvas);
 cameras.freeCam = camera;
 const skybox = SetUpDefaultSkybox(scene);
 skybox.material = DVER.renderManager.createSkyBoxMaterial(scene);

 // CreateWorldAxis(scene, 10);

 await DVER.$SCENEINIT({ scene: scene });
 DVER.renderManager.setBaseLevel(1);

 //@ts-ignore
 runRenderLoop(engine, scene, camera, DVER);
 const hemLight = new BABYLON.HemisphericLight(
  "",
  new BABYLON.Vector3(0, 1, 0),
  scene
 );
 setUpOptions(scene);
 physicsTest(scene, canvas);
 // checkPointTest(scene);
};

const addNewGuiButton = (text: string, onClick: Function) => {
 const parent = document.getElementById("gui-buttons");
 if (!parent) return;
 const button = document.createElement("button");
 button.innerText = text;
 button.className = "gui-button";
 button.addEventListener("click", (event) => {
  onClick(event);
 });
 parent.append(button);
};

const setUpOptions = (scene: BABYLON.Scene) => {
 addNewGuiButton("Main Camera", () => {
  scene.activeCamera = cameras.freeCam;
  hitbox.setEnabled(true);
 });
 addNewGuiButton("Player Cameera", () => {
  scene.activeCamera = cameras.playerCam;
  hitbox.setEnabled(false);
 });
};

const physicsTest = async (scene: BABYLON.Scene, canvas: HTMLCanvasElement) => {
 const posVector3 = DVEM.getVector3(0, 0.5, 0);
 const playerCamera = SetUpDefaultCamera(
  scene,
  canvas,
  posVector3,
  { x: 0, y: 0, z: 0 },
  false,
  false,
  "playercam"
 );

 playerCamera.attachControl(canvas, true);
 playerCamera.inputs.removeByType("FreeCameraKeyboardMoveInput");

 const playerHitBox = BABYLON.MeshBuilder.CreateBox(
  "player-hitbox",
  { width: 0.8, height: 1.8, depth: 0.8 },
  scene
 );
 hitbox = playerHitBox;

 cameras.playerCam = playerCamera;
 const camNode = new BABYLON.TransformNode("camnode", scene);
 playerCamera.parent = camNode;
 camNode.parent = playerHitBox;

 await DVER.UTIL.createPromiseCheck({
  check: () => ready,
  checkInterval: 1,
 });

 const playerDirectionSAB = new SharedArrayBuffer(4 * 6);
 const playerStatesSAB = new SharedArrayBuffer(PlayerStatesIndexes.total);
 const playerDirection = new Float32Array(playerDirectionSAB);
 const playerStates = new Uint8Array(playerStatesSAB);

 playerStates[PlayerStatesIndexes.movement] = PlayerStatesValues.still;
 playerStates[PlayerStatesIndexes.secondaryMovment] =
  PlayerStatesValues.secondaryStill;

 window.addEventListener("keydown", (event) => {
  if (event.key == "w" || event.key == "W") {
   playerStates[PlayerStatesIndexes.movement] =
    PlayerStatesValues.walkingForward;
  }
  if (event.key == "s" || event.key == "S") {
   playerStates[PlayerStatesIndexes.movement] =
    PlayerStatesValues.walkingBackward;
  }

  if (event.key == "a" || event.key == "A") {
   playerStates[PlayerStatesIndexes.secondaryMovment] =
    PlayerStatesValues.walkingLeft;
  }
  if (event.key == "d" || event.key == "D") {
   playerStates[PlayerStatesIndexes.secondaryMovment] =
    PlayerStatesValues.walkingRight;
  }

  if (event.key == " ") {
   playerStates[PlayerStatesIndexes.jumping] = 1;
  }
  if (event.key == "Control") {
   playerStates[PlayerStatesIndexes.running] = 1;
  }
 });
 window.addEventListener("keyup", (event) => {
  if (
   event.key == "w" ||
   event.key == "W" ||
   event.key == "s" ||
   event.key == "S"
  ) {
   playerStates[PlayerStatesIndexes.movement] = PlayerStatesValues.still;
  }

  if (
   event.key == "a" ||
   event.key == "A" ||
   event.key == "d" ||
   event.key == "D"
  ) {
   playerStates[PlayerStatesIndexes.secondaryMovment] =
    PlayerStatesValues.secondaryStill;
  }
  if (event.key == " ") {
   playerStates[PlayerStatesIndexes.jumping] = 0;
  }
  if (event.key == "Control") {
   playerStates[PlayerStatesIndexes.running] = 0;
  }
 });

 DVER.nexusComm.sendMessage("connect-player-states", [
  playerDirectionSAB,
  playerStatesSAB,
 ]);

 const direction = new BABYLON.Vector3(0, 0, 0);
 const sideDirection = new BABYLON.Vector3(0, 0, 0);
 const xzd = new BABYLON.Vector3(0, 0, 0);
 const cameraRotation = new BABYLON.Vector3(0, 0, 0);
 scene.registerBeforeRender(() => {
  let et = performance.now();

  playerHitBox.position.x = playerPostionArray[0];
  playerHitBox.position.y = playerPostionArray[1];
  playerHitBox.position.z = playerPostionArray[2];

  const camera = scene.activeCamera;
  if (!camera) return;
  playerCamera.getDirectionToRef(BABYLON.Vector3.Forward(), direction);
  playerCamera.getDirectionToRef(BABYLON.Vector3.Left(), sideDirection);
  playerDirection[0] = direction.x;
  playerDirection[1] = direction.y;
  playerDirection[2] = direction.z;
  playerDirection[3] = sideDirection.x;
  playerDirection[4] = sideDirection.y;
  playerDirection[5] = sideDirection.z;
  xzd.x = direction.x;
  xzd.z = direction.z;
  xzd.normalize();
  if (
   playerStates[PlayerStatesIndexes.movement] ==
   PlayerStatesValues.walkingForward
  ) {
   let runFactor = 0.02 * playerStates[PlayerStatesIndexes.running];
   let factor = 0.008 + runFactor;
   let yd = Math.abs(direction.y) > 0.5 ? 0 : 1;
   cameraRotation.x =
    Math.cos(et / 100) * factor * Number(xzd.x.toFixed(1)) * yd;
   cameraRotation.z =
    Math.cos(et / 100) * factor * Number(xzd.z.toFixed(1)) * yd;
   cameraRotation.y = Math.abs(Math.sin(et / 100)) * factor;
  } else {
   cameraRotation.scaleInPlace(0.5);
  }
  camNode.rotation = BABYLON.Vector3.Lerp(
   cameraRotation,
   camNode.rotation,
   0.25
  );
 });
};

RunInit(init);
(window as any).DVER = DVER;
