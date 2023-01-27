import { SetUpEngine, SetUpCanvas, SetUpDefaultCamera, SetUpDefaultSkybox, runRenderLoop, SetUpDefaultScene, } from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers } from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";
RegisterTexutres(DVER);
const workers = SetUpWorkers(import.meta.url, "./World/world.js", "./Constructor/constructor.js", null, null, null, "./RichWorld/richworld.js");
await DVER.$INIT({
    worldWorker: workers.worldWorker,
    constructorWorker: workers.constructorWorkers,
    richWorldWorker: workers.richWorldWorker,
    richWorld: {
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
    const camera = SetUpDefaultCamera(scene, canvas, { x: 2, y: 36, z: 7 }, { x: 10, y: 30, z: 10 });
    camera.speed = .5;
    SetUpDefaultSkybox(scene);
    //CreateWorldAxis(scene, 36);
    await DVER.$SCENEINIT({ scene: scene });
    DVER.render.setBaseLevel(1);
    const hemLight = new BABYLON.HemisphericLight("", new BABYLON.Vector3(0, 1, 0), scene);
    const mat = new BABYLON.StandardMaterial("");
    mat.diffuseColor = new BABYLON.Color3(1, 0, 1);
    const pickerCube = BABYLON.MeshBuilder.CreateBox("", {
        width: 1.1,
        depth: 1.1,
        height: 1.1,
    });
    pickerCube.visibility = 0.5;
    pickerCube.material = mat;
    const richDataContainer = document.getElementById("rich-data");
    const richDataDisplay = (document.getElementById("rich-data-display"));
    const richDataSave = document.getElementById("rd-save");
    const richDataExit = document.getElementById("rd-exit");
    richDataSave.addEventListener("click", () => {
        const data = richDataDisplay.value;
        DVER.richWorldComm.sendMessage("save-richdata", [JSON.parse(data)]);
    });
    richDataExit.addEventListener("click", () => {
        richDataContainer.style.display = "none";
    });
    DVER.richWorldComm.listenForMessage("display-richdata", (data) => {
        document.exitPointerLock();
        const richData = data[1];
        richDataContainer.style.display = "block";
        richDataDisplay.value = JSON.stringify(richData, null, 5);
    });
    const camDSAB = new SharedArrayBuffer(4 * 3);
    const camPSAB = new SharedArrayBuffer(4 * 3);
    const pickCubePSAB = new SharedArrayBuffer(4 * 3);
    const cameraDirection = new Float32Array(camDSAB);
    const cameraPosition = new Float32Array(camPSAB);
    const pickerCubePosition = new Float32Array(pickCubePSAB);
    DVER.worldComm.sendMessage("connect-camera", [camDSAB, camPSAB, pickCubePSAB]);
    const camDVec3 = new BABYLON.Vector3();
    scene.registerBeforeRender(() => {
        camera.getDirectionToRef(BABYLON.Vector3.Forward(), camDVec3);
        cameraDirection[0] = camDVec3.x;
        cameraDirection[1] = camDVec3.y;
        cameraDirection[2] = camDVec3.z;
        cameraPosition[0] = camera.position.x;
        cameraPosition[1] = camera.position.y;
        cameraPosition[2] = camera.position.z;
        pickerCube.position.x = pickerCubePosition[0] + 0.5;
        pickerCube.position.y = pickerCubePosition[1] + 0.5;
        pickerCube.position.z = pickerCubePosition[2] + 0.5;
    });
    window.addEventListener("click", (event) => {
        if (event.button == 2) {
            DVER.worldComm.sendMessage("pick-voxel", []);
        }
    });
    runRenderLoop(engine, scene, camera, DVER);
};
window.DVER = DVER;
RunInit(init);
