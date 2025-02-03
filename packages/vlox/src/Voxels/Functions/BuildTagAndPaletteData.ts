import { VoxelTagsRegister } from "../Data/VoxelTagsRegister";
import { VoxelData } from "../Types/Voxel.types";
import { VoxelMaterialData } from "../Types/VoxelMaterial.types";
import { VoxelSubstanceData } from "../Types/VoxelSubstances.types";
import {
  VoxelSubstanceTags,
  VoxelTagIds,
  VoxelTags,
} from "../Data/VoxelTag.types";
import { VoxelPalettesRegister } from "../Data/VoxelPalettesRegister";
import { CompiledVoxelTagAndPaletteData } from "../Types/VoxelModelCompiledData.types";

export type BuildTagAndPaletteDataProps = {
  voxels: VoxelData[];
  voxelsOverrides?: Record<string, (value: any) => any>;
  substances: VoxelSubstanceData[];
  substancesOverrides?: Record<string, (value: any) => any>;
  materials: VoxelMaterialData[];
  materialsOverrides?: Record<string, (value: any) => any>;
};
export function BuildTagAndPaletteData(
  props: BuildTagAndPaletteDataProps
): CompiledVoxelTagAndPaletteData {
  for (const voxel of props.voxels) {
    const tags: VoxelTags = {} as any;
    const voxelId = VoxelPalettesRegister.voxels.register(voxel.id);
    if (voxel.name) {
      VoxelPalettesRegister.voxelIdToNameMap.set(voxel.id, voxel.name || "");
      VoxelPalettesRegister.voxelNametoIdMap.set(voxel.name || "", voxel.id);
    }
    for (const tag of VoxelTagsRegister.IncludedVoxelTags) {
      if (voxel.properties[tag] === undefined) {
        (tags as any)[tag] = VoxelTagsRegister.VoxelTagDefaults[tag] || false;

        continue;
      }

      if (props?.voxelsOverrides?.[tag]) {
        (tags as any)[tag] = props.voxelsOverrides[tag](voxel.properties[tag]);
        continue;
      }
      (tags as any)[tag] = voxel.properties[tag];
    }
    VoxelTagsRegister.VoxelTags[voxelId] = tags;
  }

  for (const substance of props.substances) {
    const tags: VoxelSubstanceTags = {} as any;
    const substanceId = VoxelPalettesRegister.substance.register(substance.id);

    for (const tag of VoxelTagsRegister.IncludedSubstnacesTags) {
      if (substance.properties[tag] === undefined) {
        (tags as any)[tag] =
          VoxelTagsRegister.SubstanceStagDefaults[tag] || false;
        continue;
      }

      if (props?.substancesOverrides?.[tag]) {
        (tags as any)[tag] = props.substancesOverrides[tag](
          substance.properties[tag]
        );
        continue;
      }
      (tags as any)[tag] = substance.properties[tag];
    }
    VoxelTagsRegister.SubstanceStags[substanceId] = tags;
  }

  for (const material of props.materials) {
    VoxelPalettesRegister.material.register(material.id);
  }

  return {
    data: {
      palette: VoxelPalettesRegister.voxels._palette,
      tags: VoxelTagsRegister.VoxelTags,
      idToNameMap: [...VoxelPalettesRegister.voxelIdToNameMap.entries()],
      nameToIdMap: [...VoxelPalettesRegister.voxelNametoIdMap.entries()],
    },
    substances: {
      tags: VoxelTagsRegister.SubstanceStags,
      palette: VoxelPalettesRegister.substance._palette,
    },
    materials: { palette: VoxelPalettesRegister.material._palette },
  };
}
