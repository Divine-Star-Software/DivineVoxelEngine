import { LocationData } from "Math/index.js";

import { BinaryStructData } from "@amodx/binary";
import { EngineSettingsData } from "../../../../Settings/EngineSettings.types";
import { CachedVoxelModelData } from "../../../../Cache/Cache.types";

export type DataSyncMapsData = {
  stringMaps: Record<string, string[]>;
  objectMaps: Record<string, any[]>;
};
export type DataSyncStringPaletteData = {
  palette: string[];
};

export type DataSyncData = {
  settings: EngineSettingsData;
  modelData?: CachedVoxelModelData;
  threads: {
    nexus: boolean;
  };
  worldData: {
    chunkStruct: BinaryStructData;
    columnStruct: BinaryStructData;
    regionStruct: BinaryStructData;
  };
  voxel: {
    struct: BinaryStructData;
    index: Uint16Array;
    nameToIdMap: Record<string, string>;
    idToNameMap: Record<string, string>;
  } & DataSyncMapsData &
    DataSyncStringPaletteData;

  substance: {
    struct: BinaryStructData;
  } & DataSyncMapsData &
    DataSyncStringPaletteData;

  materials: {} & DataSyncStringPaletteData;
};
export type WorldDataSync = [location: LocationData, buffer: SharedArrayBuffer];
