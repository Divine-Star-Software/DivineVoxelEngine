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
        minZ: -64,
        maxZ: 64,
        minX: -64,
        maxX: 64,
        minY: 0,
        maxY: 128,
    },
});
const init = async () => {
    const canvas = SetUpCanvas();
    const engine = SetUpEngine(canvas);
    const scene = SetUpDefaultScene(engine);
    const camera = SetUpDefaultCamera(scene, canvas, { x: 0, y: 150, z: 0 });
    SetUpDefaultSkybox(scene);
    await DVER.$SCENEINIT({ scene: scene });
    DVER.renderManager.setBaseLevel(0.0);
    DVER.renderManager.setSunLevel(1);
    //DVER.renderManager.setSunLevel(0.01);
    DVER.renderManager.setBaseLevel(0.05);
    const dayNightCyle = {
        tick: 0,
        value: 0,
        max: 1000,
        direction: "up",
    };
    scene.fogColor.r = 0.01;
    scene.fogColor.g = 0.01;
    scene.fogColor.b = 0.01;
    setInterval(() => {
        if (dayNightCyle.tick <= dayNightCyle.max && dayNightCyle.direction == "up") {
            dayNightCyle.tick++;
            if (dayNightCyle.tick % 10 == 0) {
                dayNightCyle.value += 0.01;
                scene.fogColor.r += 0.01;
                scene.fogColor.g += 0.01;
                scene.fogColor.b += 0.015;
                DVER.renderManager.setSunLevel(dayNightCyle.value);
            }
            if (dayNightCyle.tick == dayNightCyle.max) {
                dayNightCyle.direction = "down";
            }
        }
        if (dayNightCyle.tick >= 0 && dayNightCyle.direction == "down") {
            dayNightCyle.tick--;
            if (dayNightCyle.tick % 10 == 0) {
                dayNightCyle.value -= 0.01;
                scene.fogColor.r -= 0.01;
                scene.fogColor.g -= 0.01;
                scene.fogColor.b -= 0.015;
                DVER.renderManager.setSunLevel(dayNightCyle.value);
            }
            if (dayNightCyle.tick == 0) {
                dayNightCyle.direction = "up";
            }
        }
    }, 15);
    runRenderLoop(engine, scene, camera, DVER);
};
RunInit(init);
