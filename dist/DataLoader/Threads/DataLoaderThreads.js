import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { ThreadComm } from "threadcomm";
import { DataLoaderThreadState } from "./DataLoaderThreadState.js";
const parentComm = ThreadComm.parent;
export const ParentComm = parentComm;
const worldComm = ThreadComm.createComm("world");
export const WorldComm = worldComm;
ThreadComm.registerTasks("sync-settings", (settings) => {
    DataLoaderThreadState._settingsSynced = true;
    EngineSettings.syncSettings(settings);
});
