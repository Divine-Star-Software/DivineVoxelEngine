import { ThreadComm } from "@divinestar/threads";
import { RenderThreadManager } from "@divinevoxel/core/Interfaces/Render/Threads/RenderThreads";

export class DVEFRenderThreads extends RenderThreadManager {
  nexus = ThreadComm.createComm("nexus");
  richWorld = ThreadComm.createComm("rich-world");
  dataLoader = ThreadComm.createComm("data-loader");

  constructor() {
    super();

    this.nexus.onSetPort(() => {
      this.addComm(this.nexus);
      this.pipelines.setPorts.regiser("nexus", (data) => {
        this.world.connectToComm(this.nexus);
        return data;
      });
    });
    this.dataLoader.onSetPort(() => {
      this.addComm(this.dataLoader);
      this.pipelines.setPorts.regiser("dataloader", (data) => {
        this.world.connectToComm(this.dataLoader);
        return data;
      });
    });
    this.richWorld.onSetPort(() => {
      this.addComm(this.richWorld);
      this.pipelines.setPorts.regiser("richworld", (data) => {
        this.world.connectToComm(this.richWorld);
        return data;
      });
    });
  }
}
