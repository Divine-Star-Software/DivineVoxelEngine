import type { EngineSettingsData } from "@divinevoxel/core/Types/EngineSettings.types.js";
import { EngineSettings } from "@divinevoxel/core/data/Settings/EngineSettings.js";
import { ThreadComm } from "@divinestar/threads/";
import { NexusThreadState } from "./NexusThreadState.js";
import { DataHooks } from "../../../Data/DataHooks.js";
import { ThreadManager } from "@divinevoxel/core/Interfaces/Classes/ThreadManager.js";
import { DivineVoxelEngineNexus } from "../DivineVoxelEngineNexus.js";

export const parent = ThreadComm.parent;
export const Richworld = ThreadComm.createComm("rich-world");
export const world = ThreadComm.createComm("world");

export class NexusThreads extends ThreadManager {
  state = new NexusThreadState(this);
  parent = ThreadComm.parent;
  world = ThreadComm.createComm("world");
  NexusComm = ThreadComm.createComm("nexus");
  DataComm = ThreadComm.createComm("data-loader");
  ConstructorComm = ThreadComm.createCommManager({
    name: "constructor",
    onPortSet() {},
  });
}

ThreadComm.registerTasks<EngineSettingsData>("sync-settings", (settings) => {
  EngineSettings.syncSettings(settings);
  DivineVoxelEngineNexus.instance.threads.state._settingsSynced = true;
  DataHooks.settingsSynced.notify(settings);
});
