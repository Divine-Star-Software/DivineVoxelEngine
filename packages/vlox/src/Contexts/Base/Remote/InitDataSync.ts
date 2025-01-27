import { Threads } from "@amodx/threads/";
import { DataSyncData } from "./DataSync.types";
import { VoxelPalette } from "../../../Voxels/Palettes/VoxelPalette";
import { SubstancePalette } from "../../../Voxels/Palettes/SubstancePalette";
import { MappedDataRegister } from "../../../Data/Register/MappedDataRegister";
import { VoxelStruct } from "../../../Voxels/Structs/VoxelStruct";
import { EngineSettings } from "../../../Settings/EngineSettings";

//objects
import { MaterialPalette } from "../../../Voxels/Palettes/MaterialPalette";
import { Chunk, Column } from "../../../World";
import { SubstanceStruct } from "../../../Voxels/Structs/SubstanceStruct";

export default function InitDataSync(props: {
  onSync(data: DataSyncData): void;
}) {
  Threads.registerTask<DataSyncData>("sync-data", (data) => {
    EngineSettings.syncSettings(data.settings);

    MaterialPalette.setPalette(data.voxels.materials.palette);

    //voxels
    VoxelPalette.loadIn(
      data.voxels.data.palette,
      data.voxels.data.nameToIdMap,
      data.voxels.data.idToNameMap
    );

    const voxelStringMaps = MappedDataRegister.stringMaps.getSegment("voxel");
    for (const key in data.voxels.data.stringMaps) {
      voxelStringMaps.add(key, data.voxels.data.stringMaps[key]);
    }
    const voxelObjectMaps = MappedDataRegister.objectMaps.getSegment("voxel");
    for (const key in data.voxels.data.objectMaps) {
      voxelObjectMaps.add(key, data.voxels.data.objectMaps[key]);
    }
    VoxelStruct.init(data.voxels.data.struct);
    VoxelStruct.sync(data.voxels.data.index);
    //substances
    SubstancePalette.setPalette(data.voxels.substances.palette);
    const substanceStringMaps =
      MappedDataRegister.stringMaps.getSegment("substance");
    for (const key in data.voxels.substances.stringMaps) {
      substanceStringMaps.add(key, data.voxels.substances.stringMaps[key]);
    }
    const substanceObjectMaps =
      MappedDataRegister.objectMaps.getSegment("substance");
    for (const key in data.voxels.substances.objectMaps) {
      substanceObjectMaps.add(key, data.voxels.substances.objectMaps[key]);
    }

    SubstanceStruct.init(data.voxels.substances.struct);

    Chunk.StateStruct.init(data.worldData.chunkStruct);
    Column.StateStruct.init(data.worldData.columnStruct);

    props.onSync(data);
  });
}
