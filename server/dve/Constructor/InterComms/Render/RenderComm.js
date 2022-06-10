import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
const renderCommBase = {
    onReady: () => { },
    onRestart: () => { },
};
const renderComm = CreateInterComm("builder-render", renderCommBase);
export const RenderComm = renderComm;
renderComm.messageFunctions = {
    "connect-world": (data, event) => {
        if (!event)
            return;
        const port = event.ports[0];
        DVEC.worldComm.setPort(port);
    },
    "sync-settings": (data, event) => {
        const settings = data[1];
        DVEC.syncSettings(settings);
    },
    "re-start": (data, event) => {
        DVEC.reStart();
        renderComm.onRestart();
    },
    "sync-uv-texuture-data": (data, event) => {
        const uvTextureMap = data[1];
        DVEC.DVEB.textureManager.setUVTextureMap(uvTextureMap);
        DVEC.voxelManager.runVoxelHookForAll("texturesRegistered");
    },
};
