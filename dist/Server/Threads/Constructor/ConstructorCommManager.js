//types
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
const CCMBase = ThreadComm.createCommManager({
    name: "constructor",
    onPortSet(port, commName) { },
});
const CCM = Object.assign(CCMBase, {
    $INIT() {
        CCMBase.connectToCom(ThreadComm.getComm("world"));
    },
    createConstructors(path, numBuilders = 4) {
        for (let i = 0; i <= numBuilders; i++) {
            const newWorker = new Worker(new URL(path, import.meta.url), {
                type: "module",
            });
            CCM.addPort(newWorker);
        }
    },
    setConstructors(constructors) {
        CCM.addPorts(constructors);
    },
    syncSettings(data) {
        CCM.sendMessageToAll("sync-settings", [data]);
    },
});
export const ConstructorCommManager = CCM;
