import type { EngineSettingsData } from "Meta/Global/EngineSettings.types";
import { WorldBounds } from "./Util/WorldBounds";
declare type EngineSettingsContext = "DVEW" | "DVER" | "DVEP" | "DVEB" | "DVEC" | "DVEN" | "DVEFX" | "DVERW" | "MatrixLoadedThread";
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
            autoSyncVoxelPalette: boolean;
        };
        data: {
            enabled: boolean;
            autoSyncChunks: boolean;
        };
        fx: {
            enabled: boolean;
            autoSyncChunks: boolean;
            autoSyncVoxelPalette: boolean;
        };
        richWorld: {
            enabled: boolean;
            autoSyncChunks: boolean;
            autoSyncVoxelPalette: boolean;
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
        meshes: {
            clearChachedGeometry: boolean;
            checkMagmaCollisions: boolean;
            checkFluidCollisions: boolean;
            checkFloraCollisions: boolean;
            checkSolidCollisions: boolean;
            seralize: boolean;
            pickable: boolean;
        };
        materials: {
            doAO: boolean;
            doSunLight: boolean;
            doRGBLight: boolean;
            disableFloraShaderEffects: boolean;
            disableFluidShaderEffects: boolean;
        };
    };
    setContext(context: EngineSettingsContext): void;
    getSettings(): EngineSettingsData;
    syncSettings(data: EngineSettingsData): void;
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
};
export {};
