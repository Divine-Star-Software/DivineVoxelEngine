//types
import { VoxelSpaces } from "../../Math/Spaces/VoxelSpaces.js";
import type { EngineSettingsData } from "Types/EngineSettings.types.js";
//Objects

export const WorldSpaces = Object.assign(VoxelSpaces.getVoxelSpaces(), {
  $INIT(settings: EngineSettingsData) {
    WorldSpaces.setDimensions({
      regions: {
        x: settings.regions.regionXPow2,
        y: settings.regions.regionYPow2,
        z: settings.regions.regionZPow2,
      },
      columns: {
        x: settings.chunks.chunkXPow2,
        y: settings.regions.regionYPow2,
        z: settings.chunks.chunkZPow2,
      },
      chunks: {
        x: settings.chunks.chunkXPow2,
        y: settings.chunks.chunkYPow2,
        z: settings.chunks.chunkZPow2,
      },
    });
  },
});
