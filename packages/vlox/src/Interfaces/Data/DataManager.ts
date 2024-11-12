import { MappedDataRegister } from "../../Data/Register/MappedDataRegister";
import { WorldBounds } from "../../Data/World/WorldBounds";
import { WorldSpaces } from "../../Data/World/WorldSpaces";
import { VoxelStruct } from "../../Data/Voxel/VoxelStruct";
import { SubstanceStruct } from "../../Data/Substance/SubstanceStruct";

export abstract class DataManager {

  worldBounds = WorldBounds;
  spaces = WorldSpaces;
  mapped = MappedDataRegister;
  tags = {
    voxels: VoxelStruct,
    substances: SubstanceStruct,
  };
}
