import {
 SetUpEngine,
 SetUpCanvas,
 SetUpDefaultCamera,
 SetUpDefaultSkybox,
 runRenderLoop,
 SetUpDefaultScene,
} from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers, SyncWithGraphicsSettings } from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";

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
  doRGBLight: true,
  doSunLight: false,
  autoRGBLight: true,
  autoSunLight: false,
 },
});

const setUpLightAndShadows = (scene: BABYLON.Scene) => {
 const light = new BABYLON.DirectionalLight(
  "light",
  new BABYLON.Vector3(-1, -1, -0.1),
  scene
 );

 /*  let goingUp = false;
 setInterval(() => {
  if (light.intensity <= 0) {
   goingUp = true;
  }
  if (light.intensity >= 1) {
   goingUp = false;
  }
  if (goingUp) {
   light.direction.x -= 0.01;
   light.intensity += 0.01;
   if (scene.fogColor.r < 1) {
    scene.fogColor.r += 0.01;
   }
   if (scene.fogColor.g < 1) {
    scene.fogColor.g += 0.01;
   }

   if (scene.fogColor.b < 1) {
    scene.fogColor.b += 0.01;
   }
  } else {
   light.direction.x += 0.01;
   light.intensity -= 0.01;
   if (scene.fogColor.r > 0) {
    scene.fogColor.r -= 0.01;
   }
   if (scene.fogColor.g > 0) {
    scene.fogColor.g -= 0.01;
   }
   if (scene.fogColor.b > 0) {
    scene.fogColor.b -= 0.01;
   }
  }
 }, 100); */

 light.intensity = 1;
 light.shadowMinZ = -90 * 2;
 light.shadowMaxZ = 130 * 2;

 /*     scene.fogColor.r = 0;
 scene.fogColor.g = 0;
 scene.fogColor.b = 0;    */

 // const hemLight = new BABYLON.HemisphericLight("test",new BABYLON.Vector3(0,-1,0),scene);
 const shadowGenerator = new BABYLON.ShadowGenerator(1024, light, true);
 shadowGenerator.darkness = 0.1;
 shadowGenerator.usePercentageCloserFiltering = true;
 shadowGenerator.usePoissonSampling = true;
 shadowGenerator.filteringQuality = BABYLON.ShadowGenerator.QUALITY_MEDIUM;
 shadowGenerator.bias = 0.003;
 (shadowGenerator as any).autoCalcDepthBounds = false;

 setTimeout(() => {
  for (const meshKey of Object.keys(DVER.meshManager.meshes.solid)) {
   const mesh = DVER.meshManager.meshes.solid[0][meshKey];
   mesh.receiveShadows = true;
   mesh.material = DVER.render.solidStandardMaterial.getMaterial();
   DVER.render.liquidStandardMaterial.addToRenderList(mesh);
   shadowGenerator.addShadowCaster(mesh);
  }

  for (const meshKey of Object.keys(DVER.meshManager.meshes.solid)) {
   const mesh = DVER.meshManager.meshes.solid[0][meshKey];
   DVER.render.liquidStandardMaterial.addToRenderList(mesh);
  }
  for (const meshKey of Object.keys(DVER.meshManager.meshes.liquid)) {
   const mesh = DVER.meshManager.meshes.liquid[0][meshKey];
   mesh.receiveShadows = true;
   mesh.material = DVER.render.liquidStandardMaterial.getMaterial();
  }
 }, 5000);
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
 DVER.render.setBaseLevel(1);

/*  var pipeline = new BABYLON.DefaultRenderingPipeline(
  "defaultPipeline",
  true,
  scene,
  [camera]
 );

 pipeline.samples = 4;
 pipeline.bloomEnabled = true;
 pipeline.bloomThreshold = 0.1;
 pipeline.bloomWeight = 2;
 pipeline.bloomKernel = 256;
 pipeline.bloomScale = 1; */
 /* 
  pipeline.depthOfFieldEnabled = true;
 pipeline.depthOfField.focusDistance  = 2000;
 pipeline.depthOfField.fStop  = 1.4
 pipeline.depthOfFieldBlurLevel = BABYLON.DepthOfFieldEffectBlurLevel.Low;  */

 /*  pipeline.chromaticAberrationEnabled = true;
 pipeline.chromaticAberration.aberrationAmount = 300;
 pipeline.chromaticAberration.radialIntensity = 1;
 pipeline.chromaticAberration.alphaMode = 2;
let i = 0;
 setInterval(()=>{
  pipeline.chromaticAberration.direction.x = Math.sin(i/10)
  pipeline.chromaticAberration.direction.y = Math.cos(i/10)
i++;
 },10); */
 runRenderLoop(engine, scene, camera, DVER);

 setTimeout(() => {
  setUpLightAndShadows(scene);
 }, 1000);
};

RunInit(init);
