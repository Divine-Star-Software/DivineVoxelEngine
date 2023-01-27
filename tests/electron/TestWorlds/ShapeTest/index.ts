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
import {
 RunInit,
 SetUpWorkers,
 SyncWithGraphicsSettings,
} from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";
import { GetAnalyzerCubeRender } from "../Shared/Debug/Anaylzer/Cube.js";

RegisterTexutres(DVER);

const workers = SetUpWorkers(
 import.meta.url,
 "./World/world.js",
 "../Shared/Constructor/constructor.js"
);

await DVER.$INIT({
 worldWorker: workers.worldWorker,
 constructorWorker: workers.constructorWorkers,
 /*  lighting: {
  doAO: true,
  doRGBLight: true,
  doSunLight: false,
  autoRGBLight: true,
  autoSunLight: false,
 },
 materials: {
  doAO: true,
  doRGBLight: true,
  doSunLight: false,
  disableFloraShaderEffects: false,
  disableLiquidShaderEffects: false,
 }, */
 world: {
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
 const camera = SetUpDefaultCamera(
  scene,
  canvas,
  { x: -1, y: 21, z: 17 },
  { x: -1, y: 20, z: 15 }
 );
 SetUpDefaultSkybox(scene);
 CreateWorldAxis(scene, 20);

 GetAnalyzerCubeRender(DVER,camera);
 await DVER.$SCENEINIT({ scene: scene });
 DVER.render.setBaseLevel(0.1);
 DVER.render.setSunLevel(1);

 runRenderLoop(engine, scene, camera, DVER);
};

RunInit(init);

(window as any).DVER = DVER;
