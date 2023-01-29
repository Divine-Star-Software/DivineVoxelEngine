import { DataSync } from "../Data/DataSync.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { DVEW } from "../DivineVoxelEngineWorld.js";
export const CCM = ThreadComm.createCommManager({
    name: "constructor",
    onPortSet(port, commName) { },
});
DataSync.registerComm(CCM);
export const DataComm = ThreadComm.createComm("data-loader", {});
DataSync.registerComm(DataComm);
export const FXComm = ThreadComm.createComm("fx");
DataSync.registerComm(FXComm);
export const NexusComm = ThreadComm.createComm("nexus");
DataSync.registerComm(NexusComm, {
    materials: true,
    colliders: true,
});
export const RichWorldComm = ThreadComm.createComm("rich-world");
export const ParentComm = ThreadComm.parent;
ParentComm.listenForMessage("start", function () {
    DVEW.__serverIsDone = true;
});
ParentComm.listenForMessage("re-start", function () { });
ParentComm.listenForMessage("sync-settings", (data, event) => {
    if (!event)
        return;
    const settings = data[1];
    DVEW.syncSettings(settings);
});
