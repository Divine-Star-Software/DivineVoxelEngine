import { Threads,ThreadPool,Thread } from "@amodx/threads";
import { ThreadState } from "../../../Interfaces/Classes/ThreadState";

export class WorldThreadState extends ThreadState {
  isReady() {

    return this.settingsSynced && this.threads.comms.every((_) => _.isReady());
  }
}
