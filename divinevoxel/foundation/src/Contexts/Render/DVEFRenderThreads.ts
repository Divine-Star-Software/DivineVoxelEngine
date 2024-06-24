import { Threads } from "@amodx/threads";
import { RenderThreadManager } from "@divinevoxel/core/Interfaces/Render/Threads/RenderThreads";

export class DVEFRenderThreads extends RenderThreadManager {
  nexus = Threads.createThread("nexus");
  richWorld = Threads.createThread("rich-world");
  dataLoader = Threads.createThread("data-loader");

  constructor() {
    super();

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
