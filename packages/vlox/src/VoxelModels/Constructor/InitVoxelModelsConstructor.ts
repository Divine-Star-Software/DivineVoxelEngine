import { DivineVoxelEngineConstructor } from "../../Contexts/Constructor";
import { VoxelConstructorsRegister } from "../../Mesher/Constructors/Voxel/VoxelConstructorsRegister";

import { VoxelModelVoxelConstructor } from "./VoxelModelVoxelConstructor";
import { ConstructorVoxelModelSyncData } from "../VoxelModelRules.types";
import { VoxelModelConstructorRegister } from "./Register/VoxelModelConstructorRegister";
import { VoxelGeometryLookUp } from "./VoxelGeometryLookUp";
import { SchemaRegister } from "../State/SchemaRegister";

export default function (DVEC: DivineVoxelEngineConstructor) {
  VoxelGeometryLookUp.init();

  DVEC.TC.registerTasks<ConstructorVoxelModelSyncData>(
    "sync-voxel-model-data",
    (data) => {
      VoxelModelConstructorRegister.setGeometryPalette(data.geometryPalette);

      VoxelModelConstructorRegister.registerGeometry(data.geometry);
      VoxelModelConstructorRegister.registerModels(data.models);

      for (const model of data.models) {
        SchemaRegister.registerModel(model.id, model.schema);
      }

      
      for (const voxel of data.voxels) {
        SchemaRegister.registerVoxel(voxel.id, voxel.modelId, voxel.modSchema);
        VoxelConstructorsRegister.registerVoxel(
          new VoxelModelVoxelConstructor(
            voxel.id,
            VoxelModelConstructorRegister.models.get(voxel.modelId)!,
            voxel
          )
        );
      }
    }
  );
}
