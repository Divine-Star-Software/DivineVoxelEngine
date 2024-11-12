import { Threads } from "@amodx/threads";
import { ThreadManager } from "../../Interfaces/Classes/ThreadManager";

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
    this.pipelines.setPorts.regiser("render", (threads) => {
      for (const comm of this.construcotrs.getThreads()) {
        this.world.connectToThread(comm);
      }

      return threads;
    });
    this.nexus.onSetPort(() => {
      this.addThread(this.nexus);
      this.pipelines.setPorts.regiser("nexus", (data) => {
        this.world.connectToThread(this.nexus);
        return data;
      });
    });
    this.dataLoader.onSetPort(() => {
      this.addThread(this.dataLoader);
      this.pipelines.setPorts.regiser("dataloader", (data) => {
        this.world.connectToThread(this.dataLoader);
        return data;
      });
    });
    this.richWorld.onSetPort(() => {
      this.addThread(this.richWorld);
      this.pipelines.setPorts.regiser("richworld", (data) => {
        this.world.connectToThread(this.richWorld);
        return data;
      });
    });
  }


}
