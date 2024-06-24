import { Threads } from "@amodx/threads/";
import { ThreadManager } from "Interfaces/Classes/ThreadManager.js";

export abstract class HeadlessThreadManager extends ThreadManager {
  construcotrs = Threads.createThreadPool({
    name: "constructor",
    onPortSet(port, commName) {},
  });
  parent = Threads.parent;
  world = Threads.createThread("world");

  constructor() {
    super();
    this.addThread(this.construcotrs);
    this.addThread(this.parent);
    this.pipelines.init.regiser("render", (threads) => {
      for (const comm of this.construcotrs.getThreads()) {
        this.world.connectToThread(comm);
      }
      return threads;
    });
  }
}
