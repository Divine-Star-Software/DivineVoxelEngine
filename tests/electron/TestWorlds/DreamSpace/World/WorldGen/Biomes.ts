import { Biomes } from "../../../../out/Plugins/Biomes/World/Biomes.js";
export function SetUpBiomes() {
 Biomes.$INIT({
  biomeSeed: 0,
  worldGenNoise: [
   {
    name: "main",
    seed: 0,
   },
   {
    name: "carve",
    seed: 0,
   },
  ],
 });
 Biomes.registerBiome({
  type: "noise",
  name: "dream-forest",
  range: [0, 1],
  noiseData: {
   main: {
    offset: { x: 1_000, y: 1_000, z: 1_000 },
    waveLength: { x: 100, y: 0, z: 100 },
    scale: 120,
   },

   
  },
 });
}
