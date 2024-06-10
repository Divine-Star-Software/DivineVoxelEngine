import { VoxelDataGenerator } from "./Generators/VoxelDataGenerator";
import { SubstanceDataGenerator  } from "./Generators/SubstanceDataGenerator";

export abstract class DataStructBuilders {
  voxels = VoxelDataGenerator;
  substances = SubstanceDataGenerator;
}
