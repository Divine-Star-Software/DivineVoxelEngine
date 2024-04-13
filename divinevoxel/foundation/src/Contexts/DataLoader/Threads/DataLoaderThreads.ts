import type { EngineSettingsData } from "@divinevoxel/core/Types/EngineSettings.types.js";
import { EngineSettings } from "@divinevoxel/core/Data/Settings/EngineSettings.js";
import { ThreadComm } from "@divinestar/threads/";
import { DataLoaderThreadState } from "./DataLoaderThreadState.js";
import { ThreadManager } from "@divinevoxel/core/Interfaces/Classes/ThreadManager.js";
import { DataHooks } from "../../../Data/DataHooks.js";
import { DivineVoxelEngineDataLoader } from "../DivineVoxelEngineDataLoader.js";

export class DataLoaderThreads extends ThreadManager {
  parent = ThreadComm.parent;
  Richworld = ThreadComm.createComm("rich-world");
  world = ThreadComm.createComm("world");
  state = new DataLoaderThreadState(this);
}

ThreadComm.registerTasks<EngineSettingsData>("sync-settings", (settings) => {
  EngineSettings.syncSettings(settings);
  DivineVoxelEngineDataLoader.instance.threads.state._settingsSynced = true;
  DataHooks.settingsSynced.notify(settings);
});
