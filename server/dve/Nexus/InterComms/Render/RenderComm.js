import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEN } from "../../DivineVoxelEngineNexus.js";
const parentCommBase = {
    onReady: () => { },
    onRestart: () => { },
};
const parentComm = CreateInterComm("nexus-render", parentCommBase);
export const RenderComm = parentComm;
parentComm.messageFunctions = {
    "connect-world": (data, event) => {
        if (!event)
            return;
        const port = event.ports[0];
        DVEN.worldComm.setPort(port);
    },
    "sync-settings": (data, event) => {
        const settings = data[1];
        DVEN.syncSettings(settings);
    },
};
