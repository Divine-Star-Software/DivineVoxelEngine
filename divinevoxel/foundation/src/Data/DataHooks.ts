import { Observable } from "@divinestar/utils/Observers/index.js";
import { AsyncPipeline, Pipeline } from "@divinestar/utils/Pipelines/";
import type { LocationData } from "@divinevoxel/core/Math/index.js";
import { DimensionData } from "./Types/DimensionData.types";
import { EngineSettingsData } from "@divinevoxel/core/Types/EngineSettings.types";
import { Chunk, Column, Region } from "./World/Classes/index.js";

export const DataHooks = {
  dimension: {
    onRegisterDimension: new Pipeline<DimensionData>(),
  },
  chunk: {
    onGetAsync: new AsyncPipeline<{
      location: LocationData;
      chunk: Chunk | null;
    }>(),
    onGetSync: new Pipeline<{ location: LocationData; chunk: Chunk | null }>(),
    onNew: new Observable<LocationData>(),
    onRemove: new Observable<LocationData>(),
  },
  column: {
    onGetAsync: new AsyncPipeline<{
      location: LocationData;
      column: Column | null;
    }>(),
    onGetSync: new Pipeline<{
      location: LocationData;
      column: Column | null;
    }>(),
    onNew: new Observable<LocationData>(),
    onRemove: new Observable<LocationData>(),
  },
  region: {
    onGetAsync: new AsyncPipeline<{
      location: LocationData;
      region: Region | null;
    }>(),
    onGetSync: new Pipeline<{
      location: LocationData;
      region: Region | null;
    }>(),
    onNew: new Observable<LocationData>(),
    onRemove: new Observable<LocationData>(),
  },
  paint: {
    onAddToRGBUpdate: new Observable<LocationData>(),
    onRichVoxelPaint: new Observable<[id: string, location: LocationData]>(),
  },
  settingsSynced: new Observable<EngineSettingsData>(),
};
