import type {
  VoxelDataSync,
  PaletteSyncData,
  WorldDataSync,
  RegisterStringMapSync,
} from "Types/DataSync.types.js";

//objects
import { Threads } from "@amodx/threads/";

import { BinaryStructData } from "@amodx/binary/";

import { SubstanceStruct } from "../../Data/Substance/SubstanceStruct.js";
import { DataSyncIds } from "../Common/DataSyncIds.js";
import { MappedDataRegister } from "../../Data/Register/MappedDataRegister.js";
import { VoxelPalette } from "../../Data/Voxel/VoxelPalette.js";
import { SubstancePaletteReader } from "../../Data/Substance/SubstancePalette.js";
import { VoxelStruct } from "../../Data/Voxel/VoxelStruct.js";

export abstract class RemoteDataSyncNode {
  maps = {
    strings: Threads.onDataSync<RegisterStringMapSync, void>(
      DataSyncIds.RegisterStringMap,
      (data) => {
        MappedDataRegister.stringMaps.sync(data[0], data[1], data[2]);
      }
    ),
    objects: Threads.onDataSync<RegisterStringMapSync, void>(
      DataSyncIds.RegisterObjectMap,
      (data) => {
        MappedDataRegister.objectMaps.sync(data[0], data[1], data[2]);
      }
    ),
  };

  palettes = {
    voxel: Threads.onDataSync<PaletteSyncData, any>(
      DataSyncIds.VoxelPalette,
      ([palette, map, nameToId, idToName]) => {
        VoxelPalette.setVoxelIdPalette(palette, map);
        VoxelPalette.setVoxelNamePalette(nameToId, idToName);
      }
    ),
    substance: Threads.onDataSync<PaletteSyncData, any>(
      DataSyncIds.SubstancePalette,
      ([palette, map]) => {
        SubstancePaletteReader.setPalette(palette, map);
      }
    ),
  };

  tags = {
    voxel: Threads.onDataSync<VoxelDataSync, any>(
      DataSyncIds.VoxelTags,
      (data) => {
        VoxelStruct.init(data[0]);
        VoxelStruct.sync(new Uint16Array(data[1]));
      }
    ),
    substance: Threads.onDataSync<BinaryStructData, any>(
      DataSyncIds.SubstanceTags,
      (data) => {
        SubstanceStruct.init(data);
      }
    ),
  };
}
