import { VoxelDataGenerator } from "./Generators/VoxelDataGenerator";
import { SubstanceDataGenerator  } from "./Generators/SubstanceDataGenerator";

export abstract class DataTagBuilders {
  voxels = VoxelDataGenerator;
  substances = SubstanceDataGenerator;
}
