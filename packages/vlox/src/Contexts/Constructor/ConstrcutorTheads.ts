import { Threads } from "@amodx/threads/";
import { ThreadManager } from "../../Interfaces/Classes/ThreadManager";
const world = Threads.createThread("world");
export class ConstructorThreadManager extends ThreadManager {
  static instnace: ConstructorThreadManager;
  parent = Threads.parent;
  world = world;

  constructor() {
    super();
    ConstructorThreadManager.instnace = this;
    this.addThread(this.world);

    this.addThread(this.parent);
  }
}
