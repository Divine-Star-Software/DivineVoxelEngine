import { SubstanceManager, VoxelManager } from "./Managers/DataManagers";
import { DimensionsRegister } from "../../../Data/World/DimensionsRegister";
import { WorldRegister } from "../../../Data/World/WorldRegister";

export  class DataRegister {
  voxels = VoxelManager;
  substances = SubstanceManager;
  dimensions = new DimensionsRegister();
  world = new WorldRegister();
}
