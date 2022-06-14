import {
 SetUpEngine,
 SetUpCanvas,
 SetUpDarkScene,
 SetUpDefaultCamera,
 SetUpDefaultSkybox,
 CreateWorldAxis,
 runRenderLoop,
 SetUpDefaultScene,
} from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers } from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";
import { DVEM } from "../../out/Math/DivineVoxelEngineMath.js";

RegisterTexutres(DVER);

const workers = SetUpWorkers(
 import.meta.url,
 "./World/world.js",
 "../Shared/Constructor/constructor.js"
);

await DVER.$INIT({
 worldWorker: workers.worldWorker,
 constructorWorker: workers.constructorWorkers,
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
  voxelPaletteMode: "global",
  minX: -Infinity,
  maxX: Infinity,
  minZ: -Infinity,
  maxZ: Infinity,
  minY: 0,
  maxY: 128,
 },
});

const init = async () => {
 const canvas = SetUpCanvas();
 const engine = SetUpEngine(canvas);
 const scene = SetUpDarkScene(engine);
 const camera = SetUpDefaultCamera(scene, canvas);
 SetUpDefaultSkybox(scene);
 CreateWorldAxis(scene, 10);

 await DVER.$SCENEINIT({ scene: scene });
 DVER.renderManager.setBaseLevel(1);

 runRenderLoop(engine, scene, camera, DVER);
 const hemLight = new BABYLON.HemisphericLight(
  "",
  new BABYLON.Vector3(0, 1, 0),
  scene
 );
 physicsTest(scene);
 // checkPointTest(scene);
};

const physicsTest = async (scene: BABYLON.Scene) => {
 const playerHitBox = BABYLON.MeshBuilder.CreateBox(
  "player-hitbox",
  { width: 0.8, height: 2, depth: 0.8 },
  scene
 );

 const ready = { ready: false };

 let playerPostionArray = new Float32Array();

 DVER.worldComm.listenForMessage("connect-player-data", (data) => {
  playerPostionArray = new Float32Array(data[1]);
  ready.ready = true;
 });

 await DVER.UTIL.createPromiseCheck({
  check: () => ready.ready,
  checkInterval: 1,
 });

 setInterval(() => {
    
  playerHitBox.position.x = playerPostionArray[0] + .4;
  playerHitBox.position.y = playerPostionArray[1];
  playerHitBox.position.z = playerPostionArray[2] + .4;
 }, 10);
};

