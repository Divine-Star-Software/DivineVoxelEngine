import {
 SetUpEngine,
 SetUpCanvas,
 SetUpDefaultCamera,
 SetUpDefaultSkybox,
 runRenderLoop,
 SetUpDarkScene,
} from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers } from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";

RegisterTexutres(DVER);

const workers = SetUpWorkers(
 import.meta.url,
 "./World/world.js",
 "../Shared/Builder/builder.js",
 "../Shared/Propagators/propagators.js"
);

await DVER.$INIT({
 worldWorker: workers.worldWorker,
 builderWorker: workers.builderWorkers,
 propagationWorker: workers.propagationWorkers,
});

const init = async () => {
 const canvas = SetUpCanvas();
 const engine = SetUpEngine(canvas);
 const scene = SetUpDarkScene(engine);
 const camera = SetUpDefaultCamera(scene, canvas, { x: 0, y: 100, z: 0 });
 SetUpDefaultSkybox(scene);

 await DVER.$SCENEINIT({ scene: scene });
 DVER.renderManager.setBaseLevel(0.5);



 runRenderLoop(engine, scene, camera);
};

RunInit(init);
