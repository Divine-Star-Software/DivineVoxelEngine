import { ThreadComm } from "@divinestar/threads/";
import { ThreadManager } from "../../Classes/ThreadManager";
import { ConstructorThreadState } from "./ConstructorThreadState";
import { EngineSettings } from "../../../Data/Settings/EngineSettings";
import { EngineSettingsData } from "../../../Types/EngineSettings.types";

export abstract class ConstructorThreadManager extends ThreadManager {
  static instnace: ConstructorThreadManager;
  abstract state: ConstructorThreadState;
  parent = ThreadComm.parent;
  world = ThreadComm.createComm("world");

  constructor() {
    super();
    ConstructorThreadManager.instnace = this;
    this.addComm(this.world);
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
