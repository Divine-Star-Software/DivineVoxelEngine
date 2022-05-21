import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
import { WorldGenCommManager } from "./WorldGenCommManager.js";
export const GetNewWorldGenComm = (count, port) => {
    const newComm = CreateInterComm("world-world-gen-base", { ready: false });
    newComm.onSetPort((port) => {
        const threadName = `world-gen-${count}`;
        newComm.name = threadName;
        DVEW.matrixCentralHub.registerThread(threadName, port);
        if (DVEW.engineSettings.settings.world?.voxelPaletteMode == "global") {
            DVEW.matrixCentralHub.syncGlobalVoxelPaletteInThread(threadName);
        }
    });
    newComm.setPort(port);
    WorldGenCommManager.numWorldGens++;
    newComm.messageFunctions = {
        ready: (data, event) => {
            WorldGenCommManager.worldGensConnected++;
        },
        0: (data, event) => {
            const x = data[1];
            const y = data[2];
            const z = data[3];
            const substance = data[4];
            WorldGenCommManager.__addToRebuildQue(x, y, z, substance);
        },
        1: (data, event) => {
            WorldGenCommManager.__numLightUpdates--;
        }
    };
    return newComm;
};
