import { DivineVoxelEngineRender } from "Contexts/Render";
import { DVESectionMeshes } from "./Classes/DVESectionMeshes";
export abstract class DVERenderer {
  abstract sectorMeshes: DVESectionMeshes;
  abstract init(dver: DivineVoxelEngineRender): Promise<void>;
}
