import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
export const GetNewWorldGenComm = (count, port) => {
    const threadName = `world-gen-${count}`;
    const newComm = CreateInterComm(threadName, {
        ready: false,
    });
    newComm.onSetPort((port) => {
        newComm.name = threadName;
        DVEW.matrixCentralHub.registerThread(threadName, port);
        if (DVEW.engineSettings.settings.world?.voxelPaletteMode == "global") {
            DVEW.matrixCentralHub.syncGlobalVoxelPaletteInThread(threadName);
        }
    });
    newComm.setPort(port);
    DVEW.worldGenCommManager.numWorldGens++;
    newComm.messageFunctions = {
        ready: (data, event) => {
            DVEW.worldGenCommManager.worldGensConnected++;
        },
        0: (data, event) => {
            const x = data[1];
            const y = data[2];
            const z = data[3];
            const substance = data[4];
            DVEW.queues.addToRebuildQue(x, y, z, substance);
        },
        1: (data, event) => {
            DVEW.queues._numRGBLightUpdates--;
        },
        2: (data, event) => {
            DVEW.queues._numRGBLightRemoves--;
        },
    };
    return newComm;
};
