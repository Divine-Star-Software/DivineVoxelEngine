import type { EngineSettingsData } from "Meta/Global/EngineSettings.types";
/**# Engine Settings
 * ---
 * Handles common settings for all contexts
 */
export declare const EngineSettings: {
    settings: EngineSettingsData;
    syncSettings(data: EngineSettingsData): void;
    getSettingsCopy(): any;
};
