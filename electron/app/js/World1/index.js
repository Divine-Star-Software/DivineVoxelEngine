import { SetUpEngine, SetUpCanvas, SetUpDefaultCamera, SetUpDefaultSkybox, runRenderLoop, SetUpDefaultScene, } from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers } from "../Shared/Create/index.js";
import { DVE } from "../../out/index.js";
import { Player } from "./Player/Player.js";
const workers = SetUpWorkers(import.meta.url, "./World/index.js", "../Shared/Builder/builder.js", "../Shared/FluidBuilder/fluidbuilder.js");
await DVE.$INIT({
    worldWorker: workers.worldWorker,
    builderWorker: workers.builderWorkers,
    fluidBuilderWorker: workers.fluidBuilderWorker,
    lighting: {
        doAO: true,
        doRGBLight: false,
        doSunLight: false,
        autoRGBLight: false,
        autoSunLight: false,
    },
});
const player = new Player(DVE);
const init = async () => {
    const canvas = SetUpCanvas();
    const engine = SetUpEngine(canvas);
    const scene = SetUpDefaultScene(engine);
    const camera = SetUpDefaultCamera(scene, canvas, { x: 0, y: 0.01, z: 0 });
    SetUpDefaultSkybox(scene);
    await DVE.$SCENEINIT({ scene: scene });
    DVE.renderManager.setBaseLevel(0.5);
    player.createPlayerSharedArrays();
    player.createPlayer(scene, camera);
    window.player = player;
    setInterval(() => {
        player.update();
    }, 10);
    runRenderLoop(engine, scene, player.hitbox);
};
RunInit(init);
