import type {
  VoxelDataSync,
  PaletteSyncData,
  WorldDataSync,
  RegisterStringMapSync,
} from "Types/Data/DataSync.types.js";
import type { LocationData } from "@divinestar/voxelspaces";
import type { DimensionData } from "Types/Data/DimensionData.types.js";
//objects
import { ThreadComm } from "@divinestar/threads/";
import { WorldRegister } from "./World/WorldRegister.js";
import { DataSyncIds } from "../Common/Threads/Contracts/DataSyncIds.js";
import { VoxelPaletteReader } from "./Voxel/VoxelPalette.js";
import { DimensionsRegister } from "./World/Dimensions/DimensionsRegister.js";
import { VoxelTags } from "./Voxel/VoxelTags.js";
import { MappedDataRegister } from "./Register/MappedDataRegister.js";
import {
  RegionHeaderRegister,
  RegionHeaderTags,
} from "./Register/RegionHeaderRegister.js";
import { RemoteTagManagerInitData } from "@divinestar/binary/";
import { SubstancePaletteReader } from "./Substance/SubstancePalette.js";
import { SubstanceTags } from "./Substance/SubstanceTags.js";
import { Column, Chunk, Region } from "./World/Classes/index.js";

export const DataSyncNode = {
  maps: {
    strings: ThreadComm.onDataSync<RegisterStringMapSync, void>(
      DataSyncIds.registerStringMap,
      (data) => {
        MappedDataRegister.stringMaps.sync(data);
      }
    ),
    objects: ThreadComm.onDataSync<RegisterStringMapSync, void>(
      DataSyncIds.registerObjectMap,
      (data) => {
        MappedDataRegister.objectMaps.sync(data);
      }
    ),
  },

  palettes: {
    voxel: ThreadComm.onDataSync<PaletteSyncData, any>(
      DataSyncIds.voxelPalette,
      ([palette, map]) => {
        VoxelPaletteReader.setVoxelPalette(palette, map);
      }
    ),
    substance: ThreadComm.onDataSync<PaletteSyncData, any>(
      DataSyncIds.substancePalette,
      ([palette, map]) => {
        SubstancePaletteReader.setPalette(palette, map);
      }
    ),
  },
  worldData: {
    dimension: ThreadComm.onDataSync<DimensionData, void>(
      DataSyncIds.dimesnion,
      (data) => {
        DimensionsRegister.registerDimension(data.id, data.options);
      }
    ),
    chunk: ThreadComm.onDataSync<[LocationData, Chunk], LocationData>(
      DataSyncIds.chunk,
      (data) => {
        WorldRegister.chunk.add(data[0], data[1]);
      },
      (data) => {
        WorldRegister.chunk.remove(data);
      }
    ),
    column: ThreadComm.onDataSync<[LocationData, Column], LocationData>(
      DataSyncIds.column,
      (data) => {
        WorldRegister.column.add(data[0], data[1]);
      },
      (data) => {
        WorldRegister.column.remove(data);
      }
    ),
    region: ThreadComm.onDataSync<[LocationData, Region], LocationData>(
      DataSyncIds.region,
      (data) => {
        WorldRegister.region.add(data[0], data[1]);
      },
      (data) => {
        WorldRegister.region.remove(data);
      }
    ),
    regionHeader: ThreadComm.onDataSync<WorldDataSync, LocationData>(
      DataSyncIds.regionHeader,
      (data) => {
        RegionHeaderRegister.add(data[0], data[1]);
      },
      (data) => {
        RegionHeaderRegister.remove(data);
      }
    ),
  },
  tags: {
    voxel: ThreadComm.onDataSync<VoxelDataSync, any>(
      DataSyncIds.voxelTags,
      (data) => {
        VoxelTags.$INIT(data[0]);
        VoxelTags.sync(new Uint16Array(data[1]));
      }
    ),
    substance: ThreadComm.onDataSync<RemoteTagManagerInitData, any>(
      DataSyncIds.substanceTags,
      (data) => {
        SubstanceTags.$INIT(data);
      }
    ),
    chunk: ThreadComm.onDataSync<RemoteTagManagerInitData, void>(
      DataSyncIds.chunkTags,
      (data) => {
        Chunk.Tags.$INIT(data);
      }
    ),
    column: ThreadComm.onDataSync<RemoteTagManagerInitData, void>(
      DataSyncIds.columnTags,
      (data) => {
        Column.Tags.$INIT(data);
      }
    ),
    region: ThreadComm.onDataSync<RemoteTagManagerInitData[], void>(
      DataSyncIds.regionTags,
      (data) => {
        Region.Tags.$INIT(data[0]);
        RegionHeaderTags.$INIT(data[1]);
      }
    ),
  },
};
