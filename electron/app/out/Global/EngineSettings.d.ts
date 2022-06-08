import type { EngineSettingsData } from "Meta/Global/EngineSettings.types";
import { WorldBounds } from "./Util/WorldBounds";
declare type EngineSettingsContext = "DVEW" | "DVER" | "DVEP" | "DVEB" | "DVEC" | "DVEN" | "MatrixLoadedThread";
/**# Engine Settings
 * ---
 * Handles common settings for all contexts
 */
export declare const EngineSettings: {
    context: EngineSettingsContext;
    settings: EngineSettingsData;
    setContext(context: EngineSettingsContext): void;
    syncSettings(data: EngineSettingsData): void;
    syncWithWorldBounds(worldBounds: typeof WorldBounds): void;
    getSettingsCopy(): any;
    doSunPropagation(): boolean;
    doRGBPropagation(): boolean;
};
export {};
