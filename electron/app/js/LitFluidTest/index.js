import { SetUpEngine, SetUpCanvas, SetUpDarkScene, SetUpDefaultCamera, SetUpDefaultSkybox, runRenderLoop, CreateWorldAxis, } from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers } from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";
RegisterTexutres(DVER);
const workers = SetUpWorkers(import.meta.url, "./World/index.js", "../Shared/Builder/builder.js", "../Shared/Propagators/propagators.js");
await DVER.$INIT({
    worldWorker: workers.worldWorker,
    builderWorker: workers.builderWorkers,
    propagationWorker: workers.propagationWorkers,
});
const init = async () => {
    const canvas = SetUpCanvas();
    const engine = SetUpEngine(canvas);
    const scene = SetUpDarkScene(engine);
    const camera = SetUpDefaultCamera(scene, canvas);
    SetUpDefaultSkybox(scene);
    CreateWorldAxis(scene, 10);
    await DVER.$SCENEINIT({ scene: scene });
    runRenderLoop(engine, scene, camera);
};
window.DVER = DVER;
RunInit(init);
