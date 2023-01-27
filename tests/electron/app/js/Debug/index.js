import { SetUpEngine, SetUpCanvas, SetUpDefaultSkybox, runRenderLoop, SetUpDefaultScene, GetPlayerModel, } from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers, SyncWithGraphicsSettings, } from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";
import { GetAnalyzerCubeRender } from "../Shared/Debug/Anaylzer/Cube.js";
import { InitalizeAudio } from "../Shared/Audio/init.js";
import { InitalizeCommands } from "../Shared/Commands/Render/RenderCommands.js";
RegisterTexutres(DVER);
const workers = SetUpWorkers(import.meta.url, "./World/world.js", "../Shared/Constructor/constructor.js");
await DVER.$INIT({
    worldWorker: workers.worldWorker,
    constructorWorker: workers.constructorWorkers,
    lighting: {
        doAO: true,
        doRGBLight: false,
        doSunLight: false,
        autoRGBLight: false,
        autoSunLight: false,
    },
    floatingOrigin: {
        enable: true,
    },
});
const init = async () => {
    const canvas = SetUpCanvas();
    const engine = SetUpEngine(canvas);
    const scene = SetUpDefaultScene(engine);
    const camera = DVER.render.fo.getCamera(scene, "", new BABYLON.Vector3(0, 10, 0), canvas);
    window.scene = scene;
    const box = SetUpDefaultSkybox(scene);
    const bmat = DVER.render.createSkyBoxMaterial(scene);
    if (bmat) {
        box.material = bmat;
    }
    await InitalizeAudio();
    //CreateWorldAxis(scene, 36);
    await DVER.$SCENEINIT({ scene: scene });
    SyncWithGraphicsSettings(DVER);
    DVER.render.setBaseLevel(1);
    const hemLight = new BABYLON.HemisphericLight("", new BABYLON.Vector3(0, 1, 0), scene);
    /*
    const mat = new BABYLON.StandardMaterial("");
    mat.diffuseColor = new BABYLON.Color3(1, 0, 1);
    mat.backFaceCulling = false;
    const chunkMarkers = BABYLON.MeshBuilder.CreateBox("", {
     width: 16,
     height: 128,
     depth: 16,
    });
    chunkMarkers.visibility = 0.5;
    chunkMarkers.material = mat;
    chunkMarkers.position.x = 8;
    chunkMarkers.position.z = 8; */
    InitalizeCommands();
    const truePosition = new BABYLON.Vector3();
    scene.registerBeforeRender(() => {
        truePosition.x = camera.doublepos.x;
        truePosition.y = camera.doublepos.y;
        truePosition.z = camera.doublepos.z;
    });
    const playerModel = await GetPlayerModel(scene);
    playerModel.position.y = 5;
    const debugCube = GetAnalyzerCubeRender(DVER, camera);
    window.debugCube = debugCube;
    runRenderLoop(engine, scene, { position: truePosition }, DVER);
};
window.DVER = DVER;
RunInit(init);
