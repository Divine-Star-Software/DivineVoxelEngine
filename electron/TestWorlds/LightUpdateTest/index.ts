import {
 SetUpEngine,
 SetUpCanvas,
 SetUpDarkScene,
 SetUpDefaultCamera,
 SetUpDefaultSkybox,
 runRenderLoop,
} from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers } from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";

RegisterTexutres(DVER);

const workers = SetUpWorkers(
 import.meta.url,
 "./World/index.js",
 "../Shared/Builder/builder.js",
 "../Shared/WorldGeneration/worldgen.js"
);

await DVER.$INIT({
 worldWorker: workers.worldWorker,
 builderWorker: workers.builderWorkers,
 worldGenWorker: workers.worldGenWorkers,
 lighting: {
  doAO: true,
  doRGBLight: true,
  doSunLight: true,
  autoRGBLight: true,
  autoSunLight: true,
 },
});

const init = async () => {
 const canvas = SetUpCanvas();
 const engine = SetUpEngine(canvas);
 const scene = SetUpDarkScene(engine);
 const camera = SetUpDefaultCamera(
  scene,
  canvas,
  { x: 20, y: 10, z: -10 },
  { x: 8, y: 0, z: 8 }
 );
 SetUpDefaultSkybox(scene);

 await DVER.$SCENEINIT({ scene: scene });

 runRenderLoop(engine, scene, camera);
};

RunInit(init);
