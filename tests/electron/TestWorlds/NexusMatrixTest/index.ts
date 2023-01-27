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
import { RegisterEntitiesInCore } from "../Shared/Functions/RegisterEntitesInCore.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";

RegisterTexutres(DVER);
RegisterEntitiesInCore(DVER);

(window as any).DVER = DVER;

const workers = SetUpWorkers(
 import.meta.url,
 "./World/world.js",
 "../Shared/Constructor/constructor.js",
 "./Nexus/index.js"
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


DVER.render.updateFogOptions({ color: new BABYLON.Color3(0, 0, 0) });
const init = async () => {
 const canvas = SetUpCanvas();
 const engine = SetUpEngine(canvas);
 const scene = SetUpDarkScene(engine);
 const camera = SetUpDefaultCamera(
  scene,
  canvas,
  { x: -10, y: 15, z: -10 },
  { x: 0, y: 14, z: 0 }
 );
 SetUpDefaultSkybox(scene);

 //need this for meshes that are not part of the engnie
 const light = new BABYLON.HemisphericLight(
  "",
  new BABYLON.Vector3(0, 1, 0),
  scene
 );

 await DVER.$SCENEINIT({ scene: scene });
 DVER.render.setBaseLevel(0);

 runRenderLoop(engine, scene, camera, DVER);
};

RunInit(init);
