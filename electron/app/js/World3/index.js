import { SetUpEngine, SetUpCanvas, SetUpDefaultCamera, SetUpDefaultSkybox, runRenderLoop, SetUpDarkScene, } from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers } from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";
RegisterTexutres(DVER);
const workers = SetUpWorkers(import.meta.url, "./World/index.js", "../Shared/Builder/builder.js", "../Shared/Propagators/propagators.js", "../Shared/Constructor/constructor.js");
await DVER.$INIT({
    worldWorker: workers.worldWorker,
    builderWorker: workers.builderWorkers,
    propagationWorker: workers.propagationWorkers,
    constructorWorker: workers.constructorWorkers,
});
const init = async () => {
    const canvas = SetUpCanvas();
    const engine = SetUpEngine(canvas);
    const scene = SetUpDarkScene(engine);
    const camera = SetUpDefaultCamera(scene, canvas, { x: -10, y: 15, z: -10 }, { x: 0, y: 14, z: 0 });
    SetUpDefaultSkybox(scene);
    //need this for meshes that are not part of the engnie
    const light = new BABYLON.HemisphericLight("", new BABYLON.Vector3(0, 1, 0), scene);
    await DVER.$SCENEINIT({ scene: scene });
    DVER.renderManager.setBaseLevel(0);
    runRenderLoop(engine, scene, camera);
};
RunInit(init);
