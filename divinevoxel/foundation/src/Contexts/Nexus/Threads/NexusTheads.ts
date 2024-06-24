import type { EngineSettingsData } from "@divinevoxel/core/Types/EngineSettings.types.js";
import { EngineSettings } from "@divinevoxel/core/Data/Settings/EngineSettings.js";
import { Threads } from "@amodx/threads/";
import { NexusThreadState } from "./NexusThreadState.js";
import { DataHooks } from "../../../Data/DataHooks.js";
import { ThreadManager } from "@divinevoxel/core/Interfaces/Classes/ThreadManager.js";
import { DivineVoxelEngineNexus } from "../DivineVoxelEngineNexus.js";

export const parent = Threads.parent;
export const Richworld = Threads.createThread("rich-world");
export const world = Threads.createThread("world");

export class NexusThreads extends ThreadManager {
  state = new NexusThreadState(this);
  parent = Threads.parent;
  world = Threads.createThread("world");
  NexusComm = Threads.createThread("nexus");
  DataComm = Threads.createThread("data-loader");
  ConstructorComm = Threads.createThreadPool({
    name: "constructor",
    onPortSet() {},
  });
}

Threads.registerTasks<EngineSettingsData>("sync-settings", (settings) => {
  EngineSettings.syncSettings(settings);
  DivineVoxelEngineNexus.instance.threads.state._settingsSynced = true;
  DataHooks.settingsSynced.notify(settings);
});
