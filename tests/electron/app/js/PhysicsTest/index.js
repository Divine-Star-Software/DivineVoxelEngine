import { SetUpEngine, SetUpCanvas, SetUpDefaultCamera, SetUpDefaultSkybox, runRenderLoop, SetUpDefaultScene, } from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers } from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";
import { GetRenderPlayer } from "../Shared/Player/Render/RenderPlayer.js";
RegisterTexutres(DVER);
let ready = false;
let playerPostionArray = new Float32Array();
DVER.nexusComm.listenForMessage("connect-player-data", (data) => {
    playerPostionArray = new Float32Array(data[1]);
    ready = true;
});
let hitbox = false;
const cameras = {
    freeCam: null,
    playerCam: null,
};
const workers = SetUpWorkers(import.meta.url, "./World/world.js", "../Shared/Constructor/constructor.js", "../Shared/Nexus/nexus-with-player.js");
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
        doRGBLight: false,
        doSunLight: false,
        autoRGBLight: false,
        autoSunLight: false,
    },
    materials: {
        doAO: true,
        doRGBLight: false,
        doSunLight: false,
        disableFloraShaderEffects: false,
        disableLiquidShaderEffects: false,
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
    const scene = SetUpDefaultScene(engine);
    const camera = SetUpDefaultCamera(scene, canvas);
    cameras.freeCam = camera;
    const skybox = SetUpDefaultSkybox(scene);
    skybox.material = DVER.render.createSkyBoxMaterial(scene);
    await DVER.$SCENEINIT({ scene: scene });
    DVER.render.setBaseLevel(1);
    GetRenderPlayer(true, scene, canvas, DVER);
    //@ts-ignore
    runRenderLoop(engine, scene, camera, DVER);
    const hemLight = new BABYLON.HemisphericLight("", new BABYLON.Vector3(0, 1, 0), scene);
    //setUpOptions(scene);
};
const addNewGuiButton = (text, onClick) => {
    const parent = document.getElementById("gui-buttons");
    if (!parent)
        return;
    const button = document.createElement("button");
    button.innerText = text;
    button.className = "gui-button";
    button.addEventListener("click", (event) => {
        onClick(event);
    });
    parent.append(button);
};
const setUpOptions = (scene) => {
    addNewGuiButton("Main Camera", () => {
        scene.activeCamera = cameras.freeCam;
        hitbox.setEnabled(true);
    });
    addNewGuiButton("Player Cameera", () => {
        scene.activeCamera = cameras.playerCam;
        hitbox.setEnabled(false);
    });
};
RunInit(init);
window.DVER = DVER;
