import { AsyncHook } from "./Classes/AsyncHook.js";
import { SyncHook } from "./Classes/SyncHook.js";
export const Hooks = {
 getAsyncHook<T, K>() {
  return new AsyncHook<T, K>();
 },

 getSyncHook<T, K>() {
  return new SyncHook<T, K>();
 },
};
