import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEWG } from "../../DivineVoxelEngineWorldGeneration.js";
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
        DVEWG.worldComm.setPort(port);
    },
    "sync-settings": (data, event) => {
        const settings = data[1];
        DVEWG.syncSettings(settings);
    },
    "re-start": (data, event) => {
        DVEWG.reStart();
        renderComm.onRestart();
    },
};
