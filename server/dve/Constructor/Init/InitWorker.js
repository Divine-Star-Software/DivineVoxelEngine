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
    const renderPort = await DVEC.UTIL.getWorkerPort(DVEC.environment);
    DVEC.renderComm.setPort(renderPort);
    DVEC.worldMatrix.setVoxelManager(DVEC.voxelManager);
    DVEC.DVEB.$INIT();
    DVEC.DVEP.$INIT();
    DVEC.voxelManager.setShapeMap(DVEC.DVEB.shapeManager.shapeMap);
    await DVEC.UTIL.createPromiseCheck({
        check: () => {
            return DVEC.isReady();
        },
        checkInterval: 1,
    });
}
