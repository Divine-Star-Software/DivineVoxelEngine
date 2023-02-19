import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types";
import { WorldBounds } from "../World/WorldBounds.js";
/**# Engine Settings
 * ---
 * Handles common settings for all contexts
 */
export declare const EngineSettings: {
    enviorment: "node" | "browser";
    settings: EngineSettingsData;
    getSettings(): EngineSettingsData;
    syncSettings(data: EngineSettingsData): void;
    __syncWithObjects(): void;
    syncWithWorldBounds(worldBounds: typeof WorldBounds): void;
    getSettingsCopy(): any;
    syncChunkInRichWorldThread(): boolean;
    richDataEnabled(): boolean;
    syncChunkInFXThread(): boolean;
    syncChunkInDataThread(): boolean;
    syncChunksInNexusThread(): boolean;
    doSunPropagation(): boolean;
    doRGBPropagation(): boolean;
    doLight(): boolean;
    doFlow(): boolean;
    saveWorldData(): boolean;
    isServer(): boolean;
    isClient(): boolean;
};
