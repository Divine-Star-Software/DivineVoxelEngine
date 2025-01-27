import { Threads } from "@amodx/threads";
import { ThreadManager } from "../Base/ThreadManager";

export class DVERenderThreads extends ThreadManager {
  nexus = Threads.createThread("nexus");
  construcotrs = Threads.createThreadPool("constructor");
  parent = Threads.parent;
  world = Threads.createThread("world");

  constructor() {
    super();
    this.addThread(this.construcotrs);
    this.addThread(this.parent);
    this.addThread(this.world);
  }
}
