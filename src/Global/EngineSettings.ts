import { EngineSettingsData } from "Meta/Global/EngineSettings.types";

/**# Engine Settings
 * ---
 * Handles common settings for all contexts
 */
export class EngineSettings {
 settings: EngineSettingsData = {
  textureOptions: {
   width: 16,
   height: 16,
  },
  chunks: {
   chunkXPow2: 4,
   chunkYPow2: 7,
   chunkZPow2: 4,
  },
  lighting: {
   doAO: true,
   doColors: true,
   doSunLight: true,
   doRGBLight: true,
   autoRGBLight: true,
   autoSunLight: true,
  },
  materials: {
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
