import { DivineVoxelEngineRender } from "Contexts/Render";
import { DVEChunkMeshes } from "./DVEChunkMeshes";
export abstract class DVERenderer {
  abstract chunkMeshes: DVEChunkMeshes;
  abstract init(dver: DivineVoxelEngineRender): Promise<void>;
}
