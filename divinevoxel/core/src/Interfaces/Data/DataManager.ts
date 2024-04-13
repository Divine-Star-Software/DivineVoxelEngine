import { MappedDataRegister } from "../../Data/Register/MappedDataRegister";
import { WorldBounds } from "../../Data/World/WorldBounds";
import { WorldSpaces } from "../../Data/World/WorldSpaces";
import { VoxelTags } from "../../Data/Voxel/VoxelTags";
import { SubstanceTags } from "../../Data/Substance/SubstanceTags";

export abstract class DataManager {

  worldBounds = WorldBounds;
  spaces = WorldSpaces;
  mapped = MappedDataRegister;
  tags = {
    voxels: VoxelTags,
    substances: SubstanceTags,
  };
}
