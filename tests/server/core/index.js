import { Worker } from "worker_threads";
import { DVES } from "../out/Server/DivineVoxelEngineServer.js";
const world = new Worker(new URL("./World/World.js", import.meta.url));
//const nexus = new Worker(new URL("Nexus/Nexus.js", import.meta.url));
const NUM_CONSTRUCTORS = 6;
const constructors = [];
for (let i = 0; i < NUM_CONSTRUCTORS; i++) {
    constructors.push(new Worker(new URL("./Constructor/Constructor.js", import.meta.url)));
}
DVES.$INIT({
    worldWorker: world,
    constructorWorker: constructors,
    server: {
        enabled: true
    },
});
