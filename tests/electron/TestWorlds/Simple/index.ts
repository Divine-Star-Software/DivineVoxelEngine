import {
 SetUpEngine,
 SetUpCanvas,
 SetUpDefaultCamera,
 SetUpDefaultSkybox,
 runRenderLoop,
 SetUpDefaultScene,
} from "../Shared/Babylon/index.js";
import {
 RunInit,
 SetUpWorkers,
 SyncWithGraphicsSettings,
} from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";
RegisterTexutres(DVER);

const workers = SetUpWorkers(
 import.meta.url,
 "./World/world.js",
 "../Shared/Constructor/constructor.js",
 null,
 null
);

await DVER.$INIT({
 worldWorker: workers.worldWorker,
 constructorWorker: workers.constructorWorkers,
 chunks: {
  chunkYPow2: 4,
 },
 world: {
  maxY: 128,
 },
 lighting: {
  doAO: true,
  doRGBLight: false,
  doSunLight: false,
  autoRGBLight: false,
  autoSunLight: false,
 },
});

const init = async () => {
 const canvas = SetUpCanvas();
 const engine = SetUpEngine(canvas);
 const scene = SetUpDefaultScene(engine);
 const camera = SetUpDefaultCamera(
  scene,
  canvas,
  { x: 2, y: 45, z: 7 },
  { x: 10, y: 30, z: 10 }
 );
 scene.collisionsEnabled = false;
 const box = SetUpDefaultSkybox(scene);
 box.checkCollisions = false;
 const bmat = DVER.render.createSkyBoxMaterial(scene);
 if (bmat) {
  box.material = bmat;
 }

 // CreateWorldAxis(scene, 36);
 await DVER.$SCENEINIT({ scene: scene });
 

 const hemLight = new BABYLON.HemisphericLight(
  "",
  new BABYLON.Vector3(0, 1, 0),
  scene
 );

 DVER.render.setBaseLevel(0.8);
 DVER.render.setSunLevel(0.8);

 runRenderLoop(engine, scene, camera, DVER);
};
(window as any).DVER = DVER;
RunInit(init);
