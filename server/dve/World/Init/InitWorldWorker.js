export async function InitWorldWorker(DVEW, initData) {
    DVEW.renderComm.onReady = initData.onReady;
    if (initData.onMessage) {
        DVEW.renderComm.onMessage = initData.onMessage;
    }
    if (initData.onRestart) {
        DVEW.renderComm.onRestart = initData.onRestart;
    }
    const renderPort = await DVEW.UTIL.getWorkerPort(DVEW.environment);
    DVEW.renderComm.setPort(renderPort);
    await DVEW.UTIL.createPromiseCheck({ check: DVEW.isReady, checkInterval: 1 });
}
