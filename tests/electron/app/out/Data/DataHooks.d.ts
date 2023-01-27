import { LocationData } from "Meta/Data/CommonTypes.js";
import { DimensionData } from "Meta/Data/DimensionData.types.js";
export declare const DataHooks: {
    dimension: {
        onRegisterDimension: import("../Libs/Hooks/Classes/SyncHook.js").SyncHook<DimensionData, void>;
    };
    chunk: {
        onGetAsync: import("../Libs/Hooks/Classes/AsyncHook.js").AsyncHook<LocationData, SharedArrayBuffer>;
        onGetSync: import("../Libs/Hooks/Classes/SyncHook.js").SyncHook<LocationData, SharedArrayBuffer>;
        onNew: import("../Libs/Hooks/Classes/AsyncHook.js").AsyncHook<LocationData, void>;
        onRemove: import("../Libs/Hooks/Classes/SyncHook.js").SyncHook<LocationData, void>;
    };
    column: {
        onGetAsync: import("../Libs/Hooks/Classes/AsyncHook.js").AsyncHook<LocationData, SharedArrayBuffer>;
        onGetSync: import("../Libs/Hooks/Classes/SyncHook.js").SyncHook<LocationData, SharedArrayBuffer>;
        onNew: import("../Libs/Hooks/Classes/AsyncHook.js").AsyncHook<LocationData, void>;
        onRemove: import("../Libs/Hooks/Classes/SyncHook.js").SyncHook<LocationData, void>;
    };
    region: {
        onGetAsync: import("../Libs/Hooks/Classes/AsyncHook.js").AsyncHook<LocationData, SharedArrayBuffer>;
        onGetSync: import("../Libs/Hooks/Classes/SyncHook.js").SyncHook<LocationData, SharedArrayBuffer>;
        onNew: import("../Libs/Hooks/Classes/AsyncHook.js").AsyncHook<LocationData, void>;
        onRemove: import("../Libs/Hooks/Classes/SyncHook.js").SyncHook<LocationData, void>;
    };
    paint: {
        onAddToRGBUpdate: import("../Libs/Hooks/Classes/SyncHook.js").SyncHook<LocationData, void>;
        onRichVoxelPaint: import("../Libs/Hooks/Classes/SyncHook.js").SyncHook<[id: string, location: LocationData], void>;
    };
};
