import { PerlinNoise3d } from "../../../Libs/divineRNG/perlin/index.js";
export const Biomes = {
    biomeNoise: new PerlinNoise3d(),
    worldGenNoise: new Map(),
    biomes: new Map(),
    $INIT(data) {
        this.biomeNoise.noiseSeed(data.biomeSeed);
        for (const noiseData of data.worldGenNoise) {
            const nosie = new PerlinNoise3d();
            nosie.noiseSeed(noiseData.seed);
            this.worldGenNoise.set(noiseData.name, nosie);
        }
    },
    getBiome(dimension, x, y, z) {
        const value = this.biomeNoise.get(x, 0, z);
        for (const [id, biome] of this.biomes) {
            if (value >= biome.range[0] || value <= biome.range[1]) {
                return id;
            }
        }
        return "none";
    },
    getValueforBiome(biomeId, noiseID, x, y, z) {
        const noise = this.worldGenNoise.get(noiseID);
        if (!noise)
            return -Infinity;
        const biome = this.biomes.get(biomeId);
        if (!biome)
            return -Infinity;
        const noiseData = biome.noiseData[noiseID];
        if (!noiseData)
            return -Infinity;
        return (noise.get((x + noiseData.offset.x) / noiseData.waveLength.x, (y + noiseData.offset.y) / noiseData.waveLength.y, (z + noiseData.offset.z) / noiseData.waveLength.z) * noiseData.scale);
    },
    registerBiome(data) {
        this.biomes.set(data.name, data);
    },
};
