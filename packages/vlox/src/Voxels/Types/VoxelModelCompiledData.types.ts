import { VoxelSubstanceTags, VoxelTags } from "../Data/VoxelTag.types";
import { VoxelLogicData } from "../Logic/VoxelLogic.types";
import { VoxelPalettesRegister } from "../Data/VoxelPalettesRegister";
import { FinalCompiledVoxelModelData } from "../Models/CompiledVoxelModel.types";

export type CompiledVoxelTagAndPaletteData = {
  data: {
    logic: Record<string, VoxelLogicData[]>;
    tags: VoxelTags[];
    idPalette: string[];
    palette: typeof VoxelPalettesRegister.voxels;
    record: typeof VoxelPalettesRegister.voxelRecord;
    nameToIdMap: [string, string][];
    idToNameMap: [string, string][];
  };
  substances: {
    tags: VoxelSubstanceTags[];
    palette: string[];
  };
  materials: {
    palette: string[];
  };
};

export type CompiledVoxelData = {
  models: FinalCompiledVoxelModelData;
} & CompiledVoxelTagAndPaletteData;

