import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types";
import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { ThreadComm } from "threadcomm";
import { FXThreadState } from "./FXThreadState.js";
import { DataHooks } from "../../Data/DataHooks.js";

export const ParentComm = ThreadComm.parent;
export const RichWorldComm = ThreadComm.createComm("rich-world");
export const WorldComm = ThreadComm.createComm("world");

ThreadComm.registerTasks<EngineSettingsData>("sync-settings", (settings) => {
 EngineSettings.syncSettings(settings);
 FXThreadState._settingsSynced = true;
 DataHooks.settingsSynced.run(settings);
});

