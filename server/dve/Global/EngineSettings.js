/**# Engine Settings
 * ---
 * Handles common settings for all contexts
 */
export const EngineSettings = {
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
            minY: 256
        },
        regions: {
            regionXPow2: 9,
            regionYPow2: 7,
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
            doSunLight: true,
            doRGBLight: true,
            autoRGBLight: true,
            autoSunLight: true,
        },
        materials: {
            doAO: true,
            doSunLight: true,
            doRGBLight: true,
            disableFloraShaderEffects: false,
            disableFluidShaderEffects: false,
        },
        meshing: {
            maxBuilderThreads: 6,
        },
    },
    syncSettings(data) {
        for (const key of Object.keys(data)) {
            if (this.settings[key]) {
                //@ts-ignore
                this.settings[key] = data[key];
            }
        }
    },
    getSettingsCopy() {
        return JSON.parse(JSON.stringify(this.settings));
    },
};
