import { ThreadComm } from "@divinestar/threads";
import { RenderThreadManager } from "@divinevoxel/core/Interfaces/Render/Threads/RenderThreads";

export class DVEFRenderThreads extends RenderThreadManager {
  nexus = ThreadComm.createComm("nexus");
  richWorld = ThreadComm.createComm("rich-world");
}
