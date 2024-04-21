import { SubstanceManager, VoxelManager } from "./Managers/DataManagers";

export abstract class DataRegister {
  voxels = VoxelManager;
  substances = SubstanceManager;
  
}
