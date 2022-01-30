import { EngineSettingsData } from "Meta/Global/EngineSettings.types";

/**# Engine Settings
 * ---
 * Handles common settings for all contexts
 */
export class EngineSettings {
 settings: EngineSettingsData = {
  textureOptions: {
   animationTime: 20,
   width: 16,
   height: 16,
  },
  updating: {
   autoRebuild: true,
   rebuildMode: "async",
  },
  world: {
   voxelPaletteMode: "global",
  },
  regions: {
   regionXPow2: 9,
   regionYPow2: 8,
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
 };

 syncSettings(data: EngineSettingsData) {
  for (const key of Object.keys(data)) {
   //@ts-ignore
   this.settings[key] = data[key];
  }
 }
}