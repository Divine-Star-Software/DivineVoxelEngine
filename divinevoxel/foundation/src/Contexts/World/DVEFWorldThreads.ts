import { WorldThreadManager } from "@divinevoxel/core/Interfaces/World/Threads/WorldThreads";
import { DVEFWorldThreadState } from "./DVEFWorldThreadState";

export class DVEFWorldThreads extends WorldThreadManager {
  state: DVEFWorldThreadState;
  constructor() {
    super();
    this.state = new DVEFWorldThreadState(this);
  }
}
