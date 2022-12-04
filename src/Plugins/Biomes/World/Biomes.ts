import { PerlinNoise3d } from "../../../Libs/divineRNG/perlin/index.js";
import { BiomeData, BiomeInitData } from "../Meta/Biome.types.js";

export const Biomes = {
 biomeNoise: new PerlinNoise3d(),
 worldGenNoise: <Map<string, PerlinNoise3d>>new Map(),

 biomes: <Map<string, BiomeData>>new Map(),

 $INIT(data: BiomeInitData) {
  this.biomeNoise.noiseSeed(data.biomeSeed);
  for (const noiseData of data.worldGenNoise) {
   const nosie = new PerlinNoise3d();
   nosie.noiseSeed(noiseData.seed);
   this.worldGenNoise.set(noiseData.name, nosie);
  }
 },

 getBiome(dimension: string, x: number, y: number, z: number) {
  const value = this.biomeNoise.get(x, 0, z);
  for (const [id, biome] of this.biomes) {
   if (value >= biome.range[0] || value <= biome.range[1]) {
    return id;
   }
  }
  return "none";
 },
 getValueforBiome(
  biomeId: string,
  noiseID: string,
  x: number,
  y: number,
  z: number
 ) {
  const noise = this.worldGenNoise.get(noiseID);
  if (!noise) return -Infinity;
  const biome = this.biomes.get(biomeId);
  if (!biome) return -Infinity;
  const noiseData = biome.noiseData[noiseID];
  if (!noiseData) return -Infinity;
  return (
   noise.get(
    (x + noiseData.offset.x) / noiseData.waveLength.x,
    (y + noiseData.offset.y) / noiseData.waveLength.y,
    (z + noiseData.offset.z) / noiseData.waveLength.z
   ) * noiseData.scale
  );
 },
 registerBiome(data: BiomeData) {
  this.biomes.set(data.name, data);
 },
};
