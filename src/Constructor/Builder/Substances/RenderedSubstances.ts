import { UtilMap } from "../../../Global/Util/UtilMap.js";
import { VoxelMesherDataTool } from "../Tools/VoxelMesherDataTool.js";

export const RenderedSubstances = {
 meshers: new UtilMap<string, VoxelMesherDataTool>(),

};
RenderedSubstances.meshers.add([
 ["#dve_solid", new VoxelMesherDataTool()],
 ["#dve_liquid", new VoxelMesherDataTool()],
 ["#dve_flora", new VoxelMesherDataTool()],
]);
