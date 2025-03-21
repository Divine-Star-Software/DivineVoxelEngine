import { Vec3Array } from "@amodx/math";
import { VoxelDataArrays } from "../../Voxels";
import { IVoxelTemplateData } from "Templates/VoxelTemplates.types";

export interface FullVoxelTemplateData
  extends IVoxelTemplateData<"full">,
    VoxelDataArrays {
  bounds: Vec3Array;
  mask?: Uint8Array;
}
