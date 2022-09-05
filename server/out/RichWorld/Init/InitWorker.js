export async function InitWorker(DVERW, initData) {
    if (initData.onReady) {
        DVERW.renderComm.onReady = initData.onReady;
    }
    if (initData.onMessage) {
        DVERW.renderComm.onMessage = initData.onMessage;
    }
    if (initData.onRestart) {
        DVERW.renderComm.onRestart = initData.onRestart;
    }
    const renderPort = await DVERW.UTIL.getWorkerPort(DVERW.environment);
    DVERW.renderComm.setPort(renderPort);
    await DVERW.UTIL.createPromiseCheck({
        check: () => {
            return DVERW.isReady();
        },
        checkInterval: 1,
    });
}
