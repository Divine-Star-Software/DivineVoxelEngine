import { EngineSettingsData } from "Meta/Global/EngineSettings.types";
/**# Engine Settings
 * ---
 * Handles common settings for all contexts
 */
export declare class EngineSettings {
    settings: EngineSettingsData;
    syncSettings(data: EngineSettingsData): void;
}
