import { Threads } from "@amodx/threads/";
import { ThreadManager } from "../Base/ThreadManager";
const world = Threads.createThread("world");
export class MesherThreadsManager extends ThreadManager {
  static instnace: MesherThreadsManager;
  parent = Threads.parent;
  world = world;

  constructor() {
    super();
    MesherThreadsManager.instnace = this;
    this.addThread(this.world);
    this.addThread(this.parent);
  }
}
