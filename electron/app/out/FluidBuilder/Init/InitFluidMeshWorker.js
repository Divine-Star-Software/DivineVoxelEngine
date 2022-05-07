import { RegisterDefaultFluidShapes } from "../Shapes/Functions/RegisterDefaultFluidShapes.js";
export async function InitWorker(DVEFB, initData) {
    RegisterDefaultFluidShapes(DVEFB);
    DVEFB.renderComm.onReady = initData.onReady;
    if (initData.onMessage) {
        DVEFB.renderComm.onMessage = initData.onMessage;
    }
    if (initData.onRestart) {
        DVEFB.renderComm.onRestart = initData.onRestart;
    }
    if (DVEFB.environment == "browser") {
        DVEFB.renderComm.setPort(self);
    }
    if (DVEFB.environment == "node") {
        //@ts-ignore
        if (require) {
            //@ts-ignore
            const { parentPort } = require("worker_threads");
            DVEFB.renderComm.setPort(parentPort);
        }
        else {
            //@ts-ignore
            const { parentPort } = await import("worker_threads").parentPort;
            DVEFB.renderComm.setPort(parentPort);
        }
    }
    await new Promise((resolve) => {
        const inte = setInterval(() => {
            if (DVEFB.isReady()) {
                clearInterval(inte);
                resolve(true);
            }
        }, 1);
    });
}
