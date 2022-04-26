import { RegisterDefaultShapes } from "../Shapes/Functions/RegisterDefaultShapes.js";
export async function InitWorker(DVEB, initData) {
    RegisterDefaultShapes(DVEB.shapeManager, DVEB.shapeHelper);
    /*  addEventListener("message", (event: MessageEvent) => {
      const data = event.data;
      const message = data[0];
    
      if (message == "connect-world") {
       const port = event.ports[0];
    
       port.onmessage = (event: MessageEvent) => {
        messageFromWorld(event);
       };
    
       port.postMessage(["connect-shape-map", DVEB.shapeManager.shapeMap]);
      }
      if (message == "re-start") {
       DVEB.reStart();
      }
      if (message == "sync-settings") {
        const settings = data[1];
        DVEB.syncSettings(settings);
        return;
       }
     }); */
    const messageFromWorld = (event) => {
        const data = event.data;
        DVEB.builder.buildChunkMesh(data[0], data[1], data[2], data[3], new Uint16Array(data[4]), new Uint8Array(data[5]), new Uint16Array(data[6]), new Uint16Array(data[7]), new Float32Array(data[8]), new Float32Array(data[9]), new Float32Array(data[10]));
    };
    DVEB.renderComm.onReady = initData.onReady;
    if (initData.onMessage) {
        DVEB.renderComm.onMessage = initData.onMessage;
    }
    if (initData.onRestart) {
        DVEB.renderComm.onRestart = initData.onRestart;
    }
    if (DVEB.environment == "browser") {
        DVEB.renderComm.setPort(self);
    }
    if (DVEB.environment == "node") {
        //@ts-ignore
        if (require) {
            //@ts-ignore
            const { parentPort } = require("worker_threads");
            DVEB.renderComm.setPort(parentPort);
        }
        else {
            //@ts-ignore
            const { parentPort } = await import("worker_threads").parentPort;
            DVEB.renderComm.setPort(parentPort);
        }
    }
    await new Promise((resolve) => {
        const inte = setInterval(() => {
            if (DVEB.isReady()) {
                clearInterval(inte);
                resolve(true);
            }
        }, 1);
    });
}
