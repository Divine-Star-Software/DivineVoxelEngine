import { Threads } from "@amodx/threads/";
import { ThreadManager } from "../../Classes/ThreadManager";
import { ConstructorThreadState } from "./ConstructorThreadState";
import { EngineSettings } from "../../../Data/Settings/EngineSettings";
import { EngineSettingsData } from "../../../Types/EngineSettings.types";

const world = Threads.createThread("world");

export abstract class ConstructorThreadManager extends ThreadManager {
  static instnace: ConstructorThreadManager;
  abstract state: ConstructorThreadState;
  parent = Threads.parent;
  world = world;

  constructor() {
    super();
    ConstructorThreadManager.instnace = this;
    this.addThread(this.world);

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
