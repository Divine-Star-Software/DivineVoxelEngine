import { SetUpEngine, SetUpCanvas, SetUpDefaultCamera, SetUpDefaultSkybox, runRenderLoop, SetUpDefaultScene, } from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers } from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";
RegisterTexutres(DVER);
const workers = SetUpWorkers(import.meta.url, "./World/world.js", "../Shared/Constructor/constructor.js");
await DVER.$INIT({
    worldWorker: workers.worldWorker,
    constructorWorker: workers.constructorWorkers,
    chunks: {
        chunkXPow2: 4,
        chunkYPow2: 7,
        chunkZPow2: 4,
        autoHeightMap: true,
    },
    world: {
        voxelPaletteMode: "global",
        minZ: -Infinity,
        maxZ: Infinity,
        minX: -Infinity,
        maxX: Infinity,
        minY: 0,
        maxY: 128,
    },
});
const init = async () => {
    const canvas = SetUpCanvas();
    const engine = SetUpEngine(canvas);
    const scene = SetUpDefaultScene(engine);
    const camera = SetUpDefaultCamera(scene, canvas, { x: 15, y: 120, z: 7 }, { x: 7, y: 30, z: 7 });
    SetUpDefaultSkybox(scene);
    await DVER.$SCENEINIT({ scene: scene });
    DVER.renderManager.setSunLevel(0.8);
    runRenderLoop(engine, scene, camera, DVER);
};
RunInit(init);
