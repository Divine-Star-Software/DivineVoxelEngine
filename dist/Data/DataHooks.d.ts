import type { LocationData } from "voxelspaces";
import { DimensionData } from "Meta/Data/DimensionData.types.js";
import { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types.js";
export declare const DataHooks: {
    dimension: {
        onRegisterDimension: import("divine-hooks/Classes/SyncHook").SyncHook<DimensionData, void>;
    };
    chunk: {
        onGetAsync: import("divine-hooks/Classes/AsyncHook").AsyncHook<LocationData, SharedArrayBuffer>;
        onGetSync: import("divine-hooks/Classes/SyncHook").SyncHook<LocationData, SharedArrayBuffer>;
        onNew: import("divine-hooks/Classes/AsyncHook").AsyncHook<LocationData, void>;
        onRemove: import("divine-hooks/Classes/SyncHook").SyncHook<LocationData, void>;
    };
    column: {
        onGetAsync: import("divine-hooks/Classes/AsyncHook").AsyncHook<LocationData, SharedArrayBuffer>;
        onGetSync: import("divine-hooks/Classes/SyncHook").SyncHook<LocationData, SharedArrayBuffer>;
        onNew: import("divine-hooks/Classes/AsyncHook").AsyncHook<LocationData, void>;
        onRemove: import("divine-hooks/Classes/SyncHook").SyncHook<LocationData, void>;
    };
    region: {
        onGetAsync: import("divine-hooks/Classes/AsyncHook").AsyncHook<LocationData, SharedArrayBuffer>;
        onGetSync: import("divine-hooks/Classes/SyncHook").SyncHook<LocationData, SharedArrayBuffer>;
        onNew: import("divine-hooks/Classes/AsyncHook").AsyncHook<LocationData, void>;
        onRemove: import("divine-hooks/Classes/SyncHook").SyncHook<LocationData, void>;
    };
    paint: {
        onAddToRGBUpdate: import("divine-hooks/Classes/SyncHook").SyncHook<LocationData, void>;
        onRichVoxelPaint: import("divine-hooks/Classes/SyncHook").SyncHook<[id: string, location: LocationData], void>;
    };
    settingsSynced: import("divine-hooks/Classes/SyncHook").SyncHook<EngineSettingsData, void>;
};
