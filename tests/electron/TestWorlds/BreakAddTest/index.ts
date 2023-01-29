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
import { GetRenderPlayer } from "../Shared/Player/Render/RenderPlayer.js";
import { GetAnalyzerCubeRender } from "../Shared/Debug/Anaylzer/Cube.js";
import { PlayerData } from "../Shared/Player/Shared/PlayerData.js";

RegisterTexutres(DVER);

const workers = SetUpWorkers(
 import.meta.url,
 "./World/world.js",
 "../Shared/Constructor/constructor.js",
 "../Shared/Nexus/nexus-with-player.js"
);

await DVER.$INIT({
 worldWorker: workers.worldWorker,
 constructorWorker: workers.constructorWorkers,
 nexusWorker: workers.nexusWorker,
 nexus: {
  enabled: true,
  autoSyncVoxelPalette: true,
  autoSyncChunks: true,
 },
 meshes: {
  clearChachedGeometry: true,
 },
});

const init = async () => {
 const canvas = SetUpCanvas();
 const engine = SetUpEngine(canvas);
 const scene = SetUpDefaultScene(engine);
 const camera = SetUpDefaultCamera(scene, canvas, { x: 0, y: 0.01, z: 0 });
 const box = SetUpDefaultSkybox(scene);
 const bmat = DVER.render.createSkyBoxMaterial(scene);
 if (bmat) {
  box.material = bmat;
 }
 (window as any).DVER = DVER;

 scene.fogDensity = 0.005;
 await DVER.$SCENEINIT({ scene: scene });
 SyncWithGraphicsSettings(DVER);
 DVER.render.setBaseLevel(0.1);
 DVER.render.setSunLevel(0.8);
 const hemLight = new BABYLON.HemisphericLight(
  "",
  new BABYLON.Vector3(0, 1, 0),
  scene
 );
 const player = await GetRenderPlayer(true, scene, canvas, DVER);

 const debugCube = GetAnalyzerCubeRender(DVER, player);
 (window as any).debugCube = debugCube;

 //@ts-ignore
 runRenderLoop(engine, scene, PlayerData, DVER);
};

RunInit(init);
