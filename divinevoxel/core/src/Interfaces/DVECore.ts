import { ThreadManager } from "./Classes/ThreadManager";
import { DVEDataCore } from "./Data/DVEDataCore";

export abstract class DVECore {
  abstract threads: ThreadManager;
  abstract data: DVEDataCore;

  abstract init(): Promise<void>;
}
