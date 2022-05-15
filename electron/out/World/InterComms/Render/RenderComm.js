import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
const renderCommBase = {
    onReady: () => { },
    onRestart: () => { },
};
const renderComm = CreateInterComm("world-render", renderCommBase);
export const RenderComm = renderComm;
renderComm.messageFunctions = {
    start: function (data, event) {
        DVEW.__renderIsDone = true;
        renderComm.onReady();
    },
    "re-start": function (data, event) {
        renderComm.onRestart();
    },
    "sync-settings": (data, event) => {
        if (!event)
            return;
        const settings = event.data[1];
        DVEW.syncSettings(settings);
    },
    "connect-nexus": (data, event) => {
        if (!event)
            return;
        const port = event.ports[0];
        DVEW.nexusComm.setPort(port);
    },
    "connect-builder": (data, event) => {
        if (!event)
            return;
        const port = event.ports[0];
        // DVEW.builderComm.connectBuilder(port);
        DVEW.builderCommManager.addBuilder(port);
    },
};
