import { Threads } from "@amodx/threads/";
import { DataSyncData } from "./DataSync.types";
import { VoxelPalette } from "../../../../Data/Palettes/VoxelPalette";
import { SubstancePalette } from "../../../../Data/Palettes/SubstancePalette";
import { MappedDataRegister } from "../../../../Data/Register/MappedDataRegister";
import { VoxelStruct } from "../../../../Data/Structs/VoxelStruct";
import { SubstanceStruct } from "../../../../Data/Structs/SubstanceStruct";
import { EngineSettings } from "../../../../Settings/EngineSettings";

//objects
import { MaterialPalette } from "../../../../Data/Palettes/MaterialPalette";
import { Column, Chunk, Region } from "../../../../Data/World/Classes/index.js";

export default function InitDataSync(props: {
  onSync(data: DataSyncData): void;
}) {
  Threads.registerTasks<DataSyncData>("sync-data", (data) => {
    EngineSettings.syncSettings(data.settings);

    MaterialPalette.setPalette(data.materials.palette);

    //voxels
    VoxelPalette.loadIn(
      data.voxel.palette,
      data.voxel.nameToIdMap,
      data.voxel.idToNameMap
    );

    const voxelStringMaps = MappedDataRegister.stringMaps.getSegment("voxel");
    for (const key in data.voxel.stringMaps) {
      voxelStringMaps.add(key, data.voxel.stringMaps[key]);
    }
    const voxelObjectMaps = MappedDataRegister.objectMaps.getSegment("voxel");
    for (const key in data.voxel.objectMaps) {
      voxelObjectMaps.add(key, data.voxel.objectMaps[key]);
    }
    VoxelStruct.init(data.voxel.struct);
    VoxelStruct.sync(data.voxel.index);
    //substances
    SubstancePalette.setPalette(data.substance.palette);
    const substanceStringMaps =
      MappedDataRegister.stringMaps.getSegment("substance");
    for (const key in data.substance.stringMaps) {
      substanceStringMaps.add(key, data.substance.stringMaps[key]);
    }
    const substanceObjectMaps =
      MappedDataRegister.objectMaps.getSegment("substance");
    for (const key in data.substance.objectMaps) {
      substanceObjectMaps.add(key, data.substance.objectMaps[key]);
    }

    SubstanceStruct.init(data.substance.struct);

    Chunk.StateStruct.init(data.worldData.chunkStruct);
    Column.StateStruct.init(data.worldData.columnStruct);
    Region.StateStruct.init(data.worldData.regionStruct);

    props.onSync(data);
  });
}
