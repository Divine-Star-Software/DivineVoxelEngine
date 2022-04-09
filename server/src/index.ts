import { WebSocketServer } from "ws";
import { Worker } from "worker_threads";
import { DVES } from "../dve/Server/DivineVoxelEngineServer.js";
const world = new Worker(new URL("World/index.js", import.meta.url));
const nexus = new Worker(new URL("Nexus/index.js", import.meta.url));
const builder = new Worker(new URL("Builder/index.js", import.meta.url));
const FluidBuilder = new Worker(new URL("FluidBuilder/index.js", import.meta.url));

DVES.$INIT({
 worldWorker: world,
 builderWorker: [world],
 fluidBuilderWorker: world,
 nexusWorker: world,
});



const arrayTest = new Float32Array(3*4);
arrayTest[0] = 10;
arrayTest[1] = 20;
arrayTest[2] = 30;

const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", function connection(ws) {
//impotant!!
 ws.binaryType = "arraybuffer";
 ws.on("message", function message(data) {

  const test2 = new Float32Array((data as any));
  console.log(test2[0]);

 });

 ws.send("something");
});
