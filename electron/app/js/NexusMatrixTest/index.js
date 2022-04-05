import { SetUpEngine, SetUpCanvas, SetUpDefaultCamera, SetUpDefaultSkybox, runRenderLoop, SetUpDarkScene, } from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers } from "../Shared/Create/index.js";
import { DVE } from "../../out/index.js";
import { RegisterEntitiesInCore } from "../Shared/Functions/RegisterEntitesInCore.js";
RegisterEntitiesInCore(DVE);
const workers = SetUpWorkers(import.meta.url, "./World/index.js", "../Shared/Builder/builder.js", "../Shared/FluidBuilder/fluidbuilder.js", "./Nexus/index.js");
await DVE.$INIT({
    worldWorker: workers.worldWorker,
    builderWorker: workers.builderWorkers,
    fluidBuilderWorker: workers.fluidBuilderWorker,
    nexusWorker: workers.nexusWorker,
    nexus: {
        enabled: true,
    },
});
const init = async () => {
    const canvas = SetUpCanvas();
    const engine = SetUpEngine(canvas);
    const scene = SetUpDarkScene(engine);
    const camera = SetUpDefaultCamera(scene, canvas, { x: -10, y: 15, z: -10 }, { x: 0, y: 14, z: 0 });
    SetUpDefaultSkybox(scene);
    //need this for meshes that are not part of the engnie
    const light = new BABYLON.HemisphericLight("", new BABYLON.Vector3(0, 1, 0), scene);
    await DVE.$SCENEINIT({ scene: scene });
    runRenderLoop(engine, scene, camera);
};
RunInit(init);
