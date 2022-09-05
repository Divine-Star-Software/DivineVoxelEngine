export async function InitNexusWorker(DVEN, initData) {
    const renderPort = await DVEN.UTIL.getWorkerPort(DVEN.environment);
    DVEN.renderComm.setPort(renderPort);
    await DVEN.UTIL.createPromiseCheck({ check: DVEN.isReady, checkInterval: 1 });
}
