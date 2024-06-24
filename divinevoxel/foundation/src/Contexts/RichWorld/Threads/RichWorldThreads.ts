import type { EngineSettingsData } from "@divinevoxel/core/Types/EngineSettings.types.js";
import { EngineSettings } from "@divinevoxel/core/Data/Settings/EngineSettings.js";
import { Threads } from "@amodx/threads/";
import { RichWorldThreadState } from "./RichWorldThreadState.js";
import { DataHooks } from "../../../Data/DataHooks.js";
import { ThreadManager } from "@divinevoxel/core/Interfaces/Classes/ThreadManager.js";
import { DivineVoxelEngineRichWorld } from "../DivineStarVoxelEngineRichWorld.js";

export class RichWorldThreads extends ThreadManager {
  state = new RichWorldThreadState(this);
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
  DivineVoxelEngineRichWorld.instance.threads.state._settingsSynced = true;
  DataHooks.settingsSynced.notify(settings);
});
