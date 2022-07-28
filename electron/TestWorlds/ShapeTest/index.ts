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
  autoRGBLight: true,
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

const init = async () => {
 const canvas = SetUpCanvas();
 const engine = SetUpEngine(canvas);
 const scene = SetUpDarkScene(engine);
 const camera = SetUpDefaultCamera(scene, canvas, { x: 30, y: 22, z: 14 });
 SetUpDefaultSkybox(scene);
 //CreateWorldAxis(scene, 10);

 await DVER.$SCENEINIT({ scene: scene });
 DVER.renderManager.setBaseLevel(1);
 DVER.renderManager.setSunLevel(0);

 runRenderLoop(engine, scene, camera, DVER);
};

RunInit(init);

(window as any).DVER = DVER;
