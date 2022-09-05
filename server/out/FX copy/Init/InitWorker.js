export async function InitWorker(DVEFX, initData) {
    if (initData.onReady) {
        DVEFX.renderComm.onReady = initData.onReady;
    }
    if (initData.onMessage) {
        DVEFX.renderComm.onMessage = initData.onMessage;
    }
    if (initData.onRestart) {
        DVEFX.renderComm.onRestart = initData.onRestart;
    }
    const renderPort = await DVEFX.UTIL.getWorkerPort(DVEFX.environment);
    DVEFX.renderComm.setPort(renderPort);
    await DVEFX.UTIL.createPromiseCheck({
        check: () => {
            return DVEFX.isReady();
        },
        checkInterval: 1,
    });
}
