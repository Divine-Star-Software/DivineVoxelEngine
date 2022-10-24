import { AsyncHook } from "./Classes/AsyncHook.js";
import { SyncHook } from "./Classes/SyncHook.js";
export declare const Hooks: {
    getAsyncHook<T, K>(): AsyncHook<T, K>;
    getSyncHook<T_1, K_1>(): SyncHook<T_1, K_1>;
};
