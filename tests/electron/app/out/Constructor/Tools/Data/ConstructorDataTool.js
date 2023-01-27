import { DataTool } from "../../../Tools/Data/DataTool.js";
import { ShapeManager } from "../../Managers/Shapes/ShapeManager.js";
import { VoxelManager } from "../../Managers/Voxels/VoxelManager.js";
import { Util } from "../../../Global/Util.helper.js";
export function GetConstructorDataTool() {
    const dataTool = new DataTool();
    const mergeObj = {
        getVoxelShapeObj() {
            return ShapeManager.getShape(dataTool.getShapeId());
        },
        getVoxelObj() {
            return VoxelManager.getVoxel(dataTool.getStringId());
        },
    };
    return Util.merge(dataTool, mergeObj);
}
