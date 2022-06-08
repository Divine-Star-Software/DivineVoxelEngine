import { SetUpEngine, SetUpCanvas, SetUpDefaultCamera, SetUpDefaultSkybox, runRenderLoop, SetUpDefaultScene, } from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers } from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { Shape1 } from "./ShapeTest/Shape1.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";
RegisterTexutres(DVER);
const workers = SetUpWorkers(import.meta.url, "./World/index.js", "../Shared/Builder/builder.js", "../Shared/Propagators/propagators.js", "../Shared/Constructor/constructor.js");
await DVER.$INIT({
    worldWorker: workers.worldWorker,
    builderWorker: workers.builderWorkers,
    propagationWorker: workers.propagationWorkers,
    constructorWorker: workers.constructorWorkers,
    lighting: {
        doAO: true,
        doRGBLight: false,
        doSunLight: false,
        autoRGBLight: false,
        autoSunLight: false,
    },
});
const runTest = (scene) => {
    const check = () => {
        if (
        //@ts-ignore
        DVER.meshManager.meshes["solid"]["0-0-0"] !== undefined) {
            Shape1(scene, DVER.renderManager.floraMaterial.getMaterial());
        }
        else {
            setTimeout(() => {
                check();
            }, 25);
        }
    };
    check();
};
const init = async () => {
    const canvas = SetUpCanvas();
    const engine = SetUpEngine(canvas);
    const scene = SetUpDefaultScene(engine);
    const camera = SetUpDefaultCamera(scene, canvas, { x: 0, y: 32, z: 0 }, { x: 5, y: 32, z: 5 });
    SetUpDefaultSkybox(scene);
    await DVER.$SCENEINIT({ scene: scene });
    DVER.renderManager.setBaseLevel(1);
    runTest(scene);
    runRenderLoop(engine, scene, camera);
};
RunInit(init);