const checkPointTest = (scene: BABYLON.Scene) => {
 const simpleBoundingBox = DVEM.getSimpleBoundingBox(
  DVEM.getPositionVector3(0, 6.5, 0),
  { w: 0.8, h: 2, d: 0.8 }
 );

 const playerHitBox = BABYLON.MeshBuilder.CreateBox(
  "player-hitbox",
  { width: 0.8, height: 2, depth: 0.8 },
  scene
 );

 const voxelCheckBox = BABYLON.MeshBuilder.CreateBox(
  "player-hitbox",
  { width: 1, height: 1, depth: 1 },
  scene
 );

 const origionBox = BABYLON.MeshBuilder.CreateBox(
  "player-hitbox",
  { width: 1, height: 1, depth: 1 },
  scene
 );

 const origionVoxelBox = BABYLON.MeshBuilder.CreateBox(
  "player-hitbox",
  { width: 1, height: 1, depth: 1 },
  scene
 );

 const checkBox = BABYLON.MeshBuilder.CreateBox(
  "checkbox",
  { width: 1, height: 1, depth: 1 },
  scene
 );

 const checkBoxMat = new BABYLON.StandardMaterial("", scene);
 checkBoxMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
 const voxelCheckMat = new BABYLON.StandardMaterial("", scene);
 voxelCheckMat.diffuseColor = new BABYLON.Color3(0, 0, 1);
 const orgionMat = new BABYLON.StandardMaterial("", scene);
 orgionMat.diffuseColor = new BABYLON.Color3(1, 0, 1);
 const orgionVoxelMat = new BABYLON.StandardMaterial("", scene);
 orgionVoxelMat.diffuseColor = new BABYLON.Color3(1, 1, 1);

 checkBox.material = checkBoxMat;
 voxelCheckBox.material = voxelCheckMat;
 origionBox.material = orgionMat;
 origionVoxelBox.material = orgionVoxelMat;
 checkBox.visibility = 0.2;
 voxelCheckBox.visibility = 0.3;
 origionBox.visibility = 0.2;
 origionVoxelBox.visibility = 0.3;

 const origionBoxes: any[] = [];
 const origionCheckBoxes: any[] = [];
 const checkBoxes: any[] = [];
 const checkBoxesVxels: any[] = [];

 const boxOrogion = simpleBoundingBox.origion.getVector();
 playerHitBox.position.x = boxOrogion.x + 0.4;
 playerHitBox.position.y = boxOrogion.y + 0.5;
 playerHitBox.position.z = boxOrogion.z + 0.4;

 const origionPoints = simpleBoundingBox.getCurrentOrigionPoints();
 console.log(origionPoints);
 for (const point of origionPoints) {
  const newCheckBox = origionBox.clone();
  origionBoxes.push(newCheckBox);
  const newVoxelCheck = origionVoxelBox.clone();
  origionCheckBoxes.push(newVoxelCheck);
  newCheckBox.position.x = point[0] + 0.5;
  newCheckBox.position.y = point[1] + 0.5;
  newCheckBox.position.z = point[2] + 0.5;
  DVEM.convertToGridSpace(point);
  newVoxelCheck.position.x = point[0] + 0.5;
  newVoxelCheck.position.y = point[1] + 0.5;
  newVoxelCheck.position.z = point[2] + 0.5;
 }

 simpleBoundingBox.setCheckOrigion(
  boxOrogion.x + 10,
  boxOrogion.y,
  boxOrogion.z
 );

 const points = simpleBoundingBox.getVoxelCheckPoints();
 console.log(points);
 for (const point of points) {
  const newCheckBox = checkBox.clone();
  checkBoxes.push(newCheckBox);
  const newVoxelCheck = voxelCheckBox.clone();
  checkBoxesVxels.push(newVoxelCheck);
  newCheckBox.position.x = point[0] + 0.5;
  newCheckBox.position.y = point[1] + 0.5;
  newCheckBox.position.z = point[2] + 0.5;
  DVEM.convertToGridSpace(point);
  newVoxelCheck.position.x = point[0] + 0.5;
  newVoxelCheck.position.y = point[1] + 0.5;
  newVoxelCheck.position.z = point[2] + 0.5;
 }

 setInterval(() => {
  const boxOrogion = simpleBoundingBox.origion.getVector();
  playerHitBox.position.x = boxOrogion.x + 0.5;
  playerHitBox.position.y = boxOrogion.y + 0.5;
  playerHitBox.position.z = boxOrogion.z + 0.5;
  simpleBoundingBox.updateOrigion(
   boxOrogion.x - 0.01,
   boxOrogion.y,
   boxOrogion.z - 0.01
  );

  const points = simpleBoundingBox.getCurrentOrigionPoints();
  let k = 0;
  for (const point of points) {
   const newCheckBox = origionBoxes[k];
   newCheckBox.position.x = point[0] + 0.5;
   newCheckBox.position.y = point[1] + 0.5;
   newCheckBox.position.z = point[2] + 0.5;
   DVEM.convertToGridSpace(point);
   const newVoxelCheck = origionCheckBoxes[k];
   newVoxelCheck.position.x = point[0] + 0.5;
   newVoxelCheck.position.y = point[1] + 0.5;
   newVoxelCheck.position.z = point[2] + 0.5;
   k++;
  }
  simpleBoundingBox.setCheckOrigion(
   boxOrogion.x - 0.02,
   boxOrogion.y,
   boxOrogion.z - 0.02
  );

  const checkPoint = simpleBoundingBox.getVoxelCheckPoints();
  k = 0;
  for (const point of checkPoint) {
   const newCheckBox = checkBoxes[k];
   newCheckBox.position.x = point[0] + 0.5;
   newCheckBox.position.y = point[1] + 0.5;
   newCheckBox.position.z = point[2] + 0.5;
   DVEM.convertToGridSpace(point);
   const newVoxelCheck = checkBoxesVxels[k];
   newVoxelCheck.position.x = point[0] + 0.5;
   newVoxelCheck.position.y = point[1] + 0.5;
   newVoxelCheck.position.z = point[2] + 0.5;
   k++;
  }
 }, 100);
};

RunInit(init);

(window as any).DVER = DVER;
