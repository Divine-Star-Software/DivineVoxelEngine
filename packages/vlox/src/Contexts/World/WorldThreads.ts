import { Threads } from "@amodx/threads/";
import { ThreadManager } from "../Base/ThreadManager.js";

export class WorldThreadManager extends ThreadManager {
  meshers = Threads.createThreadPool("meshers");
  generators = Threads.createThreadPool("generators");
  
  parent = Threads.parent;
  nexus = Threads.createThread("nexus");

  constructor() {
    super();
    this.addThread(this.meshers);
    this.addThread(this.generators);
    this.addThread(this.parent);
  }
}
