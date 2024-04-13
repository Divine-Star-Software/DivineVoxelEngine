import { ThreadState } from "@divinevoxel/core/Interfaces/Classes/ThreadState.js";
import { DataLoaderThreads } from "./DataLoaderThreads.js";
export class DataLoaderThreadState extends ThreadState<DataLoaderThreads> {
  _settingsSynced = false;

  constructor(threads: DataLoaderThreads) {
    super(threads);
  }

  isReady() {
    return this.threads.world.isPortSet() && this._settingsSynced;
  }
}
