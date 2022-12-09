import { Hooks } from "../Libs/Hooks/Hooks.js";
export const DataHooks = {
    dimension: {
        onRegisterDimension: Hooks.getSyncHook(),
    },
    chunk: {
        onGetAsync: Hooks.getAsyncHook(),
        onGetSync: Hooks.getSyncHook(),
        onNew: Hooks.getAsyncHook(),
    },
    column: {
        onGetAsync: Hooks.getAsyncHook(),
        onGetSync: Hooks.getSyncHook(),
        onNew: Hooks.getAsyncHook(),
    },
    region: {
        onGetAsync: Hooks.getAsyncHook(),
        onGetSync: Hooks.getSyncHook(),
        onNew: Hooks.getAsyncHook(),
    },
    paint: {
        onAddToRGBUpdate: Hooks.getSyncHook(),
        onRichVoxelPaint: Hooks.getSyncHook(),
    },
};
