import { Hooks } from "../Libs/Hooks/Hooks.js";
import { LocationData } from "Meta/Data/CommonTypes.js";
import { SetRichVoxel } from "Meta/Data/RichWorldData.types.js";
import { DimensionData } from "Meta/Data/DimensionData.types.js";

export const DataHooks = {
 dimension: {
  onRegisterDimension: Hooks.getSyncHook<DimensionData, void>(),
 },
 chunk: {
  onGetAsync: Hooks.getAsyncHook<LocationData, SharedArrayBuffer>(),
  onGetSync: Hooks.getSyncHook<LocationData, SharedArrayBuffer>(),
  onNew: Hooks.getAsyncHook<LocationData, void>(),
  onRemove: Hooks.getSyncHook<LocationData, void>(),
 },
 column: {
  onGetAsync: Hooks.getAsyncHook<LocationData, SharedArrayBuffer>(),
  onGetSync: Hooks.getSyncHook<LocationData, SharedArrayBuffer>(),
  onNew: Hooks.getAsyncHook<LocationData, void>(),
  onRemove: Hooks.getSyncHook<LocationData, void>(),
 },
 region: {
  onGetAsync: Hooks.getAsyncHook<LocationData, SharedArrayBuffer>(),
  onGetSync: Hooks.getSyncHook<LocationData, SharedArrayBuffer>(),
  onNew: Hooks.getAsyncHook<LocationData, void>(),
  onRemove: Hooks.getSyncHook<LocationData, void>(),
 },
 paint: {
  onAddToRGBUpdate: Hooks.getSyncHook<LocationData, void>(),
  onRichVoxelPaint: Hooks.getSyncHook<[id:string,location : LocationData], void>(),
 },
};
