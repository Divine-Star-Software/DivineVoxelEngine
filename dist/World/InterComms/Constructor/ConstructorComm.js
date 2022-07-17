import { ConstructorToWorldMessages } from "../../../Constants/InterComms/ConstructorToWorld.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
export const GetNewConstructorComm = (count, port) => {
    const threadName = `constructor-${count}`;
    const newComm = CreateInterComm(threadName, {
        ready: false,
    });
    newComm.onSetPort((port) => {
        newComm.name = threadName;
        DVEW.matrixCentralHub.registerThread(threadName, port);
        DVEW.matrixCentralHub.syncGlobalVoxelPaletteInThread(threadName);
    });
    newComm.setPort(port);
    DVEW.constructorCommManager.numConstructors++;
    newComm.messageFunctions = {
        ready: (data, event) => {
            DVEW.constructorCommManager.constructorsConnected++;
        },
    };
    newComm.messageFunctions[ConstructorToWorldMessages.addToRebuildQue] = (data) => {
        const x = data[1];
        const y = data[2];
        const z = data[3];
        const substance = data[4];
        DVEW.queues.addToRebuildQue(x, y, z, substance);
    };
    newComm.messageFunctions[ConstructorToWorldMessages.runRebuildQue] = (data) => {
        DVEW.queues.runRebuildQue();
    };
    newComm.messageFunctions[ConstructorToWorldMessages.addToRGBLightUpdateQue] = (data) => {
        const x = data[1];
        const y = data[2];
        const z = data[3];
        DVEW.queues.addToRGBUpdateQue(x, y, z);
    };
    return newComm;
};
