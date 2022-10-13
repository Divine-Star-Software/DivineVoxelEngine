import { WorldTasks } from "../../Constants/InterComms/WorldTasks.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
export async function InitWorker(DVEC, initData) {
    DVEC.settings.setContext("DVEC");
    await ThreadComm.$INIT("constructor");
    DVEC.DVEB.$INIT();
    DVEC.DVEP.$INIT();
    await DVEC.UTIL.createPromiseCheck({
        check: () => {
            return DVEC.isReady();
        },
        onReady() {
            if (DVEC.environment == "browser") {
                if (DVEC.worldMatrix.threadName == "constructor-1") {
                    DVEC.worldComm.sendMessage(WorldTasks.syncShapeMap, [
                        DVEC.DVEB.shapeManager.shapeMap,
                    ]);
                }
            }
        },
        checkInterval: 1,
    });
}
