import { RegisterDefaultShapes } from "../Shapes/Functions/RegisterDefaultShapes.js";
export async function InitWorker(DVEB, initData) {
    RegisterDefaultShapes(DVEB);
    DVEB.voxelManager.setShapeMap(DVEB.shapeManager.shapeMap);
    DVEB.renderComm.onReady = initData.onReady;
    if (initData.onMessage) {
        DVEB.renderComm.onMessage = initData.onMessage;
    }
    if (initData.onRestart) {
        DVEB.renderComm.onRestart = initData.onRestart;
    }
    const renderPort = await DVEB.UTIL.getWorkerPort(DVEB.environment);
    DVEB.renderComm.setPort(renderPort);
    await DVEB.UTIL.createPromiseCheck({ check: DVEB.isReady, checkInterval: 1 });
}
