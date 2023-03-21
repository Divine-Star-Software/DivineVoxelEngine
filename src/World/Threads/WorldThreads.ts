import { DataSync } from "../Data/DataSync.js";
import { ThreadComm } from "threadcomm/";
import { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types.js";
import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { WorldThreadState } from "./WorldThreadState.js";
import { DataHooks } from "../../Data/DataHooks.js";

export const CCM = ThreadComm.createCommManager({
 name: "constructor",
 onPortSet(port, commName) {},
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
DataSync.registerComm(RichWorldComm);

export const ParentComm = ThreadComm.parent;

ThreadComm.registerTasks<EngineSettingsData>("sync-settings", (settings) => {
 EngineSettings.syncSettings(settings);
 WorldThreadState._settingsSynced = true;
 DataHooks.settingsSynced.run(settings);
});

