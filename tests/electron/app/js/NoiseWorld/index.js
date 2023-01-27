import { SetUpEngine, SetUpCanvas, SetUpDefaultCamera, SetUpDefaultSkybox, runRenderLoop, SetUpDefaultScene, } from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers, } from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";
RegisterTexutres(DVER);
const workers = SetUpWorkers(import.meta.url, "./World/world.js", "../Shared/Constructor/constructor.js");
await DVER.$INIT({
    worldWorker: workers.worldWorker,
    constructorWorker: workers.constructorWorkers,
    world: {
        minZ: -Infinity,
        maxZ: Infinity,
        minX: -Infinity,
        maxX: Infinity,
        minY: 0,
        maxY: 256,
    },
    meshes: {
        checkSolidCollisions: false,
        clearChachedGeometry: true,
    },
});
const init = async () => {
    const canvas = SetUpCanvas();
    const engine = SetUpEngine(canvas);
    const scene = SetUpDefaultScene(engine);
    const camera = SetUpDefaultCamera(scene, canvas, { x: 15, y: 60, z: 7 }, { x: 7, y: 30, z: 7 });
    const box = SetUpDefaultSkybox(scene);
    const bmat = DVER.render.createSkyBoxMaterial(scene);
    if (bmat) {
        box.material = bmat;
    }
    DVER.render.updateFogOptions({
        color: new BABYLON.Color3(99 / 255, 157 / 255, 216 / 255),
    });
    scene.fogDensity = 0.005;
    await DVER.$SCENEINIT({ scene: scene });
    DVER.render.setSunLevel(0.8);
    DVER.render.setBaseLevel(0.0);
    runRenderLoop(engine, scene, camera, DVER);
};
RunInit(init);
