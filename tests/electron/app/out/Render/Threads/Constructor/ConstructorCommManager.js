import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
const CCMBase = ThreadComm.createCommManager({
    name: "constructor",
    onPortSet(port, commName) { },
});
const CCM = Object.assign(CCMBase, {
    $INIT(dasta) {
        const worldComm = ThreadComm.getComm("world");
        for (const constructor of CCM.__comms) {
            worldComm.connectToComm(constructor);
            constructor.runTasks("sync-uv-texuture-data", dasta);
        }
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
