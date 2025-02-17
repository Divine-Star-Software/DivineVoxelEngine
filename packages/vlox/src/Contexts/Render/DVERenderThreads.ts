import { Threads } from "@amodx/threads";
import { ThreadManager } from "../Base/ThreadManager";

export class DVERenderThreads extends ThreadManager {
  nexus = Threads.createThread("nexus");
  meshers = Threads.createThreadPool("meshers");
  generators = Threads.createThreadPool("generators");
  
  parent = Threads.parent;
  world = Threads.createThread("world");

  constructor() {
    super();
    this.addThread(this.meshers);
    this.addThread(this.generators);
    this.addThread(this.parent);
    this.addThread(this.world);
  }
}
