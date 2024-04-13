import { ThreadManager } from "./ThreadManager";

export abstract class ThreadState<Threads extends ThreadManager = ThreadManager> {
  settingsSynced = false;
  constructor(public threads: Threads) {}
  abstract isReady(): boolean;
}
