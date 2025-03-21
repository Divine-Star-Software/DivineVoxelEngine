import {
  VoxelSubstanceTagIdds as VoxelSubstanceTagIds,
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
    VoxelTagIds.isPowerSource,
    VoxelTagIds.canBePowered,
    VoxelTagIds.canCarryPower,
    VoxelTagIds.canHoldPower,
    VoxelTagIds.powerValue,
    VoxelTagIds.fullBlock,
    VoxelTagIds.simulationBehavior,
  ];
  static IncludedSubstnacesTags: string[] = [
    VoxelSubstanceTagIds.parent,
    VoxelSubstanceTagIds.isSolid,
    VoxelSubstanceTagIds.isTransparent,
    VoxelSubstanceTagIds.isLiquid,
    VoxelSubstanceTagIds.flowRate,
    VoxelSubstanceTagIds.isWindAffected,
  ];
  static VoxelTagDefaults: Record<string, any> = {
    [VoxelTagIds.renderedMaterial]: "dve_solid",
    [VoxelTagIds.substance]: "dve_solid",
    [VoxelTagIds.colliderID]: "dve_cube",
    [VoxelTagIds.simulationBehavior]: "dve_default",
  };
  static VoxelTags: VoxelTags[] = [];

  static SubstanceStagDefaults: Record<string, any> = {};
  static SubstanceStags: VoxelSubstanceTags[] = [];
}
