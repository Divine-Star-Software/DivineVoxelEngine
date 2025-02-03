import {
  VoxelSubstanceTagIdds,
  VoxelSubstanceTags,
  VoxelTagIds,
  VoxelTags,
} from "./VoxelTag.types";

export class VoxelTagsRegister {
  static IncludedVoxelTags: string[] = [
    VoxelTagIds.substance,
    VoxelTagIds.renderedMaterial,
    VoxelTagIds.voxelMaterial,
    VoxelTagIds.hardness,
    VoxelTagIds.colliderID,
    VoxelTagIds.checkCollisions,
    VoxelTagIds.isLightSource,
    VoxelTagIds.lightValue,
    VoxelTagIds.noAO,
    VoxelTagIds.isTransparent,
    VoxelTagIds.canHaveSecondary,
  ];
  static IncludedSubstnacesTags: string[] = [
    VoxelSubstanceTagIdds.parent,
    VoxelSubstanceTagIdds.isSolid,
    VoxelSubstanceTagIdds.isTransparent,
    VoxelSubstanceTagIdds.isLiquid,
    VoxelSubstanceTagIdds.flowRate,
    VoxelSubstanceTagIdds.isWindAffected,
  ];
  static VoxelTagDefaults: Record<string, any> = {
    [VoxelTagIds.renderedMaterial]: "dve_solid",
    [VoxelTagIds.substance]: "dve_solid",
    [VoxelTagIds.colliderID]: "dve_cube",
  };
  static VoxelTags: VoxelTags[] = [];
  static SubstanceStagDefaults: Record<string, any> = {};
  static SubstanceStags: VoxelSubstanceTags[] = [];
}
