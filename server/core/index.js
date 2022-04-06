import { WebSocketServer } from 'ws';
import { Worker } from 'worker_threads';
import { DVES } from "../dve/Server/DivineVoxelEngineServer.js";
const world = new Worker(new URL("World/index.js", import.meta.url));
(DVES).$INIT({
    worldWorker: world,
    builderWorker: [world],
    fluidBuilderWorker: world,
    nexusWorker: world,
});
const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });
    ws.send('something');
});
