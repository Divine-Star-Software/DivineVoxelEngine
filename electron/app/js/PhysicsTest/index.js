import { SetUpEngine, SetUpCanvas, SetUpDefaultCamera, SetUpDefaultSkybox, CreateWorldAxis, runRenderLoop, SetUpDefaultScene, } from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers } from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";
import { DVEM } from "../../out/Math/DivineVoxelEngineMath.js";
RegisterTexutres(DVER);
const ready = { ready: false };
let playerPostionArray = new Float32Array();
DVER.nexusComm.listenForMessage("connect-player-data", (data) => {
    playerPostionArray = new Float32Array(data[1]);
    ready.ready = true;
});
let hitbox = false;
const cameras = {
    freeCam: null,
    playerCam: null,
};
const workers = SetUpWorkers(import.meta.url, "./World/world.js", "../Shared/Constructor/constructor.js", "./Nexus/nexus.js");
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
        disableFluidShaderEffects: false,
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
    SetUpDefaultSkybox(scene);
    CreateWorldAxis(scene, 10);
    await DVER.$SCENEINIT({ scene: scene });
    DVER.renderManager.setBaseLevel(1);
    //@ts-ignore
    runRenderLoop(engine, scene, camera, DVER);
    const hemLight = new BABYLON.HemisphericLight("", new BABYLON.Vector3(0, 1, 0), scene);
    setUpOptions(scene);
    physicsTest(scene, canvas);
    // checkPointTest(scene);
};
const addNewGuiButton = (parent, text, onClick) => {
    const button = document.createElement("button");
    button.innerText = text;
    button.className = "gui-button";
    button.addEventListener("click", (event) => {
        onClick(event);
    });
    parent.append(button);
};
const setUpOptions = (scene) => {
    const optionsMenu = document.getElementById("gui-buttons");
    if (!optionsMenu)
        return;
    addNewGuiButton(optionsMenu, "Main Camera", () => {
        scene.activeCamera = cameras.freeCam;
        hitbox.setEnabled(true);
    });
    addNewGuiButton(optionsMenu, "Player Cameera", () => {
        scene.activeCamera = cameras.playerCam;
        hitbox.setEnabled(false);
    });
};
const physicsTest = async (scene, canvas) => {
    const posVector3 = DVEM.getVector3(0, 0.5, 0);
    const playerCamera = SetUpDefaultCamera(scene, canvas, posVector3, { x: 0, y: 0, z: 0 }, false, false, "playercam");
    playerCamera.attachControl(canvas, true);
    playerCamera.inputs.removeByType("FreeCameraKeyboardMoveInput");
    /*
    
     const testBox1 = BABYLON.MeshBuilder.CreateBox(
        "player-hitbox",
        { width: 1, height: .5, depth: 1 },
        scene
       );
    
       testBox1.position.x = 7 + .5;
       testBox1.position.y = 6;
       testBox1.position.z = 10 + .5;
    
       const testBox2 = BABYLON.MeshBuilder.CreateBox(
        "player-hitbox",
        { width: 1, height: .5, depth: .5 },
        scene
       );
    
       testBox2.position.x = 7 + .5;
       testBox2.position.y = 6 + .5;
       testBox2.position.z = 10 + .25; */
    const playerHitBox = BABYLON.MeshBuilder.CreateBox("player-hitbox", { width: 0.8, height: 2, depth: 0.8 }, scene);
    hitbox = playerHitBox;
    cameras.playerCam = playerCamera;
    const camNode = new BABYLON.TransformNode("camnode", scene);
    playerCamera.parent = camNode;
    //camNode.position.y = 0.3;
    camNode.parent = playerHitBox;
    await DVER.UTIL.createPromiseCheck({
        check: () => ready.ready,
        checkInterval: 1,
    });
    const playerDirectionSAB = new SharedArrayBuffer(4 * 3);
    const playerStatesSAB = new SharedArrayBuffer(4);
    const playerDirection = new Float32Array(playerDirectionSAB);
    const playerStates = new Uint8Array(playerStatesSAB);
    window.addEventListener("keydown", (event) => {
        if (event.key == "w" || event.key == "W") {
            playerStates[0] = 1;
        }
        if (event.key == "s" || event.key == "S") {
            playerStates[0] = 2;
        }
        if (event.key == " ") {
            playerStates[1] = 1;
        }
    });
    window.addEventListener("keyup", (event) => {
        if (event.key == "w" ||
            event.key == "W" ||
            event.key == "s" ||
            event.key == "S") {
            playerStates[0] = 0;
        }
        if (event.key == " ") {
            playerStates[1] = 0;
        }
    });
    DVER.nexusComm.sendMessage("connect-player-states", [
        playerDirectionSAB,
        playerStatesSAB,
    ]);
    scene.registerAfterRender(() => {
        playerHitBox.position.x = playerPostionArray[0];
        playerHitBox.position.y = playerPostionArray[1];
        playerHitBox.position.z = playerPostionArray[2];
        const camera = scene.activeCamera;
        if (!camera)
            return;
        const direction = playerCamera.getDirection(new BABYLON.Vector3(0, 0, 1));
        playerDirection[0] = direction.x;
        playerDirection[1] = direction.y;
        playerDirection[2] = direction.z;
    });
};
RunInit(init);
window.DVER = DVER;
