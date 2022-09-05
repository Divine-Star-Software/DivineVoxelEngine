import { CreateInterComm } from "../../../../Comms/InterComm.js";
import { DVEP } from "../../DivineVoxelEngineWorldPropagation.js";
const renderCommBase = {
    onReady: () => { },
    onRestart: () => { },
};
const renderComm = CreateInterComm("world-gen-render", renderCommBase);
export const RenderComm = renderComm;
renderComm.messageFunctions = {
    "connect-world": (data, event) => {
        if (!event)
            return;
        const port = event.ports[0];
        DVEP.worldComm.setPort(port);
    },
    "sync-settings": (data, event) => {
        const settings = data[1];
        DVEP.syncSettings(settings);
    },
    "re-start": (data, event) => {
        DVEP.reStart();
        renderComm.onRestart();
    },
};
