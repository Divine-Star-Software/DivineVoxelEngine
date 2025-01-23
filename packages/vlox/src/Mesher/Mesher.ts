import { LocationData } from "../Math/index.js";
import { ChunkProcessor } from "./Processors/ChunkProcessor.js";
import { MesherManager } from "./Meshers/MesherManager.js";
import { BuildNodeMesh } from "./Tasks/BuidlerTasks.types.js";
import { RenderedSubstances } from "./Substances/RenderedSubstances.js";
import { DataSyncData } from "../Contexts/Base/Remote/Sync/DataSync.types.js";
import { VoxelModelConstructorRegister } from "./Models/VoxelModelConstructorRegister.js";
import { LiquidGeometryNode } from "./Models/Nodes/Custom/Liquid/LiquidGeomtryNode.js";
import { SchemaRegister } from "../Voxels/State/SchemaRegister.js";
import { VoxelTagStates } from "../Voxels/State/VoxelTagStates.js";
import { VoxelConstructor } from "./Models/VoxelConstructor.js";

export class DVEMesher {
  static instance: DVEMesher;
  chunkProcessor = new ChunkProcessor();
  nodes = MesherManager;
  constructor() {
    if (!DVEMesher.instance) DVEMesher.instance = this;

    return DVEMesher.instance;
  }

  init(data: DataSyncData) {
    for (const mat of data.materials.palette) {
      RenderedSubstances.add(mat);
    }
    if (data.modelData) {
      const modelData = data.modelData;
      VoxelModelConstructorRegister.registerCustomNode(
        "liquid",
        LiquidGeometryNode
      );
      VoxelModelConstructorRegister.setGeometryPalette(
        modelData.geometryPalette
      );

      VoxelModelConstructorRegister.registerGeometry(modelData.geometry);
      VoxelModelConstructorRegister.registerModels(modelData.models);

      for (const model of modelData.models) {
        SchemaRegister.registerModel(model.id, model.schema);
      }

      for (const voxel of modelData.voxels) {
        SchemaRegister.registerVoxel(voxel.id, voxel.modelId, voxel.modSchema);
      }
      VoxelTagStates.load(modelData.tagState);

      for (const voxel of modelData.voxels) {
        VoxelModelConstructorRegister.registerVoxel(
          new VoxelConstructor(
            voxel.id,
            VoxelModelConstructorRegister.modelData.get(voxel.modelId)!,
            voxel
          )
        );
      }
    }
  }
  meshChunk(location: LocationData, LOD = 1, priority = 0) {
    this.chunkProcessor.build(location);
    return true;
  }
}
