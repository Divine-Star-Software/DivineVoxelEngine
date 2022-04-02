import { SetUpEngine, SetUpCanvas, SetUpDefaultCamera, SetUpDefaultSkybox, runRenderLoop, SetUpDefaultScene, } from "../Shared/Babylon/index.js";
import { RunInit } from "../Shared/Create/index.js";
import { DivineVoxelEngine } from "../../out/Core/DivineVoxelEngine.js";
import { Shape1 } from "./ShapeTest/Shape1.js";
const DVE = new DivineVoxelEngine();
window.DVE = DVE;
await DVE.$INIT({
    worldWorkerPath: "../../../js/ShapeTest/World/index.js",
    builderWorkerPath: "../../../js/Shared/Builder/builder.js",
    fluidBuilderWorkerPath: "../../../js/Shared/FluidBuilder/fluidbuilder.js",
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
        DVE.meshManager.meshes["solid"]["0-0-0"] !== undefined) {
            Shape1(scene, DVE.renderManager.floraMaterial.getMaterial());
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
    await DVE.$SCENEINIT({ scene: scene });
    DVE.renderManager.setBaseLevel(1);
    runTest(scene);
    runRenderLoop(engine, scene, camera);
};
RunInit(init);
