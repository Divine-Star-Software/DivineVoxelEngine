import { DVED } from "../../DivineVoxelEngineData.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";
const parentCommBase = {
    onReady: () => { },
    onRestart: () => { },
};
const parentComm = CreateInterComm("data-render", parentCommBase);
export const RenderComm = parentComm;
parentComm.messageFunctions = {
    "connect-world": (data, event) => {
        if (!event)
            return;
        const port = event.ports[0];
        DVED.worldComm.setPort(port);
    },
    "sync-settings": (data, event) => {
        const settings = data[1];
        DVED.syncSettings(settings);
    },
    "re-start": (data, event) => {
        DVED.reStart();
        parentComm.onRestart();
    },
};
