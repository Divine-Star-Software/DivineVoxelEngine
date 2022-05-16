export async function InitNexusWorker(DVEN, onReady, onMessage, onRestart) {
    if (DVEN.environment == "browser") {
        DVEN.renderComm.setPort(self);
    }
    if (DVEN.environment == "node") {
        //@ts-ignore
        if (require) {
            //@ts-ignore
            const { parentPort } = require("worker_threads");
            DVEN.renderComm.setPort(parentPort);
        }
        else {
            //@ts-ignore
            const { parentPort } = await import("worker_threads").parentPort;
            DVEN.renderComm.setPort(parentPort);
        }
    }
    await new Promise((resolve) => {
        const inte = setInterval(() => {
            if (DVEN.isReady()) {
                clearInterval(inte);
                resolve(true);
            }
        }, 1);
    });
}
