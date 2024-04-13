import { DVERenderCore } from "@divinevoxel/core/Interfaces/Render/DVERenderCore";
import { DVERenderer } from "@divinevoxel/core/Interfaces/Render/DVERenderer";
import { DVEFDataCore } from "../../Data/DVEFDataCore";
import { DVEFRenderThreads } from "./DVEFRenderThreads";

export abstract class DVEFRenderCore extends DVERenderCore {
  threads = new DVEFRenderThreads();
  data = new DVEFDataCore();
  abstract renderer: DVERenderer;
}
