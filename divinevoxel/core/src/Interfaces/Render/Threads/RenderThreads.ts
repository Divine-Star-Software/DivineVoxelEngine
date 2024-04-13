import { ThreadComm } from "@divinestar/threads/";
import { ThreadManager } from "../../../Interfaces/Classes/ThreadManager.js";

export abstract class RenderThreadManager extends ThreadManager {
  state = {} as any;
  construcotrs = ThreadComm.createCommManager({
    name: "constructor",
    onPortSet(port, commName) {},
  });
  parent = ThreadComm.parent;
  world = ThreadComm.createComm("world");

  constructor() {
    super();
    this.addComm(this.construcotrs);
    this.addComm(this.parent);
    this.addComm(this.world);
    this.pipelines.setPorts.regiser("render", (threads) => {
      for (const comm of this.construcotrs.__comms) {
        this.world.connectToComm(comm);
  
      }

      return threads;
    });
  }
}
