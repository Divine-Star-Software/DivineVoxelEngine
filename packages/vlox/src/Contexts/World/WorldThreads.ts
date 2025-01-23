import { ThreadPool, Threads } from "@amodx/threads/";
import { ThreadManager } from "../Base/ThreadManager.js";

export class WorldThreadManager extends ThreadManager {
  constructors: ThreadPool = Threads.createThreadPool({
    name: "constructor",
    onPortSet(port, commName) {},
  });
  parent = Threads.parent;

  nexus = Threads.createThread("nexus");

  constructor() {
    super();
    this.addThread(this.constructors);
    this.addThread(this.parent);
  }
}
