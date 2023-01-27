import { SetUpEngine, SetUpCanvas, SetUpDefaultCamera, SetUpDefaultSkybox, runRenderLoop, SetUpDefaultScene, } from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers, } from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";
import { GetAnalyzerCubeRender } from "../Shared/Debug/Anaylzer/Cube.js";
import { InitalizeAudio } from "../Shared/Audio/init.js";
RegisterTexutres(DVER);
const workers = SetUpWorkers(import.meta.url, "./World/world.js", "./Constructor/constructor.js");
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
});
const init = async () => {
    const canvas = SetUpCanvas();
    const engine = SetUpEngine(canvas);
    const scene = SetUpDefaultScene(engine);
    const camera = SetUpDefaultCamera(scene, canvas, { x: 17, y: 8, z: 3 }, { x: 20, y: 7, z: 0 });
    camera.speed = 0.5;
    const box = SetUpDefaultSkybox(scene);
    const bmat = DVER.render.createSkyBoxMaterial(scene);
    if (bmat) {
        box.material = bmat;
    }
    await InitalizeAudio();
    //CreateWorldAxis(scene, 36);
    await DVER.$SCENEINIT({ scene: scene });
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
    const debugCube = GetAnalyzerCubeRender(DVER, camera);
    window.debugCube = debugCube;
    runRenderLoop(engine, scene, camera, DVER);
};
window.DVER = DVER;
RunInit(init);
