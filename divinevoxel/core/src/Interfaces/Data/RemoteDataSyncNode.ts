import type {
  VoxelDataSync,
  PaletteSyncData,
  WorldDataSync,
  RegisterStringMapSync,
} from "Types/DataSync.types.js";

//objects
import { ThreadComm } from "@divinestar/threads/";

import { RemoteBinaryStructData } from "@divinestar/binary/";

import { SubstanceStruct } from "../../Data/Substance/SubstanceStruct.js";
import { DataSyncIds } from "../Common/DataSyncIds.js";
import { MappedDataRegister } from "../../Data/Register/MappedDataRegister.js";
import { VoxelPaletteReader } from "../../Data/Voxel/VoxelPalette.js";
import { SubstancePaletteReader } from "../../Data/Substance/SubstancePalette.js";
import { VoxelStruct } from "../../Data/Voxel/VoxelStruct.js";

export abstract class RemoteDataSyncNode {
  maps = {
    strings: ThreadComm.onDataSync<RegisterStringMapSync, void>(
      DataSyncIds.RegisterStringMap,
      (data) => {
        MappedDataRegister.stringMaps.sync(data[0], data[1], data[2]);
      }
    ),
    objects: ThreadComm.onDataSync<RegisterStringMapSync, void>(
      DataSyncIds.RegisterObjectMap,
      (data) => {
        MappedDataRegister.objectMaps.sync(data[0], data[1], data[2]);
      }
    ),
  };

  palettes = {
    voxel: ThreadComm.onDataSync<PaletteSyncData, any>(
      DataSyncIds.VoxelPalette,
      ([palette, map]) => {
        VoxelPaletteReader.setVoxelPalette(palette, map);
      }
    ),
    substance: ThreadComm.onDataSync<PaletteSyncData, any>(
      DataSyncIds.SubstancePalette,
      ([palette, map]) => {
        SubstancePaletteReader.setPalette(palette, map);
      }
    ),
  };

  tags = {
    voxel: ThreadComm.onDataSync<VoxelDataSync, any>(
      DataSyncIds.VoxelTags,
      (data) => {
        VoxelStruct.init(data[0]);
        VoxelStruct.sync(new Uint16Array(data[1]));
      }
    ),
    substance: ThreadComm.onDataSync<RemoteBinaryStructData, any>(
      DataSyncIds.SubstanceTags,
      (data) => {
        SubstanceStruct.init(data);
      }
    ),
  };
}
