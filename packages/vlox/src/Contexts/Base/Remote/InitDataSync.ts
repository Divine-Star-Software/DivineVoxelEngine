import { Threads } from "@amodx/threads/";
import { DataSyncData } from "./DataSync.types";
import { EngineSettings } from "../../../Settings/EngineSettings";

//objects
import { SchemaRegister } from "../../../Voxels/State/SchemaRegister";
import { VoxelTagStates } from "../../../Voxels/Data/VoxelTagStates";
import { VoxelPalettesRegister } from "../../../Voxels/Data/VoxelPalettesRegister";
import { VoxelTagsRegister } from "../../../Voxels/Data/VoxelTagsRegister";

export default function InitDataSync(props: {
  onSync(data: DataSyncData): void;
}) {
  Threads.registerTask<DataSyncData>("sync-data", (data) => {
    EngineSettings.syncSettings(data.settings);

    VoxelPalettesRegister.voxels.load(data.voxels.data.palette);
    VoxelTagsRegister.VoxelTags = data.voxels.data.tags;

    VoxelPalettesRegister.voxelIdToNameMap = new Map(
      data.voxels.data.idToNameMap
    );
    VoxelPalettesRegister.voxelNametoIdMap = new Map(
      data.voxels.data.nameToIdMap
    );

    VoxelPalettesRegister.substance.load(data.voxels.substances.palette);
    VoxelTagsRegister.SubstanceStags = data.voxels.substances.tags;

    VoxelPalettesRegister.material.load(data.voxels.materials.palette);

    const modelData = data.voxels.models;
    for (const model of modelData.models) {
      SchemaRegister.registerModel(model.id, model.schema);
    }
    for (const voxel of modelData.voxels) {
      SchemaRegister.registerVoxel(voxel.id, voxel.modelId, voxel.modSchema);
    }
    VoxelTagStates.load(modelData.tagState);

    props.onSync(data);
  });
}
