import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
export const GetNewBuilderComm = (count, port) => {
    const threadName = `builder-${count}`;
    const newComm = CreateInterComm(threadName, {
        ready: false,
    });
    newComm.onSetPort((port) => {
        DVEW.matrixCentralHub.registerThread(threadName, port);
        if (DVEW.engineSettings.settings.world?.voxelPaletteMode == "global") {
            DVEW.matrixCentralHub.syncGlobalVoxelPaletteInThread(threadName);
        }
    });
    DVEW.builderCommManager.numBuilders++;
    newComm.setPort(port);
    newComm.messageFunctions = {
        ready: (data, event) => {
            DVEW.builderCommManager.buildersConnected++;
        },
        0: (data, event) => {
            DVEW.queues._numChunksRebuilding--;
        },
    };
    return newComm;
};
