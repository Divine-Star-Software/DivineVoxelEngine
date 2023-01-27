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
RegisterTexutres(DVER);

const workers = SetUpWorkers(
 import.meta.url,
 "./World/world.js",
 "./Constructor/constructor.js",
 "../Shared/Nexus/nexus-with-player.js",
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

 const box = SetUpDefaultSkybox(scene);
 const bmat = DVER.render.createSkyBoxMaterial(scene);
 if (bmat) {
  box.material = bmat;
 }

 const hemLight = new BABYLON.HemisphericLight(
  "",
  new BABYLON.Vector3(0, 1, 0),
  scene
 );
 //CreateWorldAxis(scene, 36);
 await DVER.$SCENEINIT({ scene: scene });


 const model = await GetRenderPlayer(true, scene, canvas, DVER);

 const connectedPlayers: Map<
  number,
  { id: number; model: BABYLON.Mesh; data: DataView }
 > = new Map();

 DVER.worldComm.listenForMessage("remote-player-connect", (data) => {
  const playerId = data[1];
  const playerSAB = data[2];
  const dv = new DataView(playerSAB);
  const newModel = model.clone();
  newModel.isVisible = true;
  console.log("Connected in render thread: ", playerId);
  connectedPlayers.set(playerId, {
   id: playerId,
   model: newModel,
   data: dv,
  });
 });

 DVER.worldComm.listenForMessage("remove-remote-player", (data) => {
  const playerId = data[1];
  const player = connectedPlayers.get(playerId);
  console.log(playerId, player);
  if (!player) return;
  player.model.dispose();
  connectedPlayers.delete(playerId);
 });

 const offset = DVER.UTIL.degtoRad(270);
 scene.registerBeforeRender(() => {
  connectedPlayers.forEach((player) => {
   player.model.position.x = player.data.getFloat32(4);
   player.model.position.y = player.data.getFloat32(8) - 1;
   player.model.position.z = player.data.getFloat32(12);
   player.model.rotation.y = player.data.getFloat32(32) + offset;
  });
 });

 runRenderLoop(engine, scene, model, DVER);
};
(window as any).DVER = DVER;
RunInit(init);
