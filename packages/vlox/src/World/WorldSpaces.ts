//types
import { VoxelSpaces } from "../Math/Spaces/VoxelSpaces.js";
import type { EngineSettingsData } from "../Settings/EngineSettings.types.js";
//Objects

export const WorldSpaces = new VoxelSpaces();

export function InitWorldSpaces(settings: EngineSettingsData) {
  WorldSpaces.setDimensions({
    regions: {
      x: settings.regions.regionXPow2,
      y: settings.regions.regionYPow2,
      z: settings.regions.regionZPow2,
    },
    sectors: {
      x: settings.sections.sectionXPow2,
      y: settings.regions.regionYPow2,
      z: settings.sections.sectionZPow2,
    },
    sections: {
      x: settings.sections.sectionXPow2,
      y: settings.sections.sectionYPow2,
      z: settings.sections.sectionZPow2,
    },
  });
}
