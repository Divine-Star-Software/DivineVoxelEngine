import { VoxelDataArrays } from "../../Voxels";
import { IVoxelTemplateData } from "../VoxelTemplates.types";

export interface FullVoxelTemplateData
  extends IVoxelTemplateData<"full">,
    VoxelDataArrays {
  mask?: Uint8Array;
}
