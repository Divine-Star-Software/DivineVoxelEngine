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
  doSunLight: true,
  autoRGBLight: true,
  autoSunLight: true,
 },
 materials : {
  doAO : true,
doRGBLight : true,
  doSunLight : true,
  disableFloraShaderEffects : false,
  disableLiquidShaderEffects : false
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
 const camera = SetUpDefaultCamera(scene, canvas,{x:0,y:13,z:-7});
 SetUpDefaultSkybox(scene);
 CreateWorldAxis(scene, 10);

 await DVER.$SCENEINIT({ scene: scene });
 DVER.render.setSunLevel(.5);

 runRenderLoop(engine, scene, camera, DVER);
};

RunInit(init);

(window as any).DVER = DVER;
