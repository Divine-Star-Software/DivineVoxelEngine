//types
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
//objects
import { DVER } from "../../DivineVoxelEngineRender.js";
//functions
import { ConstructorToRenderMessages } from "../../../Constants/InterComms/ConstructorToRender.js";
const CCMBase = ThreadComm.createCommManager({
    name: "constructor",
    onPortSet(port, commName) { },
});
const handleUpdate = (substance, data) => {
    const chunkX = data[2];
    const chunkY = data[3];
    const chunkZ = data[4];
    const chunkKey = DVER.worldBounds.getChunkKeyFromPosition(chunkX, chunkY, chunkZ);
    DVER.meshManager.handleChunkUpdate(substance, chunkKey, data);
};
const substanceFunctionMap = {
    0: (data) => {
        handleUpdate("solid", data);
    },
    1: (data) => {
        handleUpdate("flora", data);
    },
    2: (data) => {
        handleUpdate("fluid", data);
    },
    3: (data) => {
        handleUpdate("magma", data);
    },
};
CCMBase.listenForMessage(ConstructorToRenderMessages.setChunk, (data) => {
    const substance = data[1];
    substanceFunctionMap[substance](data);
});
CCMBase.listenForMessage(ConstructorToRenderMessages.removeChunk, (data) => {
    const substance = data[1];
    const chunkKey = DVER.worldBounds.getChunkKeyFromPosition(data[2], data[3], data[4]);
    DVER.meshManager.removeChunkMesh(substance, chunkKey);
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
            /*    const channel = new MessageChannel();
            DVER.worldComm.sendMessage(
             "connect-constructor",
             [constructor.name],
             [channel.port1]
            );
            constructor.sendMessage("connect-world", [], [channel.port2]); */
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
