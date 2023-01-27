import { SetUpEngine, SetUpCanvas, SetUpDefaultCamera, SetUpDefaultSkybox, runRenderLoop, SetUpDefaultScene, } from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers, } from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";
RegisterTexutres(DVER);
const workers = SetUpWorkers(import.meta.url, "./World/world.js", "../Shared/Constructor/constructor.js");
window.DVER = DVER;
await DVER.$INIT({
    worldWorker: workers.worldWorker,
    constructorWorker: workers.constructorWorkers,
    chunks: {
        chunkXPow2: 4,
        chunkYPow2: 4,
        chunkZPow2: 4,
        autoHeightMap: true,
    },
    world: {
        minZ: -Infinity,
        maxZ: Infinity,
        minX: -Infinity,
        maxX: Infinity,
        minY: 0,
        maxY: 100,
    },
});
DVER.render.updateFogOptions({
    color: new BABYLON.Vector3(0.1, 0.1, 0.1),
});
const init = async () => {
    const canvas = SetUpCanvas();
    const engine = SetUpEngine(canvas);
    const scene = SetUpDefaultScene(engine);
    const camera = SetUpDefaultCamera(scene, canvas, { x: 0, y: 40, z: 0 });
    const box = SetUpDefaultSkybox(scene);
    const bmat = DVER.render.createSkyBoxMaterial(scene);
    if (bmat) {
        box.material = bmat;
    }
    await DVER.$SCENEINIT({ scene: scene });
    DVER.render.setSunLevel(0.5);
    //DVER.render.setSunLevel(0.01);
    DVER.render.setBaseLevel(0.05);
    const dayNightCyle = {
        tick: 0,
        value: 0,
        max: 1000,
        direction: "up",
    };
    scene.fogColor.r = 0.6;
    scene.fogColor.g = 0.6;
    scene.fogColor.b = 0.6;
    /*  setInterval(() => {
     if (dayNightCyle.tick <= dayNightCyle.max && dayNightCyle.direction == "up") {
      dayNightCyle.tick++;
      if (dayNightCyle.tick % 10 == 0) {
       dayNightCyle.value += 0.01;
       scene.fogColor.r += 0.01;
       scene.fogColor.g += 0.01;
       scene.fogColor.b += 0.015;
       DVER.render.setSunLevel(dayNightCyle.value);
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
       DVER.render.setSunLevel(dayNightCyle.value);
      }
      if (dayNightCyle.tick == 0) {
       dayNightCyle.direction = "up";
      }
     }
    }, 15); */
    runRenderLoop(engine, scene, camera, DVER);
};
RunInit(init);
