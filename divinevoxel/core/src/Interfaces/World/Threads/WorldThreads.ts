import { CommManager, ThreadComm } from "@divinestar/threads/";
import { EngineSettingsData } from "../../../Types/EngineSettings.types.js";
import { EngineSettings } from "../../../Data/Settings/EngineSettings.js";
import { WorldThreadState } from "./WorldThreadState.js";
import { ThreadManager } from "../../../Interfaces/Classes/ThreadManager.js";
export abstract class WorldThreadManager extends ThreadManager {
  abstract state: WorldThreadState;
  constructors: CommManager = ThreadComm.createCommManager({
    name: "constructor",
    onPortSet(port, commName) {},
  });
  parent = ThreadComm.parent;

  constructor() {
    super();
    this.addComm(this.constructors);
    this.addComm(this.parent);
    ThreadComm.registerTasks<EngineSettingsData>(
      "sync-settings",
      (settings) => {

        EngineSettings.syncSettings(settings);
        this.state.settingsSynced = true;
      }
    );
  }
}
