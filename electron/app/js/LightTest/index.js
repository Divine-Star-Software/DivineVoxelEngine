import { SetUpEngine, SetUpCanvas, SetUpDarkScene, SetUpDefaultCamera, SetUpDefaultSkybox, runRenderLoop, } from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers } from "../Shared/Create/index.js";
import { DVE } from "../../out/index.js";
const workers = SetUpWorkers(import.meta.url, "./World/index.js", "../Shared/Builder/builder.js", "../Shared/FluidBuilder/fluidbuilder.js");
await DVE.$INIT({
    worldWorker: workers.worldWorker,
    builderWorker: workers.builderWorkers,
    fluidBuilderWorker: workers.fluidBuilderWorker,
});
const init = async () => {
    const canvas = SetUpCanvas();
    const engine = SetUpEngine(canvas);
    const scene = SetUpDarkScene(engine);
    const camera = SetUpDefaultCamera(scene, canvas, { x: 0, y: 150, z: 0 });
    SetUpDefaultSkybox(scene);
    await DVE.$SCENEINIT({ scene: scene });
    runRenderLoop(engine, scene, camera);
};
RunInit(init);
