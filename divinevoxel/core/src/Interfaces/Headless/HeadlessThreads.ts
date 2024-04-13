import { ThreadComm } from "@divinestar/threads/";
import { ThreadManager } from "Interfaces/Classes/ThreadManager.js";

export abstract class HeadlessThreadManager extends ThreadManager {
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
    this.pipelines.init.regiser("render", (threads) => {
      for (const comm of this.construcotrs.__comms) {
        this.world.connectToComm(comm);
      }
      return threads;
    });
  }
}
