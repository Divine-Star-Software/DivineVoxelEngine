import { DVEDataCore } from "Interfaces/Data/DVEDataCore";
import { RenderThreadManager } from "./Threads/RenderThreads";
import { DVECore } from "../DVECore";
import { DVERenderer } from "./DVERenderer";

export abstract class DVERenderCore extends DVECore {
  abstract threads: RenderThreadManager;
  abstract data: DVEDataCore;
  abstract renderer: DVERenderer;
}
