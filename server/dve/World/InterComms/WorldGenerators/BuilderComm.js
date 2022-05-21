import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
const builderComm = CreateInterComm("world-builder-base", { ready: false });
export const GetNewBuilderComm = (count, port) => {
    const newComm = Object.create(builderComm);
    newComm.onSetPort((port) => {
        const threadName = `builder-${count}`;
        newComm.name = threadName;
        DVEW.matrixCentralHub.registerThread(threadName, port);
        if (DVEW.engineSettings.settings.world?.voxelPaletteMode == "global") {
            DVEW.matrixCentralHub.syncGlobalVoxelPaletteInThread(threadName);
        }
    });
    newComm.setPort(port);
    return newComm;
};
