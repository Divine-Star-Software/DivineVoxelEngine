import type { EngineSettingsData } from "Meta/Global/EngineSettings.types";
import { WorldBounds } from "./Util/WorldBounds";

/**# Engine Settings
 * ---
 * Handles common settings for all contexts
 */
export const EngineSettings = {
 settings: <EngineSettingsData>{
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

 syncSettings(data: EngineSettingsData) {
  for (const key of Object.keys(data)) {
   if ((this as any).settings[key]) {
    //@ts-ignore
    (this as any).settings[key] = data[key];
   }
  }
 },

 syncWithWorldBounds(worldBounds: typeof WorldBounds) {
  if (this.settings.chunks) {
   worldBounds.setChunkBounds(
    this.settings.chunks.chunkXPow2,
    this.settings.chunks.chunkYPow2,
    this.settings.chunks.chunkZPow2
   );
   worldBounds.syncBoundsWithArrays();
  }
  if (this.settings.regions) {
   worldBounds.setRegionBounds(
    this.settings.regions.regionXPow2,
    this.settings.regions.regionYPow2,
    this.settings.regions.regionZPow2
   );
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
