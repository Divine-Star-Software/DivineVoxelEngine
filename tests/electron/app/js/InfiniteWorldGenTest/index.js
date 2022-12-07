import { SetUpEngine, SetUpCanvas, SetUpDefaultCamera, SetUpDefaultSkybox, runRenderLoop, SetUpDefaultScene, } from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers, SyncWithGraphicsSettings, } from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";
import { GetAnalyzerCubeRender } from "../Shared/Debug/Anaylzer/Cube.js";
RegisterTexutres(DVER);
const workers = SetUpWorkers(import.meta.url, "./World/world.js", "./Constructor/constructor.js");
await DVER.$INIT({
    worldWorker: workers.worldWorker,
    constructorWorker: workers.constructorWorkers,
});
SyncWithGraphicsSettings(DVER);
const init = async () => {
    const canvas = SetUpCanvas();
    const engine = SetUpEngine(canvas);
    const scene = SetUpDefaultScene(engine);
    new BABYLON.HemisphericLight("", new BABYLON.Vector3(0, 1, 0), scene);
    const camera = SetUpDefaultCamera(scene, canvas, { x: 17, y: 70, z: 3 }, { x: 20, y: 7, z: 0 });
    camera.speed = 0.5;
    const box = SetUpDefaultSkybox(scene);
    const bmat = DVER.renderManager.createSkyBoxMaterial(scene);
    if (bmat) {
        box.material = bmat;
    }
    const positionSAB = new SharedArrayBuffer(4 * 3);
    const position = new Float32Array(positionSAB);
    DVER.worldComm.listenForMessage("get-position", (data) => {
        DVER.worldComm.sendMessage("set-position", [positionSAB]);
    });
    scene.registerBeforeRender(() => {
        position[0] = camera.position.x;
        position[1] = camera.position.y;
        position[2] = camera.position.z;
    });
    DVER.renderManager.updateFogOptions({
        density: 0.00005,
        color: new BABYLON.Color3(99 / 255, 157 / 255, 216 / 255),
    });
    await DVER.$SCENEINIT({ scene: scene });
    DVER.renderManager.setSunLevel(0.8);
    DVER.renderManager.setBaseLevel(0.0);
    const debugCube = GetAnalyzerCubeRender(DVER, camera);
    window.debugCube = debugCube;
    runRenderLoop(engine, scene, camera, DVER);
};
window.DVER = DVER;
RunInit(init);
