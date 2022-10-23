import { Hooks } from "../Libs/Hooks/Hooks.js";
import { LocationData } from "Meta/Data/CommonTypes.js";

export const DataHooks = {
 chunk: {
  onGetAsync: Hooks.getAsyncHook<LocationData, SharedArrayBuffer>(),
  onGetSync: Hooks.getSyncHook<LocationData, SharedArrayBuffer>(),
  onNew: Hooks.getAsyncHook<LocationData, void>(),
 },
 paint: {
  addToRGBUpdate: Hooks.getSyncHook<LocationData, void>(),
  onNuild: Hooks.getSyncHook<LocationData, void>(),
 },
};
