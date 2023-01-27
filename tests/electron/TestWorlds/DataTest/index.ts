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
import { $INITDataLoader } from "../Shared/DataLoader/DataLoaderRender.js";

RegisterTexutres(DVER);

const workers = SetUpWorkers(
 import.meta.url,
 "./World/world.js",
 "../Shared/Constructor/constructor.js",
 null,
 "../Shared/DataLoader/data.js"
);

await DVER.$INIT({
 worldWorker: workers.worldWorker,
 constructorWorker: workers.constructorWorkers,
 dataWorker: workers.dataWorker,
 lighting: {
  doAO: true,
  doRGBLight: false,
  doSunLight: false,
  autoRGBLight: false,
  autoSunLight: false,
 },
 data: {
  enabled: true,
  autoSyncChunks: true,
 },
});

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

 $INITDataLoader(DVER);

 runRenderLoop(engine, scene, camera, DVER);
};

RunInit(init);
