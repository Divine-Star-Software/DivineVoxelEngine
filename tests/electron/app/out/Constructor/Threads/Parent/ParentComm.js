import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
const parentComm = ThreadComm.parent;
parentComm.listenForMessage("connect-world", (data, event) => {
    if (!event)
        return;
    const port = event.ports[0];
    DVEC.worldComm.setPort(port);
});
parentComm.listenForMessage("sync-settings", (data, event) => {
    const settings = data[1];
    DVEC.syncSettings(settings);
});
parentComm.listenForMessage("re-start", (data, event) => {
    DVEC.reStart();
});
parentComm.listenForMessage("sync-uv-texuture-data", (data, event) => {
    const uvTextureMap = data[1];
    const overlayUVTextureMap = data[2];
    DVEC.builder.textureManager.setUVTextureMap(uvTextureMap);
    DVEC.builder.textureManager.setOverlayUVTextureMap(overlayUVTextureMap);
    DVEC.voxelManager.runVoxelHookForAll("texturesRegistered");
    DVEC.itemManager.runItemHookForAll("texturesRegistered");
    DVEC.builder.textureManager.releaseTextureData();
    DVEC.voxelManager.removeVoxelHookForAll("texturesRegistered");
    DVEC.itemManager.removeItemHookForAll("texturesRegistered");
});
export const ParentComm = parentComm;
