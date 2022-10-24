import { SetUpEngine, SetUpCanvas, SetUpDefaultSkybox, runRenderLoop, SetUpDefaultScene, } from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers, SyncWithGraphicsSettings, } from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";
import { GetPlayerPickCube, GetRenderPlayer, } from "../Shared/Player/Render/RenderPlayer.js";
RegisterTexutres(DVER);
const workers = SetUpWorkers(import.meta.url, "./World/world.js", "./Constructor/constructor.js", "./Nexus/nexus.js");
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
SyncWithGraphicsSettings(DVER);
const init = async () => {
    const canvas = SetUpCanvas();
    const engine = SetUpEngine(canvas);
    const scene = SetUpDefaultScene(engine);
    SetUpDefaultSkybox(scene);
    const hemLight = new BABYLON.HemisphericLight("", new BABYLON.Vector3(0, 1, 0), scene);
    //CreateWorldAxis(scene, 36);
    await DVER.$SCENEINIT({ scene: scene });
    DVER.renderManager.setBaseLevel(1);
    const model = await GetRenderPlayer(false, scene, canvas, DVER);
    const camera = scene.activeCamera;
    const connectedPlayers = {};
    let pickVectorDV = new DataView(new ArrayBuffer(4 * 3 + 3));
    const playerPickCube = GetPlayerPickCube(DVER, camera, scene, model);
    DVER.worldComm.listenForMessage("connect-player-pick", (data) => {
        console.log("got it ");
        pickVectorDV = new DataView(data[1]);
    });
    const cameraPickPostion = new BABYLON.Vector3();
    window.addEventListener("click", (event) => {
        if (event.button == 2) {
            cameraPickPostion.x = model.position.x;
            cameraPickPostion.y = model.position.y;
            cameraPickPostion.z = model.position.z;
            cameraPickPostion.y += 0.75;
            const camPick = scene.pickWithRay(camera.getForwardRay(10, undefined, cameraPickPostion));
            if (camPick) {
                if (camPick.hit) {
                    if (camPick.pickedMesh && camPick.faceId !== undefined) {
                        let normal = camPick.pickedMesh.getFacetNormal(camPick.faceId);
                        console.log(normal);
                        pickVectorDV.setInt8(12, normal.x);
                        pickVectorDV.setInt8(13, normal.y);
                        pickVectorDV.setInt8(14, normal.z);
                    }
                }
            }
            DVER.worldComm.sendMessage("voxel-add");
            cameraPickPostion.setAll(0);
        }
        if (event.button == 0) {
            DVER.worldComm.sendMessage("voxel-remove");
        }
    });
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
    /*  setInterval(() => {
     for (const id of Object.keys(connectedPlayers)) {
      const player = connectedPlayers[Number(id)];
   
      //@ts-ignore
      console.log(
       pickVectorDV.getFloat32(0),
       pickVectorDV.getFloat32(4),
       pickVectorDV.getFloat32(8)
      );
     }
    }, 2000);
    */
    const forward = new BABYLON.Vector3();
    const offset = DVER.UTIL.degtoRad(270);
    const forwardPoint = new BABYLON.Vector3();
    scene.registerBeforeRender(() => {
        playerPickCube.position.x = pickVectorDV.getFloat32(0) + 0.5;
        playerPickCube.position.y = pickVectorDV.getFloat32(4) + 0.5;
        playerPickCube.position.z = pickVectorDV.getFloat32(8) + 0.5;
        for (const id of Object.keys(connectedPlayers)) {
            const player = connectedPlayers[Number(id)];
            player.model.position.x = player.data.getFloat32(4);
            player.model.position.y = player.data.getFloat32(8) - 1;
            player.model.position.z = player.data.getFloat32(12);
            player.model.rotation.y = player.data.getFloat32(32) + offset;
        }
    });
    runRenderLoop(engine, scene, model, DVER);
};
window.DVER = DVER;
RunInit(init);
