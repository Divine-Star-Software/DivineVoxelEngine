import { SetUpEngine, SetUpCanvas, SetUpDarkScene, SetUpDefaultCamera, SetUpDefaultSkybox, runRenderLoop, CreateWorldAxis, } from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers } from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";
RegisterTexutres(DVER);
const workers = SetUpWorkers(import.meta.url, "./World/world.js", "../Shared/Constructor/constructor.js");
await DVER.$INIT({
    worldWorker: workers.worldWorker,
    constructorWorker: workers.constructorWorkers,
    world: {
        minY: -16
    },
    lighting: {
        doAO: true,
        doRGBLight: true,
        doSunLight: false,
        autoRGBLight: true,
        autoSunLight: false,
    },
});
const init = async () => {
    const canvas = SetUpCanvas();
    const engine = SetUpEngine(canvas);
    const scene = SetUpDarkScene(engine);
    const camera = SetUpDefaultCamera(scene, canvas, { x: -32, y: 16, z: 16 }, { x: -32, y: 16, z: 0 });
    SetUpDefaultSkybox(scene);
    CreateWorldAxis(scene, 20);
    await DVER.$SCENEINIT({ scene: scene });
    DVER.render.setBaseLevel(.2);
    runRenderLoop(engine, scene, camera, DVER);
};
window.DVER = DVER;
RunInit(init);
