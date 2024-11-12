import { ThreadPool, Threads } from "@amodx/threads/";
import { EngineSettingsData } from "../../../Types/EngineSettings.types.js";
import { EngineSettings } from "../../../Data/Settings/EngineSettings.js";
import { WorldThreadState } from "./WorldThreadState.js";
import { ThreadManager } from "../../../Interfaces/Classes/ThreadManager.js";
import { DVEWorldProps } from "../index.js";

export class WorldThreadManager extends ThreadManager {
  constructors: ThreadPool = Threads.createThreadPool({
    name: "constructor",
    onPortSet(port, commName) {},
  });
  parent = Threads.parent;
  state: WorldThreadState;
  richWorld = Threads.createThread("rich-world");
  dataLoader = Threads.createThread("data-loader");
  nexus = Threads.createThread("nexus");

  constructor(public props: DVEWorldProps = {}) {
    super();
    this.state = new WorldThreadState(this);
    this.addThread(this.constructors);
    this.addThread(this.parent);
    Threads.registerTasks<EngineSettingsData>("sync-settings", (settings) => {
      EngineSettings.syncSettings(settings);
      this.state.settingsSynced = true;
    });
    if (props.nexusEnabled) {
      this.addThread(this.nexus);
    }
    if (props.dataLoaderEnabled) {
      this.addThread(this.dataLoader);
    }
    if (props.richWorldEnabled) {
      this.addThread(this.richWorld);
    }
  }
}
