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
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";
import { GetRenderPlayer } from "../Shared/Player/Render/RenderPlayer.js";
import { DVEM } from "../../out/Math/DivineVoxelEngineMath.js";
RegisterTexutres(DVER);

const workers = SetUpWorkers(
 import.meta.url,
 "./World/world.js",
 "./Constructor/constructor.js",
 "./Nexus/nexus.js"
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
 chunks: {
  chunkYPow2: 4,
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

 SetUpDefaultSkybox(scene);

 const hemLight = new BABYLON.HemisphericLight(
  "",
  new BABYLON.Vector3(0, 1, 0),
  scene
 );
 //CreateWorldAxis(scene, 36);
 await DVER.$SCENEINIT({ scene: scene });
 DVER.renderManager.setBaseLevel(1);

 const model = await GetRenderPlayer(scene, canvas, DVER, DVEM);

 const connectedPlayers: Record<
  number,
  { id: number; model: BABYLON.Mesh; data: DataView }
 > = {};

 DVER.worldComm.listenForMessage("remote-player-connect", (data) => {
  const playerId = data[1];
  const playerSAB = data[2];
  const dv = new DataView(playerSAB);
  const newModel = model.clone();
  newModel.isVisible = true;
  connectedPlayers[playerId] = {
   id: playerId,
   model: newModel,
   data: dv,
  };
 
 });

 setInterval(() => {
  for (const id of Object.keys(connectedPlayers)) {
   const player = connectedPlayers[Number(id)];
   console.log(id,player.data.getFloat32(4), player.data.getFloat32(8));
  }
 }, 2000);

 scene.registerBeforeRender(() => {
  for (const id of Object.keys(connectedPlayers)) {
   const player = connectedPlayers[Number(id)];
   player.model.position.x = player.data.getFloat32(4);
   player.model.position.y = player.data.getFloat32(8) - 1;
   player.model.position.z = player.data.getFloat32(12);
  }
 });

 runRenderLoop(engine, scene, model, DVER);
};
(window as any).DVER = DVER;
RunInit(init);
