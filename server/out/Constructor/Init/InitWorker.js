import { ConstructorToWorldMessages } from "../../Constants/InterComms/ConstructorToWorld.js";
export async function InitWorker(DVEC, initData) {
    if (initData.onReady) {
        DVEC.renderComm.onReady = initData.onReady;
    }
    if (initData.onMessage) {
        DVEC.renderComm.onMessage = initData.onMessage;
    }
    if (initData.onRestart) {
        DVEC.renderComm.onRestart = initData.onRestart;
    }
    const parentPort = await DVEC.UTIL.getWorkerPort(DVEC.environment);
    if (DVEC.environment == "node") {
        DVEC.serverComm.setPort(parentPort);
    }
    else {
        DVEC.renderComm.setPort(parentPort);
    }
    DVEC.DVEB.$INIT();
    DVEC.DVEP.$INIT();
    await DVEC.UTIL.createPromiseCheck({
        check: () => {
            return DVEC.isReady();
        },
        onReady() {
            if (DVEC.environment == "browser") {
                if (DVEC.worldMatrix.threadName == "constructor-1") {
                    DVEC.worldComm.sendMessage(ConstructorToWorldMessages.syncShapeMap, [
                        DVEC.DVEB.shapeManager.shapeMap,
                    ]);
                }
            }
        },
        checkInterval: 1,
    });
}
