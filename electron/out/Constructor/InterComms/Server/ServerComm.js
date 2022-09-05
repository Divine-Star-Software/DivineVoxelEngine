import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
const serverCommBase = {
    onReady: () => { },
    onRestart: () => { },
};
const serverComm = CreateInterComm("constructor-server", serverCommBase);
export const ServerComm = serverComm;
serverComm.messageFunctions = {
    "connect-world": (data, event) => {
        if (DVEC.environment == "node") {
            const port = data[1];
            DVEC.worldComm.setPort(port);
        }
        else {
            if (!event)
                return;
            const port = event.ports[0];
            DVEC.worldComm.setPort(port);
        }
    },
    "sync-settings": (data, event) => {
        const settings = data[1];
        DVEC.syncSettings(settings);
    },
    "re-start": (data, event) => {
        DVEC.reStart();
        serverComm.onRestart();
    },
};
