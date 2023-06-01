import { UtilMap } from "../../../Global/Util/UtilMap.js";
import { VoxelMesherDataTool } from "../Tools/VoxelMesherDataTool.js";
export const RenderedSubstances = {
    meshers: new UtilMap(),
    add(id) {
        this.meshers.set(id, new VoxelMesherDataTool());
    },
};
