import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { ThreadComm } from "threadcomm";
import { RichWorldThreadState } from "./RichWorldThreadState.js";
import { DataHooks } from "../../Data/DataHooks.js";
export const ParentComm = ThreadComm.parent;
export const WorldComm = ThreadComm.createComm("world");
export const NexusComm = ThreadComm.createComm("nexus");
export const FXComm = ThreadComm.createComm("fx");
export const DataComm = ThreadComm.createComm("data-loader");
export const ConstructorComm = ThreadComm.createCommManager({
    name: "constructor",
    onPortSet() { },
});
ThreadComm.registerTasks("sync-settings", (settings) => {
    EngineSettings.syncSettings(settings);
    RichWorldThreadState._settingsSynced = true;
    DataHooks.settingsSynced.run(settings);
});
