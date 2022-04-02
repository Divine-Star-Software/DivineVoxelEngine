import {
 SetUpEngine,
 SetUpCanvas,
 SetUpDarkScene,
 SetUpDefaultCamera,
 SetUpDefaultSkybox,
 CreateWorldAxis,
 runRenderLoop,
} from "../Shared/Babylon/index.js";
import { RunInit } from "../Shared/Create/index.js";

import { DivineVoxelEngine } from "../../out/Core/DivineVoxelEngine.js";

const DVE = new DivineVoxelEngine();
(window as any).DVE = DVE;

await DVE.$INIT({
 worldWorkerPath: "../../../js/LightDebugTest/World/index.js",
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
 const camera = SetUpDefaultCamera(scene, canvas);
 SetUpDefaultSkybox(scene);
 CreateWorldAxis(scene, 10);

 await DVE.$SCENEINIT({ scene: scene });
 DVE.renderManager.setSunLevel(1);

 runRenderLoop(engine, scene, camera);
};

RunInit(init);
