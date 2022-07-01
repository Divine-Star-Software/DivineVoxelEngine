export async function InitWorker(DVED, initData) {
    DVED.renderComm.onReady = initData.onReady;
    if (initData.onMessage) {
        DVED.renderComm.onMessage = initData.onMessage;
    }
    if (initData.onRestart) {
        DVED.renderComm.onRestart = initData.onRestart;
    }
    const renderPort = await DVED.UTIL.getWorkerPort(DVED.environment);
    DVED.renderComm.setPort(renderPort);
    await DVED.UTIL.createPromiseCheck({
        check: () => {
            return DVED.isReady();
        },
        checkInterval: 1,
    });
}
