//objects
import { DVER } from "../../DivineVoxelEngineRender.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";
const handleUpdate = (substance, data) => {
    const chunkX = data[1];
    const chunkY = data[2];
    const chunkZ = data[3];
    const chunkKey = DVER.worldBounds.getChunkKeyFromPosition(chunkX, chunkY, chunkZ);
    DVER.meshManager.handleUpdate(substance, chunkKey, data);
};
export const GetNewBuilderComm = (count, port) => {
    const newComm = CreateInterComm("render-builder-base", { ready: false });
    newComm.name = `builder-${count}`;
    newComm.messageFunctions = {
        //chunk meshes
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
    newComm.setPort(port);
    return newComm;
};
