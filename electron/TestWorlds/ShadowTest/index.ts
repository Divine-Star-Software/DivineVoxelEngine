import {
 SetUpEngine,
 SetUpCanvas,
 SetUpDefaultCamera,
 SetUpDefaultSkybox,
 runRenderLoop,
 SetUpDefaultScene,
} from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers } from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";
import { VoxelTemplateSubstanceType } from "../../out/Meta/index.js";

RegisterTexutres(DVER);

const workers = SetUpWorkers(
 import.meta.url,
 "./World/world.js",
 "../Shared/Builder/builder.js",
 "../Shared/Propagators/propagators.js"
);

await DVER.$INIT({
 worldWorker: workers.worldWorker,
 builderWorker: workers.builderWorkers,
 propagationWorker: workers.propagationWorkers,
 lighting: {
  doAO: true,
  doRGBLight: false,
  doSunLight: false,
  autoRGBLight: false,
  autoSunLight: false,
 },
});

const setUpLightAndShadows = (scene: BABYLON.Scene) => {
 const light = new BABYLON.DirectionalLight(
  "direct",
  new BABYLON.Vector3(-1, -1, 0),
  scene
 );
 light.intensity = 1;
 light.position = new BABYLON.Vector3(-25, 60, 40);
 console.log(light.shadowMaxZ, light.shadowMinZ);
 const lightSphere = BABYLON.MeshBuilder.CreateSphere(
  "lightSphere",
  { segments: 16, diameter: 1 },
  scene
 );

 lightSphere.position = light.position;
 const testSphere = BABYLON.MeshBuilder.CreateSphere(
  "lightSphere",
  { segments: 16, diameter: 1 },
  scene
 );
 testSphere.position = new BABYLON.Vector3(-27, 43, 8);
 // const hemLight = new BABYLON.HemisphericLight("test",new BABYLON.Vector3(0,-1,0),scene);
 const shadowGenerator = new BABYLON.ShadowGenerator(2000, light);

 shadowGenerator.addShadowCaster(testSphere);
 const mat = new BABYLON.StandardMaterial("test", scene);
 for (const meshKey of Object.keys(DVER.meshManager.meshes.solid)) {
  const mesh = DVER.meshManager.meshes.solid[meshKey];
  //@ts-ignore
  mesh.material.shadowDepthWrapper =  new BABYLON.ShadowDepthWrapper(mesh.material, scene);
  mesh.receiveShadows = true;
  mesh.material = mat;
  shadowGenerator.addShadowCaster(mesh);
 }

/*  const ground = BABYLON.MeshBuilder.CreateGround(
  "ground",
  { width: 80, height: 80, subdivisions: 1 },
  scene
 );
 ground.receiveShadows = true;
 ground.position.y = 35;
 ground.material = mat; */
 console.log("go");
};

const init = async () => {
 const canvas = SetUpCanvas();
 const engine = SetUpEngine(canvas);
 const scene = SetUpDefaultScene(engine);
 const camera = SetUpDefaultCamera(
  scene,
  canvas,
  { x: 15, y: 36, z: 7 },
  { x: 7, y: 30, z: 7 }
 );
 SetUpDefaultSkybox(scene);

 await DVER.$SCENEINIT({ scene: scene });
 DVER.renderManager.setBaseLevel(1);

 runRenderLoop(engine, scene, camera, DVER);

 setTimeout(() => {
  setUpLightAndShadows(scene);
 }, 1000);
};

RunInit(init);
