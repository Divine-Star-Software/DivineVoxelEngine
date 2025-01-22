import { LocationData } from "../Math/index.js";
import { ChunkProcessor } from "./Processors/ChunkProcessor.js";
import { MesherManager } from "./Meshers/MesherManager.js";
import { BuildNodeMesh } from "./Tasks/BuidlerTasks.types.js";
import { RenderedSubstances } from "./Substances/RenderedSubstances.js";
import { DataSyncData } from "../Data/Types/DataSync.types.js";

export class DVEMesher {
  static instance: DVEMesher;
  chunkProcessor = new ChunkProcessor();
  nodes = MesherManager;
  constructor() {
    if (!DVEMesher.instance) DVEMesher.instance = this;

    return DVEMesher.instance;
  }

  init(data: DataSyncData) {
    for (const mat of data.materials.rendered) {
      RenderedSubstances.add(mat);
    }
  }
  meshChunk(location: LocationData, LOD = 1, priority = 0) {
    this.chunkProcessor.build(location);
    return true;
  }
}
