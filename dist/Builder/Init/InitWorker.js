import { RegisterDefaultShapes } from "../Shapes/Functions/RegisterDefaultShapes.js";
export async function InitWorker(DVEB, initData) {
    RegisterDefaultShapes(DVEB.shapeManager, DVEB.shapeHelper);
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
