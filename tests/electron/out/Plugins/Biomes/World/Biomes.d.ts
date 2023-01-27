import { PerlinNoise3d } from "../../../Libs/divineRNG/perlin/index.js";
import { BiomeData, BiomeInitData } from "../Types/Biome.types.js";
export declare const Biomes: {
    biomeNoise: PerlinNoise3d;
    worldGenNoise: Map<string, PerlinNoise3d>;
    biomes: Map<string, BiomeData>;
    $INIT(data: BiomeInitData): void;
    getBiome(dimension: string, x: number, y: number, z: number): string;
    getValueforBiome(biomeId: string, noiseID: string, x: number, y: number, z: number): number;
    registerBiome(data: BiomeData): void;
};
