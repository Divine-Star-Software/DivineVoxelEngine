import { UtilMap } from "@divinevoxel/core/Global/Util/UtilMap.js";
import { VoxelMesherDataTool } from "../Tools/VoxelMesherDataTool.js";

export const RenderedSubstances = {
 meshers: new UtilMap<string, VoxelMesherDataTool>(),

 add(id: string) {
  this.meshers.set(id, new VoxelMesherDataTool());
 },
};
