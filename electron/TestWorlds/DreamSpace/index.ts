import {
 SetUpEngine,
 SetUpCanvas,
 SetUpDefaultCamera,
 SetUpDefaultSkybox,
 runRenderLoop,
 SetUpDefaultScene,
} from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers } from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { Player } from "./Player/Player.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";

RegisterTexutres(DVER);

const workers = SetUpWorkers(
 import.meta.url,
 "./World/index.js",
 "../Shared/Builder/builder.js",
 "../Shared/Propagators/propagators.js"
);

await DVER.$INIT({
 worldWorker: workers.worldWorker,
 builderWorker: workers.builderWorkers,
 propagationWorker: workers.propagationWorkers,
 lighting: {
  doAO: true,
  doRGBLight: false,
  doSunLight: false,
  autoRGBLight: false,
  autoSunLight: false,
 },
 chunks : {
     chunkXPow2 : 4,
     chunkZPow2 : 4,
     chunkYPow2 : 5,
     autoHeightMap : true
 }
});

const init = async () => {
 const player = new Player(DVER);
 const canvas = SetUpCanvas();
 const engine = SetUpEngine(canvas);
 const scene = SetUpDefaultScene(engine);
 const camera = SetUpDefaultCamera(scene, canvas, { x: 0, y: 0.01, z: 0 });
 SetUpDefaultSkybox(scene);

 await DVER.$SCENEINIT({ scene: scene });
 DVER.renderManager.setBaseLevel(0.5);

 player.createPlayerSharedArrays();
 player.createPlayer(scene, camera);
 (window as any).player = player;
 setTimeout(() => {
  setInterval(() => {
   player.update();
  }, 10);
 }, 15_000);

 runRenderLoop(engine, scene, player.hitbox);
};

RunInit(init);
