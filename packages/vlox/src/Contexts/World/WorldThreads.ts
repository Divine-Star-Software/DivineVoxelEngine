import { Threads } from "@amodx/threads/";
import { ThreadManager } from "../Base/ThreadManager.js";

export class WorldThreadManager extends ThreadManager {
  constructors = Threads.createThreadPool("constructor");
  parent = Threads.parent;
  nexus = Threads.createThread("nexus");

  constructor() {
    super();
    this.addThread(this.constructors);
    this.addThread(this.parent);
  }
}
