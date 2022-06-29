export async function InitWorker(DVEC, initData) {
    DVEC.renderComm.onReady = initData.onReady;
    if (initData.onMessage) {
        DVEC.renderComm.onMessage = initData.onMessage;
    }
    if (initData.onRestart) {
        DVEC.renderComm.onRestart = initData.onRestart;
    }
    const renderPort = await DVEC.UTIL.getWorkerPort(DVEC.environment);
    DVEC.renderComm.setPort(renderPort);
    await DVEC.UTIL.createPromiseCheck({
        check: () => {
            return DVEC.isReady();
        },
        checkInterval: 1,
    });
}
