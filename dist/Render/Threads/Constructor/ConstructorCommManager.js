//types
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
//objects
import { DVER } from "../../DivineVoxelEngineRender.js";
//functions
import { ConstructorToRenderMessages } from "../../../Common/Threads/Contracts/ConstructorToRender.js";
const CCMBase = ThreadComm.createCommManager({
    name: "constructor",
    onPortSet(port, commName) { },
});
CCMBase.listenForMessage(ConstructorToRenderMessages.constructEntity, (data) => {
    DVER.meshManager.handleEntityUpdate(data[1], data[2], data[3], data);
});
CCMBase.listenForMessage(ConstructorToRenderMessages.constructItem, (data) => {
    DVER.meshManager.handleItemUpdate(data[1], data[2], data[3], data);
});
const CCM = Object.assign(CCMBase, {
    $INIT() {
        const worldComm = ThreadComm.getComm("world");
        for (const constructor of CCM.__comms) {
            constructor.onMessage((event) => {
                console.log(event.data);
            });
            worldComm.connectToComm(constructor);
            constructor.sendMessage("sync-uv-texuture-data", [
                DVER.textureManager.uvTextureMap,
                DVER.textureManager.overlayUVTextureMap,
            ]);
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
