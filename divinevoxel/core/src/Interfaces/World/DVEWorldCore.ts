import { DataRegister } from "./Data/DataRegister";
import { DataSync } from "./Data/DataSync";
import { DataTagBuilders } from "./Data/DataTagBuilders";
import { WorldThreadManager } from "./Threads/WorldThreads";

export abstract class DVEWorldCore {
  static instance: DVEWorldCore;
  abstract threads: WorldThreadManager;
  abstract dataSync: DataSync;
  abstract dataRegiser: DataRegister;
  abstract dataTagBulders: DataTagBuilders;
  abstract init(): Promise<void>;
  constructor() {
    DVEWorldCore.instance = this;
  }
}
