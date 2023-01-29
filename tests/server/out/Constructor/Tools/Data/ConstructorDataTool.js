import { DataTool } from "../../../Tools/Data/DataTool.js";
import { ShapeManager } from "../../Builder/Shapes/ShapeManager.js";
import { VoxelConstructors } from "../../Builder/Constructors/Voxel/VoxelConstructors.js";
import { Util } from "../../../Global/Util.helper.js";
export function GetConstructorDataTool() {
    const dataTool = new DataTool();
    const mergeObj = {
        getVoxelShapeObj() {
            return ShapeManager.getShape(dataTool.getShapeId());
        },
        getVoxelObj() {
            return VoxelConstructors.getVoxel(dataTool.getStringId());
        },
    };
    return Util.merge(dataTool, mergeObj);
}
