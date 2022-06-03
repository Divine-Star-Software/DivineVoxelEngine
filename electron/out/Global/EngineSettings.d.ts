import type { EngineSettingsData } from "Meta/Global/EngineSettings.types";
import { WorldBounds } from "./Util/WorldBounds";
/**# Engine Settings
 * ---
 * Handles common settings for all contexts
 */
export declare const EngineSettings: {
    settings: EngineSettingsData;
    syncSettings(data: EngineSettingsData): void;
    syncWithWorldBounds(worldBounds: typeof WorldBounds): void;
    getSettingsCopy(): any;
    doSunPropagation(): boolean;
    doRGBPropagation(): boolean;
};
