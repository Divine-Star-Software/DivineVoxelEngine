import { SetUpEngine, SetUpCanvas, SetUpDarkScene, SetUpDefaultCamera, SetUpDefaultSkybox, CreateWorldAxis, runRenderLoop, } from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers } from "../Shared/Create/index.js";
import { DVE } from "../../out/index.js";
const workers = SetUpWorkers(import.meta.url, "./World/index.js", "../Shared/Builder/builder.js", "../Shared/FluidBuilder/fluidbuilder.js");
await DVE.$INIT({
    worldWorker: workers.worldWorker,
    builderWorker: workers.builderWorkers,
    fluidBuilderWorker: workers.fluidBuilderWorker,
    lighting: {
        doAO: true,
        doRGBLight: true,
        doSunLight: true,
        autoRGBLight: true,
        autoSunLight: true,
    },
});
const init = async () => {
    const canvas = SetUpCanvas();
    const engine = SetUpEngine(canvas);
    const scene = SetUpDarkScene(engine);
    const camera = SetUpDefaultCamera(scene, canvas);
    SetUpDefaultSkybox(scene);
    CreateWorldAxis(scene, 10);
    await DVE.$SCENEINIT({ scene: scene });
    DVE.renderManager.setSunLevel(1);
    runRenderLoop(engine, scene, camera);
};
RunInit(init);
