import { SetUpEngine, SetUpCanvas, SetUpDarkScene, SetUpDefaultCamera, SetUpDefaultSkybox, runRenderLoop, } from "../Shared/Babylon/index.js";
import { RunInit } from "../Shared/Create/index.js";
import { DivineVoxelEngine } from "../../out/Core/DivineVoxelEngine.js";
const DVE = new DivineVoxelEngine();
window.DVE = DVE;
await DVE.$INIT({
    worldWorkerPath: "../../../js/LightUpdateTest/World/index.js",
    builderWorkerPath: "../../../js/Shared/Builder/builder.js",
    fluidBuilderWorkerPath: "../../../js/Shared/FluidBuilder/fluidbuilder.js",
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
    const camera = SetUpDefaultCamera(scene, canvas, { x: 20, y: 10, z: -10 }, { x: 8, y: 0, z: 8 });
    SetUpDefaultSkybox(scene);
    await DVE.$SCENEINIT({ scene: scene });
    runRenderLoop(engine, scene, camera);
};
RunInit(init);
