import type {
  VoxelDataSync,
  PaletteSyncData,
  WorldDataSync,
  RegisterStringMapSync,
} from "Types/DataSync.types.js";

//objects
import { ThreadComm } from "@divinestar/threads/";

import { RemoteTagManagerInitData } from "@divinestar/binary/";

import { SubstanceTags } from "../../Data/Substance/SubstanceTags.js";
import { DataSyncIds } from "../Common/DataSyncIds.js";
import { MappedDataRegister } from "../../Data/Register/MappedDataRegister.js";
import { VoxelPaletteReader } from "../../Data/Voxel/VoxelPalette.js";
import { SubstancePaletteReader } from "../../Data/Substance/SubstancePalette.js";
import { VoxelTags } from "../../Data/Voxel/VoxelTags.js";

export abstract class RemoteDataSyncNode
 {
  maps = {
    strings: ThreadComm.onDataSync<RegisterStringMapSync, void>(
      DataSyncIds.RegisterStringMap,
      (data) => {
        MappedDataRegister.stringMaps.sync(data);
      }
    ),
    objects: ThreadComm.onDataSync<RegisterStringMapSync, void>(
      DataSyncIds.RegisterObjectMap,
      (data) => {
        MappedDataRegister.objectMaps.sync(data);
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
        VoxelTags.$INIT(data[0]);
        VoxelTags.sync(new Uint16Array(data[1]));
      }
    ),
    substance: ThreadComm.onDataSync<RemoteTagManagerInitData, any>(
      DataSyncIds.SubstanceTags,
      (data) => {
        SubstanceTags.$INIT(data);
      }
    ),
  };
}
