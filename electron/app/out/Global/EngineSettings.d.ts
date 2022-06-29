import type { EngineSettingsData } from "Meta/Global/EngineSettings.types";
import { WorldBounds } from "./Util/WorldBounds";
declare type EngineSettingsContext = "DVEW" | "DVER" | "DVEP" | "DVEB" | "DVEC" | "DVEN" | "MatrixLoadedThread";
/**# Engine Settings
 * ---
 * Handles common settings for all contexts
 */
export declare const EngineSettings: {
    context: EngineSettingsContext;
    settings: {
        nexus: {
            enabled: boolean;
            autoSyncChunks: boolean;
        };
        textureOptions: {
            animationTime: number;
            width: number;
            height: number;
        };
        updating: {
            autoRebuild: boolean;
        };
        world: {
            voxelPaletteMode: string;
            maxX: number;
            minX: number;
            maxZ: number;
            minZ: number;
            maxY: number;
            minY: number;
        };
        regions: {
            regionXPow2: number;
            regionYPow2: number;
            regionZPow2: number;
        };
        chunks: {
            autoHeightMap: boolean;
            chunkXPow2: number;
            chunkYPow2: number;
            chunkZPow2: number;
        };
        voxels: {
            doColors: boolean;
        };
        lighting: {
            doAO: boolean;
            doSunLight: boolean;
            doRGBLight: boolean;
            autoRGBLight: boolean;
            autoSunLight: boolean;
        };
        materials: {
            doAO: boolean;
            doSunLight: boolean;
            doRGBLight: boolean;
            disableFloraShaderEffects: boolean;
            disableFluidShaderEffects: boolean;
        };
        data: {
            enabled: boolean;
            saveChunkTemplates: boolean;
            saveWorldData: boolean;
        };
    };
    setContext(context: EngineSettingsContext): void;
    getSettings(): EngineSettingsData;
    syncSettings(data: EngineSettingsData): void;
    syncWithWorldBounds(worldBounds: typeof WorldBounds): void;
    getSettingsCopy(): any;
    syncChunksInNexus(): boolean;
    doSunPropagation(): boolean;
    doRGBPropagation(): boolean;
};
export {};
