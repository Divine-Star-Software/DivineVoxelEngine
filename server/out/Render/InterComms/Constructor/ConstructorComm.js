//objects
import { DVER } from "../../DivineVoxelEngineRender.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";
import { ConstructorToRenderMessages } from "../../../Constants/InterComms/ConstructorToRender.js";
const handleUpdate = (substance, data) => {
    const chunkX = data[2];
    const chunkY = data[3];
    const chunkZ = data[4];
    const chunkKey = DVER.worldBounds.getChunkKeyFromPosition(chunkX, chunkY, chunkZ);
    /**
     * @TODO change over the handle update function to handle the new data index
     */
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
export const GetNewConstructorComm = (count, port) => {
    const newComm = CreateInterComm(`render-constructor-${count}`, { ready: false });
    newComm.messageFunctions[ConstructorToRenderMessages.setChunk] = (data) => {
        const substance = data[1];
        substanceFunctionMap[substance](data);
    };
    newComm.messageFunctions[ConstructorToRenderMessages.removeChunk] = (data) => {
        const substance = data[1];
        const chunkKey = DVER.worldBounds.getChunkKeyFromPosition(data[2], data[3], data[4]);
        DVER.meshManager.removeChunkMesh(substance, chunkKey);
    };
    newComm.messageFunctions[ConstructorToRenderMessages.constructEntity] = (data) => {
        DVER.meshManager.handleEntityUpdate(data[1], data[2], data[3], data);
    };
    newComm.messageFunctions[ConstructorToRenderMessages.constructItem] = (data) => {
        DVER.meshManager.handleItemUpdate(data[1], data[2], data[3], data);
    };
    newComm.setPort(port);
    return newComm;
};
