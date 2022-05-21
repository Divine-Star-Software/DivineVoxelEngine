import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
import { BuilderCommManager } from "./BuilderCommManager.js";
export const GetNewBuilderComm = (count, port) => {
    const newComm = CreateInterComm("world-builder-base", {
        ready: false,
    });
    newComm.onSetPort((port) => {
        const threadName = `builder-${count}`;
        newComm.name = threadName;
        DVEW.matrixCentralHub.registerThread(threadName, port);
        if (DVEW.engineSettings.settings.world?.voxelPaletteMode == "global") {
            DVEW.matrixCentralHub.syncGlobalVoxelPaletteInThread(threadName);
        }
    });
    BuilderCommManager.numBuilders++;
    newComm.setPort(port);
    newComm.messageFunctions = {
        ready: (data, event) => {
            BuilderCommManager.buildersConnected++;
        },
    };
    return newComm;
};
