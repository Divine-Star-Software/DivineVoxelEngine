import { LocationData } from "Math/index.js";

import { BinaryStructData } from "@amodx/binary";
import { EngineSettingsData } from "Settings/EngineSettings.types";
import { CachedVoxelModelData } from "Cache/Cache.types";

export type DataSyncMapsData = {
  stringMaps: Record<string, string[]>;
  objectMaps: Record<string, any[]>;
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
    palette: string[];
    map: Record<string, number>;
    nameToIdMap: Record<string, string>;
    idToNameMap: Record<string, string>;
  } & DataSyncMapsData;

  substance: {
    struct: BinaryStructData;
    palette: string[];
    map: Record<string, number>;
    stringMaps: Record<string, string[]>;
    objectMaps: Record<string, any[]>;
  } & DataSyncMapsData;

  materials: {
    rendered: string[];
  };
};
export type WorldDataSync = [location: LocationData, buffer: SharedArrayBuffer];
