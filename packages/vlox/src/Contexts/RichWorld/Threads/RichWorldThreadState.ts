import { ThreadState } from "../../../Interfaces/Classes/ThreadState.js";
import { RichWorldThreads } from "./RichWorldThreads.js";
export class RichWorldThreadState extends ThreadState<RichWorldThreads> {
  _settingsSynced = false;

  constructor(threads: RichWorldThreads) {
    super(threads);
  }

  isReady() {
    return this.threads.world.isPortSet() && this._settingsSynced;
  }
}
