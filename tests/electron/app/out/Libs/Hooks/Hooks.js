import { AsyncHook } from "./Classes/AsyncHook.js";
import { SyncHook } from "./Classes/SyncHook.js";
export const Hooks = {
    getAsyncHook() {
        return new AsyncHook();
    },
    getSyncHook() {
        return new SyncHook();
    },
};
