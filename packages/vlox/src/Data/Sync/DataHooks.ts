import { Observable } from "@amodx/core/Observers/index.js";
import {  Pipeline } from "@amodx/core/Pipelines/";
import type { LocationData } from "../../Math/index.js";
import { DimensionData } from "../Types/DimensionData.types.js";
import { EngineSettingsData } from "../../Settings/EngineSettings.types.js";
import { Chunk, ChunkData, Column, ColumnData, Region, RegionData } from "../World/Classes/index.js";

export const DataHooks = {
  dimension: {
    onRegisterDimension: new Pipeline<DimensionData>(),
  },
  chunk: {
    onGetAsync: new Pipeline<{
      location: LocationData;
      chunk: ChunkData | null;
    }>(),
    onGetSync: new Pipeline<{ location: LocationData; chunk: ChunkData | null }>(),
    onNew: new Observable<LocationData>(),
    onRemove: new Observable<LocationData>(),
  },
  column: {
    onGetAsync: new Pipeline<{
      location: LocationData;
      column: ColumnData | null;
    }>(),
    onGetSync: new Pipeline<{
      location: LocationData;
      column: ColumnData | null;
    }>(),
    onNew: new Observable<LocationData>(),
    onRemove: new Observable<LocationData>(),
  },
  region: {
    onGetAsync: new Pipeline<{
      location: LocationData;
      region: RegionData | null;
    }>(),
    onGetSync: new Pipeline<{
      location: LocationData;
      region: RegionData | null;
    }>(),
    onNew: new Observable<LocationData>(),
    onRemove: new Observable<LocationData>(),
  },
  paint: {
    onRichVoxelPaint: new Observable<[id: string, location: LocationData]>(),
  },
  settingsSynced: new Observable<EngineSettingsData>(),
};
