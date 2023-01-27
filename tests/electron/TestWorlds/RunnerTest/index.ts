import {
 SetUpEngine,
 SetUpCanvas,
 SetUpDefaultCamera,
 SetUpDefaultSkybox,
 runRenderLoop,
 SetUpDarkScene,
} from "../Shared/Babylon/index.js";
import {
 RunInit,
 SetUpWorkers,
 SyncWithGraphicsSettings,
} from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";
import { GetRenderPlayer } from "../Shared/Player/Render/RenderPlayer.js";

RegisterTexutres(DVER);

const workers = SetUpWorkers(
 import.meta.url,
 "./World/world.js",
 "../Shared/Constructor/constructor.js",
 "../Shared/Nexus/nexus-with-player.js",
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
  doRGBLight: true,
  doSunLight: false,
  autoRGBLight: true,
  autoSunLight: false,
 },
});

const init = async () => {
 const canvas = SetUpCanvas();
 const engine = SetUpEngine(canvas);
 const scene = SetUpDarkScene(engine);
 const camera = SetUpDefaultCamera(scene, canvas, { x: 0, y: 1, z: 0 });
 SetUpDefaultSkybox(scene);

 await DVER.$SCENEINIT({ scene: scene });
 DVER.render.setBaseLevel(0);

 GetRenderPlayer(false, scene, canvas, DVER);

 runRenderLoop(engine, scene, camera);
};

RunInit(init);
