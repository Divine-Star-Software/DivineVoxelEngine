import { Util } from "../../Global/Util.helper.js";
import { WorldBounds } from "../World/WorldBounds.js";
import { WorldSpaces } from "../World/WorldSpaces.js";
/**# Engine Settings
 * ---
 * Handles common settings for all contexts
 */
export const EngineSettings = {
    enviorment: Util.getEnviorment(),
    //context: <EngineSettingsContext>"MatrixLoadedThread",
    settings: {
        nexus: {
            enabled: false,
            autoSyncChunks: true,
            autoSyncVoxelPalette: true,
        },
        data: {
            enabled: false,
            autoSyncChunks: true,
        },
        fx: {
            enabled: false,
            autoSyncChunks: true,
            autoSyncVoxelPalette: true,
        },
        server: {
            enabled: false,
        },
        richWorld: {
            enabled: false,
            autoSyncChunks: true,
            autoSyncVoxelPalette: true,
        },
        textures: {
            animationTime: 20,
            textureSize: 16,
            mipMapSizes: [16, 12, 8, 4],
        },
        updating: {
            autoRebuild: true,
        },
        world: {
            maxX: Infinity,
            minX: -Infinity,
            maxZ: Infinity,
            minZ: -Infinity,
            maxY: 256,
            minY: 0,
        },
        regions: {
            regionXPow2: 9,
            regionYPow2: 8,
            regionZPow2: 9,
        },
        chunks: {
            autoHeightMap: true,
            chunkXPow2: 4,
            chunkYPow2: 4,
            chunkZPow2: 4,
        },
        voxels: {
            doColors: true,
        },
        flow: {
            enable: true,
        },
        lighting: {
            doAO: true,
            doSunLight: true,
            doRGBLight: true,
            autoRGBLight: true,
            autoSunLight: true,
        },
        meshes: {
            clearChachedGeometry: true,
            checkMagmaCollisions: false,
            checkLiquidCollisions: false,
            checkFloraCollisions: false,
            checkSolidCollisions: false,
            seralize: false,
            pickable: false,
        },
        materials: {
            mode: "classic",
            doAO: true,
            doSunLight: true,
            doRGBLight: true,
            disableFloraShaderEffects: false,
            disableLiquidShaderEffects: false,
        },
    },
    getSettings() {
        return this.settings;
    },
    syncSettings(data) {
        //safetly set data without prototype pollution
        for (const settingsKey of Object.keys(data)) {
            if (settingsKey.includes("__")) {
                throw new Error("Can not include properties with multpile underscores.");
            }
            if (this.settings[settingsKey] !== undefined) {
                for (const propertyKey of Object.keys(data[settingsKey])) {
                    if (propertyKey.includes("__")) {
                        throw new Error("Can not include properties with multpile underscores.");
                    }
                    if (this.settings[settingsKey][propertyKey] !== undefined) {
                        //@ts-ignore
                        this.settings[settingsKey][propertyKey] = data[settingsKey][propertyKey];
                    }
                }
            }
        }
        this.__syncWithObjects();
    },
    __syncWithObjects() {
        WorldSpaces.$INIT(this.settings);
        if (this.settings.world) {
            WorldBounds.setWorldBounds(this.settings.world.minX, this.settings.world.maxX, this.settings.world.minZ, this.settings.world.maxZ, this.settings.world.minY, this.settings.world.maxY);
        }
    },
    syncWithWorldBounds(worldBounds) { },
    getSettingsCopy() {
        return JSON.parse(JSON.stringify(this.settings));
    },
    syncChunkInRichWorldThread() {
        return (this.settings.richWorld.enabled && this.settings.richWorld.autoSyncChunks);
    },
    richDataEnabled() {
        return this.settings.richWorld.enabled;
    },
    syncChunkInFXThread() {
        return this.settings.fx.enabled && this.settings.fx.autoSyncChunks;
    },
    syncChunkInDataThread() {
        return this.settings.data.enabled && this.settings.data.autoSyncChunks;
    },
    syncChunksInNexusThread() {
        return this.settings.nexus.enabled && this.settings.nexus.autoSyncChunks;
    },
    doSunPropagation() {
        return this.settings.lighting.autoSunLight == true;
    },
    doRGBPropagation() {
        return this.settings.lighting.autoRGBLight == true;
    },
    doLight() {
        return this.doRGBPropagation() || this.doSunPropagation();
    },
    doFlow() {
        return this.settings.flow.enable;
    },
    saveWorldData() {
        return this.settings.data.enabled;
    },
    isServer() {
        return this.settings.server.enabled && this.enviorment == "node";
    },
    isClient() {
        return this.enviorment != "browser";
    },
};
