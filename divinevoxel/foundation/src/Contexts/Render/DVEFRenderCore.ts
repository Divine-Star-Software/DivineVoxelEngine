import { DVERenderCore } from "@divinevoxel/core/Interfaces/Render/DVERenderCore";
import { DVERenderer } from "@divinevoxel/core/Interfaces/Render/DVERenderer";
import { DVEFDataCore } from "../../Data/DVEFDataCore";
import { DVEFRenderThreads } from "./DVEFRenderThreads";

export type DVEFRenderCoreProps = {
  nexusWorker?: Worker;
  richWorldWorker?: Worker;
  dataLoaderWorker?: Worker;
};

export abstract class DVEFRenderCore extends DVERenderCore {
  
  threads = new DVEFRenderThreads();
  data = new DVEFDataCore();
  abstract renderer: DVERenderer;
  constructor(props: DVEFRenderCoreProps = {}) {
    super();
    if (props.nexusWorker) {
      this.threads.nexus.setPort(props.nexusWorker);
      this.threads.addComm(this.threads.nexus);
    }
    if (props.richWorldWorker) {
      this.threads.richWorld.setPort(props.richWorldWorker);
      this.threads.addComm(this.threads.richWorld);
    }
    if (props.dataLoaderWorker) {
      this.threads.dataLoader.setPort(props.dataLoaderWorker);
      this.threads.addComm(this.threads.dataLoader);
    }
  }
}
