import { WorldThreadManager } from "@divinevoxel/core/Interfaces/World/Threads/WorldThreads";
import { DVEFWorldThreadState } from "./DVEFWorldThreadState";
import { ThreadComm } from "@divinestar/threads/";
import { DVEFWorldCore } from "./DVEFWorldCore";
export class DVEFWorldThreads extends WorldThreadManager {
  state: DVEFWorldThreadState;
  richWorld = ThreadComm.createComm("rich-world");
  dataLoader = ThreadComm.createComm("data-loader");
  nexus = ThreadComm.createComm("nexus");

  constructor(public core: DVEFWorldCore) {
    super();

    this.state = new DVEFWorldThreadState(this);
    if (core.props.nexusEnabled) {
      this.addComm(this.nexus);

    }
    if (core.props.dataLoaderEnabled) {
      this.addComm(this.dataLoader);
    }
    if (core.props.richWorldEnabled) {
      this.addComm(this.richWorld);
    }
  }
}
