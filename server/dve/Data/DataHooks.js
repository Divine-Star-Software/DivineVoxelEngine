import { Hooks } from "../Libs/Hooks/Hooks.js";
export const DataHooks = {
    chunk: {
        onGetAsync: Hooks.getAsyncHook(),
        onGetSync: Hooks.getSyncHook(),
        onNew: Hooks.getAsyncHook(),
    },
    paint: {
        addToRGBUpdate: Hooks.getSyncHook(),
        onNuild: Hooks.getSyncHook(),
    },
};
