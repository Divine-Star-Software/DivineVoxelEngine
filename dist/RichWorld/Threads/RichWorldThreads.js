import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { ThreadComm } from "threadcomm";
import { RichWorldThreadState } from "./RichWorldThreadState.js";
import { DataHooks } from "../../Data/DataHooks.js";
const parentComm = ThreadComm.parent;
export const ParentComm = parentComm;
const worldComm = ThreadComm.createComm("world");
export const WorldComm = worldComm;
ThreadComm.registerTasks("sync-settings", (settings) => {
    EngineSettings.syncSettings(settings);
    RichWorldThreadState._settingsSynced = true;
    DataHooks.settingsSynced.run(settings);
});
