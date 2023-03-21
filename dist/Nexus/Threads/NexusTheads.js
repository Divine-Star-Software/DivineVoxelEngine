import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { ThreadComm } from "threadcomm";
import { NexusThreadState } from "./NexusThreadState.js";
import { DataHooks } from "../../Data/DataHooks.js";
export const ParentComm = ThreadComm.parent;
export const RichWorldComm = ThreadComm.createComm("rich-world");
export const WorldComm = ThreadComm.createComm("world");
ThreadComm.registerTasks("sync-settings", (settings) => {
    EngineSettings.syncSettings(settings);
    NexusThreadState._settingsSynced = true;
    DataHooks.settingsSynced.run(settings);
});
