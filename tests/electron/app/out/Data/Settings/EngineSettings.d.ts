import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types";
import { WorldBounds } from "../World/WorldBounds.js";
/**# Engine Settings
 * ---
 * Handles common settings for all contexts
 */
export declare const EngineSettings: {
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
        server: {
            enabled: boolean;
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
        flow: {
            enable: boolean;
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
            mode: string;
            doAO: boolean;
            doSunLight: boolean;
            doRGBLight: boolean;
            disableFloraShaderEffects: boolean;
            disableFluidShaderEffects: boolean;
        };
    };
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
};
