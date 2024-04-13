import type { EngineSettingsData } from "@divinevoxel/core/Types/EngineSettings.types.js";
import { EngineSettings } from "@divinevoxel/core/Data/Settings/EngineSettings.js";
import { ThreadComm } from "@divinestar/threads/";
import { RichWorldThreadState } from "./RichWorldThreadState.js";
import { DataHooks } from "../../../Data/DataHooks.js";
import { ThreadManager } from "@divinevoxel/core/Interfaces/Classes/ThreadManager.js";
import { DivineVoxelEngineRichWorld } from "../DivineStarVoxelEngineRichWorld.js";

export class RichWorldThreads extends ThreadManager {
  state = new RichWorldThreadState(this);
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
  DivineVoxelEngineRichWorld.instance.threads.state._settingsSynced = true;
  DataHooks.settingsSynced.notify(settings);
});
