import {
 SetUpEngine,
 SetUpCanvas,
 SetUpDarkScene,
 SetUpDefaultCamera,
 SetUpDefaultSkybox,
 runRenderLoop,
} from "../Shared/Babylon/index.js";
import { RunInit } from "../Shared/Create/index.js";
import { DivineVoxelEngine } from "../../out/Core/DivineVoxelEngine.js";

const DVE = new DivineVoxelEngine();
(window as any).DVE = DVE;

await DVE.$INIT({
 worldWorkerPath: "../../../js/SunLightTest/World/index.js",
 builderWorkerPath: "../../../js/Shared/Builder/builder.js",
 fluidBuilderWorkerPath: "../../../js/Shared/FluidBuilder/fluidbuilder.js",
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
