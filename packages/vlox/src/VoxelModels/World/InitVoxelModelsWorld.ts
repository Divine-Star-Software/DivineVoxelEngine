import { VoxelTagStates } from "../../VoxelState/VoxelTagStates";
import { DivineVoxelEngineWorld } from "../../Contexts/World";
import { ConstructorVoxelModelSyncData } from "../../VoxelData/VoxelSyncData";
import { SchemaRegister } from "../../VoxelState/SchemaRegister";

export default function (DVEW: DivineVoxelEngineWorld) {
  DVEW.TC.registerTasks<ConstructorVoxelModelSyncData>(
    "sync-voxel-model-data",
    (data) => {
      for (const model of data.models) {
        SchemaRegister.registerModel(model.id, model.schema);
      }
      for (const voxel of data.voxels) {
        SchemaRegister.registerVoxel(voxel.id, voxel.modelId, voxel.modSchema);
      }
      VoxelTagStates.load(data.tagState);
    }
  );
}
