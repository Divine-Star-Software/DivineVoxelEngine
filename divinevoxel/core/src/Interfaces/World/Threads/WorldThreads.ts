import { ThreadPool, Threads } from "@amodx/threads/";
import { EngineSettingsData } from "../../../Types/EngineSettings.types.js";
import { EngineSettings } from "../../../Data/Settings/EngineSettings.js";
import { WorldThreadState } from "./WorldThreadState.js";
import { ThreadManager } from "../../../Interfaces/Classes/ThreadManager.js";
export abstract class WorldThreadManager extends ThreadManager {
  abstract state: WorldThreadState;
  constructors: ThreadPool = Threads.createThreadPool({
    name: "constructor",
    onPortSet(port, commName) {},
  });
  parent = Threads.parent;

  constructor() {
    super();
    this.addThread(this.constructors);
    this.addThread(this.parent);
    Threads.registerTasks<EngineSettingsData>(
      "sync-settings",
      (settings) => {

        EngineSettings.syncSettings(settings);
        this.state.settingsSynced = true;
      }
    );
  }
}
