import { Threads } from "@amodx/threads/";

import { ConstructorThreadState } from "./ConstructorThreadState";
import { EngineSettings } from "../../../Data/Settings/EngineSettings";
import { EngineSettingsData } from "../../../Types/EngineSettings.types";
import { ThreadManager } from "../../../Interfaces/Classes/ThreadManager";

const world = Threads.createThread("world");

export class ConstructorThreadManager extends ThreadManager {
  static instnace: ConstructorThreadManager;
  state: ConstructorThreadState;
  parent = Threads.parent;
  world = world;

  constructor() {
    super();
    this.state = new ConstructorThreadState(this);
    ConstructorThreadManager.instnace = this;
    this.addThread(this.world);

    this.addThread(this.parent);

    Threads.registerTasks<EngineSettingsData>("sync-settings", (settings) => {
      EngineSettings.syncSettings(settings);
      this.state.settingsSynced = true;
    });
  }
}
