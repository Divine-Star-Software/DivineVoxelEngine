/**# Engine Settings
 * ---
 * Handles common settings for all contexts
 */
export const EngineSettings = {
    context: "MatrixLoadedThread",
    settings: {
        nexus: {
            enabled: true,
        },
        textureOptions: {
            animationTime: 20,
            width: 16,
            height: 16,
        },
        updating: {
            autoRebuild: true,
        },
        world: {
            voxelPaletteMode: "global",
            maxX: Infinity,
            minX: -Infinity,
            maxZ: Infinity,
            minZ: -Infinity,
            maxY: 0,
            minY: 256,
        },
        regions: {
            regionXPow2: 9,
            regionYPow2: 9,
            regionZPow2: 9,
        },
        chunks: {
            autoHeightMap: true,
            chunkXPow2: 4,
            chunkYPow2: 7,
            chunkZPow2: 4,
        },
        voxels: {
            doColors: true,
        },
        lighting: {
            doAO: true,
            doSunLight: false,
            doRGBLight: true,
            autoRGBLight: true,
            autoSunLight: false,
        },
        materials: {
            doAO: true,
            doSunLight: true,
            doRGBLight: true,
            disableFloraShaderEffects: false,
            disableFluidShaderEffects: false,
        },
    },
    setContext(context) {
        this.context = context;
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
    },
    syncWithWorldBounds(worldBounds) {
        if (this.settings.chunks) {
            worldBounds.setChunkBounds(this.settings.chunks.chunkXPow2, this.settings.chunks.chunkYPow2, this.settings.chunks.chunkZPow2);
            worldBounds.syncBoundsWithArrays();
        }
        if (this.settings.regions) {
            worldBounds.setRegionBounds(this.settings.regions.regionXPow2, this.settings.regions.regionYPow2, this.settings.regions.regionZPow2);
        }
        if (this.settings.world) {
            worldBounds.setWorldBounds(this.settings.world.minX, this.settings.world.maxX, this.settings.world.minZ, this.settings.world.maxZ, this.settings.world.minY, this.settings.world.maxY);
        }
    },
    getSettingsCopy() {
        return JSON.parse(JSON.stringify(this.settings));
    },
    doSunPropagation() {
        return this.settings.lighting?.autoSunLight == true;
    },
    doRGBPropagation() {
        return this.settings.lighting?.autoRGBLight == true;
    },
};
