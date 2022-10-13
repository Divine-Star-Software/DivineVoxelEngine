//types
import { DVES } from "../../DivineVoxelEngineServer.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
const CCMBase = ThreadComm.createCommManager({
    name: "render-constructor",
    onPortSet(port, commName) { },
});
const CCM = Object.assign(CCMBase, {
    $INIT() {
        for (const constructor of CCM.__comms) {
            const channel = new MessageChannel();
            DVES.worldComm.sendMessage("connect-constructor", [constructor.name], [channel.port1]);
            constructor.sendMessage("connect-world", [], [channel.port2]);
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
