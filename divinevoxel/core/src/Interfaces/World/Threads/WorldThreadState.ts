import { ThreadState } from "../../Classes/ThreadState";

export class WorldThreadState extends ThreadState {
  isReady() {
    return this.settingsSynced;
  }
}
