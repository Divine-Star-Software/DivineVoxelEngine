import { ThreadState } from "@divinevoxel/core/Interfaces/Classes/ThreadState";
import { NexusThreads } from "./NexusTheads"
export class NexusThreadState extends ThreadState<NexusThreads> {
  _settingsSynced = false;

  constructor(threads: NexusThreads) {
    super(threads);
  }

  isReady() {
    return this.threads.world.isPortSet() && this._settingsSynced;
  }
}
