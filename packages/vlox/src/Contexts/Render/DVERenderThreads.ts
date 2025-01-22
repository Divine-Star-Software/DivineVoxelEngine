import { Threads } from "@amodx/threads";
import { ThreadManager } from "../Base/ThreadManager";

export class DVERenderThreads extends ThreadManager {
  nexus = Threads.createThread("nexus");
  richWorld = Threads.createThread("rich-world");
  dataLoader = Threads.createThread("data-loader");
  state = {} as any;
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
    this.addThread(this.world);

  }


}
