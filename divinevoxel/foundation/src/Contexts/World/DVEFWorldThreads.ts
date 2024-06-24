import { WorldThreadManager } from "@divinevoxel/core/Interfaces/World/Threads/WorldThreads";
import { DVEFWorldThreadState } from "./DVEFWorldThreadState";
import { Threads } from "@amodx/threads/";
import { DVEFWorldCore } from "./DVEFWorldCore";
export class DVEFWorldThreads extends WorldThreadManager {
  state: DVEFWorldThreadState;
  richWorld = Threads.createThread("rich-world");
  dataLoader = Threads.createThread("data-loader");
  nexus = Threads.createThread("nexus");

  constructor(public core: DVEFWorldCore) {
    super();

    this.state = new DVEFWorldThreadState(this);
    if (core.props.nexusEnabled) {
      this.addThread(this.nexus);

    }
    if (core.props.dataLoaderEnabled) {
      this.addThread(this.dataLoader);
    }
    if (core.props.richWorldEnabled) {
      this.addThread(this.richWorld);
    }
  }
}
